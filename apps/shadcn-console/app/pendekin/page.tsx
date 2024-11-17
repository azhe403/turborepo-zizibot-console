import DefaultLayout from '@/components/layouts/default-layout';
import ListPendekin from '@zizibot/ui/features/pendekin/list-pendekin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Pendekin'
};

export default () => (
  <>
    <DefaultLayout>
      <ListPendekin />
    </DefaultLayout>
  </>
)