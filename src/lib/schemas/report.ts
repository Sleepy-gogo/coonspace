import { z } from 'zod';

export const saveReportSchema = z.object({
  reason: z.string().max(256, { message: "Reason should not be larger than 256 characters." }).optional()
});

export const updateReportSchema = z.object({
  status: z.enum(['pending', 'resolved', 'rejected'])
});