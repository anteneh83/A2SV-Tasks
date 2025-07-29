import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Listing Application",
  description: "Find your next career opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
