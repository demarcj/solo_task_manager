import type { Metadata } from 'next';
import { AppShell } from '@/components/main/app_shell';
import { Providers } from '@/components/main/providers';
import '../style.css';

export const metadata: Metadata = {
  title: 'Personal Task Dashboard',
  description: 'A focused study and task dashboard for philosophy of art work.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
