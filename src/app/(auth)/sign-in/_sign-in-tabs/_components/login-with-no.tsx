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

import { LoaderCircle, Phone } from "lucide-react";

const signInWithNumberFormSchema = () => {
  return z.object({
    contactNo: z
      .string()
      .length(10, { message: "Contact number must be exactly 10 digits" })
      .regex(/^\d{10}$/, {
        message: "Contact number must contain only digits",
      }),
  });
};

interface SignInWithNumberProps {
  signInType: string;
}

const SignInWithNumber = ({ signInType }: SignInWithNumberProps) => {
  const [isLoading] = useState(false);
  const [errorMessage] = useState("");

  const formSchema = signInWithNumberFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactNo: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{signInType} Sign In</h1>

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

        <div>
          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            Get OTP
            {isLoading && <LoaderCircle className="size-8 animate-spin" />}
          </Button>
        </div>

        {errorMessage && <p className="error-message">*{errorMessage}</p>}

        <div className="body-2 flex justify-center">
          <p className="text-muted-foreground">Don&apos;t have an account? </p>
          <Link
            href="/sign-up"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Sign Up
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

export default SignInWithNumber;
