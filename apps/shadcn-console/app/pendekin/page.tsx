import MainLayout from '@zizibot/ui/layouts/main-layout';
import ListPendekin from '@zizibot/ui/features/pendekin/list-pendekin';

// const ListPendekinPage = () => (
//   <MainLayout>
//     <ListPendekin />
//   </MainLayout>
// );
//
// export default ListPendekin;


export default function Page() {
  return (
    <MainLayout>
      <ListPendekin />
    </MainLayout>
  );
}
