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

import { Eye, EyeOff, LoaderCircle, Mail } from "lucide-react";

interface LoginWithUserIdProps {
  LoginInType: string;
}

const loginWithUserIdFormSchema = () => {
  return z.object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .nonempty({ message: "Email is required" }),
    password: z.string().min(2, { message: "Password is required" }),
  });
};

const LoginWithUserId = ({ LoginInType }: LoginWithUserIdProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading] = useState(false);
  const [errorMessage] = useState("");

  const formSchema = loginWithUserIdFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{LoginInType} Sign In</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  autoComplete="off"
                  startIcon={<Mail className="size-4" />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  type={showPassword ? "text" : "password"}
                  endIcon={
                    <Button
                      type="button"
                      variant="ghost"
                      className="p-0 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full mt-4">
          Sign In
          {isLoading && <LoaderCircle className="size-8 animate-spin" />}
        </Button>

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

export default LoginWithUserId;
