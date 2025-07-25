import MainLayout from '@zizibot/ui/layouts/main-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home'
};
export default function Page() {
  return (
    <main>
      <MainLayout></MainLayout>
    </main>
  );
}
