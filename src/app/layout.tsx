import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/elements/theme-provider";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyEMI",
  description: "A simple EMI calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
