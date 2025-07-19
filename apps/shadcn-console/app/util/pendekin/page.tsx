import ListPendekin from '@zizibot/ui/features/pendekin/list-pendekin';
import MainLayout from '@zizibot/ui/layouts/main-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pendekin'
};
export default function Page() {
  return (
    <MainLayout>
      <ListPendekin />
    </MainLayout>
  );
}
