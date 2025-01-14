import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/artists/dashboard"
        afterSignInUrl="/artists/dashboard"
        appearance={{
          elements: {
            card: "bg-white dark:bg-gray-800 shadow-xl",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-gray-600 dark:text-gray-300",
            socialButtonsBlockButton: "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
            footerActionLink: "text-primary hover:text-primary/90",
          },
        }}
      />
    </div>
  );
}
