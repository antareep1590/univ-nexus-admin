import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Univ Jobs
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Admin Portal</p>
        </div>
        {children}
      </div>
    </div>
  );
}