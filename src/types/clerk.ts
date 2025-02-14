export interface ClerkUserEventData {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  image_url: string;
}

export interface ClerkWebhookEvent<T> {
  type: string;
  data: T;
}