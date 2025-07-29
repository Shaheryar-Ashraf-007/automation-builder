"use client";
import { DM_Sans } from "next/font/google";
import "../../styles/global.css";
import { ThemeProvider } from "./components/ThemeProviders";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

const font = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange
          >
            <SignedIn>
              {children}
            </SignedIn>
            
            <SignedOut>
              <div className="flex items-center justify-center min-h-screen">
                <SignIn routing="hash" />
              </div>
            </SignedOut>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}