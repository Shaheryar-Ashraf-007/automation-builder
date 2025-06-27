"use client";
import { DM_Sans } from "next/font/google";
import "../../styles/global.css";
import { ThemeProvider } from "./components/ThemeProviders";
const font = DM_Sans({ subsets: ["latin"] });






export default function RootLayout({ children }) {

  

  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange>
                {children}
        </ThemeProvider>
      </body>
    </html>
    
  );
}


