export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
  userId: string;
};

export type PartialNote = Pick<Note, "id" | "title" | "content" | 'updatedAt'>;