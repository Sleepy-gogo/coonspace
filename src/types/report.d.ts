export type ReportStatus = "pending" | "resolved" | "ignored";

export interface Report {
  id: string;
  noteId: string | null;
  userId: string;
  reason: string | null;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
}