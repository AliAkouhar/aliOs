import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AliOS | Ali Akouhar - Software Engineer",
  description: "Interactive portfolio operating system. Explore through terminal commands. Software engineer with expertise in low-level programming and modern web technologies.",
  keywords: ["Ali Akouhar", "Software Engineer", "Portfolio", "1337", "42 Network", "Morocco"],
  authors: [{ name: "Ali Akouhar" }],
  openGraph: {
    title: "AliOS | Ali Akouhar",
    description: "Interactive portfolio operating system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
