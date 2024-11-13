import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  return <>{children}</>;
} 