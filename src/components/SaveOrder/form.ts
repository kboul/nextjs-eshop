import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(3),
  tin: z.string().min(9), // Tax Identification Number or afm
  phoneNumber: z.string().min(8),
  shopName: z.string().min(2),
  address: z.string()
});

export { formSchema };
