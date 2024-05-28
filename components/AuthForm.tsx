"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomForm from "./CustomForm";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer items-center gap-1 flex px-2">
          <Image
            src="/icons/logo.svg"
            alt="Horizon Logo"
            width={45}
            height={45}
            className="size-[34px] max-xl:size-14"
          />
          <h1 className="text-black-1 font-bold font-ibm-plex-serif">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-8">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-600">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomForm
                      control={form.control}
                      label="First Name"
                      placeholder="Jhon"
                      name="firstName"
                    />
                    <CustomForm
                      control={form.control}
                      label="Last Name"
                      placeholder="Doe"
                      name="lastName"
                    />
                  </div>

                  <CustomForm
                    control={form.control}
                    label="Address"
                    placeholder="Enter ypur specific address "
                    name="address1"
                  />
                  <CustomForm
                    control={form.control}
                    label="City"
                    placeholder="Enter your city"
                    name="city"
                  />
                  <div className="flex gap-4">
                    <CustomForm
                      control={form.control}
                      label="State"
                      placeholder="ex: NY"
                      name="state"
                    />
                    <CustomForm
                      control={form.control}
                      label="Postal Code"
                      placeholder="ex: 11232"
                      name="postalCode"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomForm
                      control={form.control}
                      label="Date of birth"
                      placeholder="YYYY MM DD"
                      name="DateOfBirth"
                    />
                    <CustomForm
                      control={form.control}
                      label="SSN"
                      placeholder="ex: 1234"
                      name="ssn"
                    />
                  </div>
                </>
              )}
              <CustomForm
                control={form.control}
                label="Email"
                placeholder="Enter your email"
                name="email"
              />
              <CustomForm
                control={form.control}
                label="Password"
                placeholder="Enter your password"
                name="password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={loading} className="form-btn">
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading ...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {" "}
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
