import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Carbon Calculator",
  description:
    "Carbon calculator for measuring emmissions of end user device and network use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="">{children}</body>
    </html>
  );
}
