"use client";
import { useState } from "react";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { LoaderCircle, Mail, Smartphone } from "lucide-react";

import { signInWithMobileNumberFormSchema } from "@/lib/validation";

const SignInWithMobile = () => {
  const [isLoading] = useState(false);
  const [errorMessage] = useState("");

  const formSchema = signInWithMobileNumberFormSchema();

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
        <h1 className="form-title">Sign In</h1>

        <FormField
          control={form.control}
          name="contactNo"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-between">
                <FormLabel>Phone Number</FormLabel>
                <Button
                  variant="ghost"
                  type="button"
                  className="p-0 hover:bg-transparent text-gray-500 font-semibold focus-visible:ring-0"
                >
                  <Mail className="size-4" />
                  <Link href="/sign-in">Use Email</Link>
                </Button>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter your Phone Number"
                  {...field}
                  autoComplete="off"
                  startIcon={
                    <Smartphone
                      className={`size-4 ${
                        form.formState.errors.contactNo && "text-red-500"
                      }`}
                    />
                  }
                  className={
                    form.formState.errors.contactNo &&
                    "focus-visible:ring-red-500 placeholder:text-red-500"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            Login
            {isLoading && <LoaderCircle className="size-8 animate-spin" />}
          </Button>
        </div>

        {errorMessage && <p className="error-message">*{errorMessage}</p>}

        <div className="body-2 flex justify-center">
          <p className="text-muted-foreground">Don&apos;t have an account</p>
          <Link
            href="/sign-up"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInWithMobile;
