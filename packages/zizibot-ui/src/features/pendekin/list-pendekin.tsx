'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@zizibot/ui/components/PageContainer';
import FormCreatePendekin from '@zizibot/ui/features/pendekin/form-create-pendekin';
import { useGetPendekin } from '@zizibot/rest-client/internal/pendekin-rest';
import { PendekinItem } from '@zizibot/contracts/rest-api/pendekin';
import { DataTable } from '@zizibot/shadcn/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<PendekinItem>[] = [
  {
    accessorKey: 'shortPath',
    header: 'Short Path'
  },
  {
    accessorKey: 'originalUrl',
    header: 'Original Url'
  },
  {
    accessorKey: 'createdDate',
    header: 'Created date'
  },
  {
    accessorKey: 'updatedDate',
    header: 'Updated Date'
  }
];

export default function ListPendekin() {
  const [listPendekin, setListPendekin] = useState<PendekinItem[]>([]);

  const loadPendekin = () => {
    useGetPendekin().then(response => setListPendekin(response.result));
  };

  useEffect(() => {
    loadPendekin();
  }, []);

  return (
    <>
      <PageContainer PageTitle={'Daftar Pendekin'}>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="aspect-video w-full rounded-lg bg-muted/50 p-2">
            <FormCreatePendekin afterCreatePendekin={loadPendekin} />
          </div>
          <div className="aspect-video w-full rounded-lg bg-muted/50 p-2">
            <DataTable columns={columns} data={listPendekin} />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
