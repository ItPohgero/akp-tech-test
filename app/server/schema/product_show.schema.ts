import { z } from "zod";

export const ProductShowSchema = z.object({
	slug: z.string(),
});
