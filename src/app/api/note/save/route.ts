// app/api/save-md/route.ts
import { NextResponse } from "next/server";
import { saveMarkdown } from '~/server/upload-markdown';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await saveMarkdown(formData);
    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message || "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
