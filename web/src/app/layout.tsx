import "./globals.css";

export const metadata = {
  title: "AI Engineer Portfolio",
  description: "AI Engineer job-ready portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
