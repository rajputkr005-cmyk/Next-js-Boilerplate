import './globals.css';

export const metadata = {
  title: 'My Next.js App',
  description: 'Boilerplate with App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}