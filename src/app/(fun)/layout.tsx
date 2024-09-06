import type { Metadata } from "next";
import Header from "@/components/elements/Header";
import Siderbar from "@/components/elements/Siderbar";

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
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Siderbar />

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Header at the top */}
        <Header />
        {/* Dashboard in the remaining space */}
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
}
