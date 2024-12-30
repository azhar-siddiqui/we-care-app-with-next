"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FlaskConical,
  LoaderCircle,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

const signUpFormSchema = () => {
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
    patientCount: z.string(),
  });
};

interface FormType {
  type?: string;
}

const SignUp = ({ type = "Sign Up" }: FormType) => {
  const [isLoading] = useState(false);
  const [errorMessage] = useState("");

  const formSchema = signUpFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      labName: "",
      email: "",
      ownerName: "",
      contactNo: "",
      patientCount: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{type}</h1>

        <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
          <FormField
            control={form.control}
            name="labName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lab Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Lab name"
                    {...field}
                    autoComplete="off"
                    startIcon={<FlaskConical className="size-4" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="w-full"
                    {...field}
                    autoComplete="off"
                    startIcon={<UserRound className="size-4" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    autoComplete="off"
                    startIcon={<Mail className="size-4" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Phone Number"
                    {...field}
                    autoComplete="off"
                    startIcon={<Phone className="size-4" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="patientCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Count Per Day</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient count" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1-30">1-30</SelectItem>
                  <SelectItem value="30-50">30-50</SelectItem>
                  <SelectItem value="50-100">50-100</SelectItem>
                  <SelectItem value="100-200">100-200</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            Sign Up
            {isLoading && <LoaderCircle className="size-8 animate-spin" />}
          </Button>
        </div>

        {errorMessage && <p className="error-message">*{errorMessage}</p>}

        <div className="body-2 flex justify-center">
          <p className="text-muted-foreground">Already have an account</p>
          <Link
            href="/sign-in"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>

        <div className="text-xs text-center">
          <p className="text-muted-foreground">
            By signing up, you agree to our
          </p>
          <Link
            href="/terms-and-condition"
            className="ml-1 font-medium text-primary text-xs hover:underline"
          >
            Terms & Condition
          </Link>
          <span> and</span>
          <Link
            href="/terms-and-condition"
            className="ml-1 font-medium text-primary text-xs hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUp;
