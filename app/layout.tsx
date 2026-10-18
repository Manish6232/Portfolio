import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manish Rajak — Full Stack Engineer",
  description:
    "Software Engineer building scalable web applications with AI integration and real-time features. B.Tech @ BIT Bengaluru.",
  keywords: ["Manish Rajak", "Full Stack Engineer", "React", "Next.js", "Node.js", "Portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
