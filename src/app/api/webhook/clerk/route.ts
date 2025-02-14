import { Webhook } from 'svix';
import { headers } from 'next/headers';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { env } from '~/env';
import { createUser } from '~/server/queries/insert';
import { deleteUser } from '~/server/queries/delete';
import { updateUser } from '~/server/queries/update';
import { ClerkUserEventData, ClerkWebhookEvent } from '~/types/clerk';

export async function POST(req: Request) {
  const SIGNING_SECRET: string = env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = (await req.json()) as ClerkWebhookEvent<ClerkUserEventData> ;
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }
  
  const eventType = evt.type;

  switch (eventType) {
    case 'user.created':
      try {
        await createUser({
          id: payload.data?.id,
          fullName: `${payload.data?.first_name} ${payload.data?.last_name}`,
          username: payload.data?.username,
          imageUrl: payload.data?.image_url,
        });
        console.log('User created : ', payload.data?.username);
      } catch {
        return new Response('User already exists', { status: 400 });
      }
      break;
    case 'user.deleted':
      try {
        await deleteUser(payload.data?.id);
      } catch {
        console.log(`User ${payload.data?.id} not found. Deletion incomplete.`);
        return new Response('User not found', { status: 404 });
      }
      break;
    case 'user.updated':
      try {
        await updateUser(payload.data.id, {
          username: payload.data.username,
          imageUrl: payload.data.image_url,
        });
      } catch {
        return new Response('User not found', { status: 404 });
      }

  }

  return new Response('OK', { status: 200 });
}
