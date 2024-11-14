"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "w-full",
            footerActionLink: "w-full",
            card: "rounded-lg shadow-md",
            rootBox: "w-full"
          }
        }}
        redirectUrl="/onboarding"
      />
    </div>
  );
} 