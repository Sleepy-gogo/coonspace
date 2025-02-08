import { NextResponse, type NextRequest } from 'next/server';
import { slugExists } from '~/server/queries/select';
import slugify from "slug";

interface SlugApiResponse {
  exists: boolean;
}

export async function GET(request: NextRequest): Promise<NextResponse<SlugApiResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ exists: false }, { status: 400, statusText: "Bad Request: Missing or invalid slug parameter" });
    }

    const inUse = await slugExists(slugify(slug, { lower: true }));

    return NextResponse.json({ exists: inUse });

  } catch (error) {
    console.error("Error checking slug existence:", error);
    return NextResponse.json({ exists: true }, { status: 500, statusText: "Internal Server Error" }); // Assume exists to prevent saving on error, or handle differently as needed
  }
}