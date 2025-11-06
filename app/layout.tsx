export const metadata = {
  title: 'Nexora Backend API',
  description: 'E-commerce backend with AI features',
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
