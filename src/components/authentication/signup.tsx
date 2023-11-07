"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "../../hooks/useSignup";
import { useState } from "react";

interface User {
  fullname?: string;
  dateofbirth?: string;
  address?: string;
  email?: string;
  password?: string;
}

interface UserSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserSignupForm: React.FC = ({ className, ...props }: UserSignupFormProps) => {
  const [user, setUser] = useState<User>({});
  const { signup, error, isLoading } = useSignup();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signup(user);
  };

  function handleChange(e: { target: { name: any; value: any; }; }) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="fullname">
              Full name
            </Label>
            <Input
              name="fullname"
              id="fullname"
              placeholder="Enter your full name"
              type="text"
              disabled={isLoading}
              onChange={handleChange}
            />
            <Label className="mt-5" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              placeholder="Enter your email"
              type="email"
              disabled={isLoading}
              onChange={handleChange}
            />
            <Label htmlFor="password" className="mt-5">
              Password
            </Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <Label htmlFor="dateofbirth" className="mt-5">
              Date of birth
            </Label>
            <Input
              name="dateofbirth"
              id="dateofbirth"
              type="date"
              placeholder="Enter your date of birth"
              onChange={handleChange}
            />
            <Label htmlFor="address" className="mt-5">
              Address
            </Label>
            <Input
              name="address"
              id="address"
              type="text"
              placeholder="Enter your Address"
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading} className="mt-3">
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Sign Up
          </Button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
}

export default UserSignupForm