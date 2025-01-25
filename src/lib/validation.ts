import { z } from "zod";

export const signInWithEmailFormSchema = () => {
  return z.object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .nonempty({ message: "Email is required" }),
  });
};

export const signInWithMobileNumberFormSchema = () => {
  return z.object({
    contactNo: z
      .string()
      .length(10, { message: "Contact number must be exactly 10 digits" })
      .regex(/^\d{10}$/, {
        message: "Contact number must contain only digits",
      }),
  });
};

export const signUpFormSchema = () => {
  return z.object({
    labName: z.string().min(2, "Lab name is required").max(50),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .nonempty({ message: "Email is required" }),
    ownerName: z.string().min(2, { message: "Owner name is required" }),
    contactNo: z
      .string()
      .length(10, { message: "Contact number must be exactly 10 digits" })
      .regex(/^\d{10}$/, {
        message: "Contact number must contain only digits",
      }),
    patientCount: z.enum(
      ["1-30", "30-50", "50-100", "100-200", "200-500", "500+"],
      {
        required_error: "Please select a patient count per day.",
        invalid_type_error: "Invalid selection.",
      }
    ),
  });
};
