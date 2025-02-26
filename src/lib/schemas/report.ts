import { z } from 'zod';

export const saveReportSchema = z.object({
  reason: z.string().max(256, { message: "Reason should not be larger than 256 characters." }).optional()
});

export type SaveReportFormData = z.infer<typeof saveReportSchema>;

export const updateReportSchema = z.object({
  status: z.enum(['pending', 'resolved', 'rejected'])
});

export type UpdateReportFormData = z.infer<typeof updateReportSchema>;