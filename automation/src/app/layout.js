"use client";
import { DM_Sans } from "next/font/google";
import "../../styles/global.css";
import { ThemeProvider } from "./components/ThemeProviders";
import { ClerkProvider } from "@clerk/nextjs";
const font = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} `}>
        <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange>
                {children}
        </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
    
  );
}


