import { z } from 'zod/v4';

export const schema = z.object({
  name: z.string().default('Enter Your Name'),
  email: z.email().default('hello@ethioiq.com'),
});