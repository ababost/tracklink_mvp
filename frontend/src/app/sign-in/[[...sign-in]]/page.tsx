import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white dark:bg-gray-800 shadow-none",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
          },
        }}
        afterSignInUrl="/artists/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
