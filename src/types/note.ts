export interface Note {
  id: string;
  utId: string;
  title: string;
  content: string;
  slug: string;
  updatedAt: Date;
  createdAt: Date;
  userId: string;
};

export type PartialNote = Pick<Note, "id" | "utId" | "title" | "content" | 'updatedAt' | "slug">;