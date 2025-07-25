'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PendekinItem } from '@zizibot/contracts/rest-api/pendekin';
import { useDeletePendekin, useGetListPendekin } from '@zizibot/rest-client/internal/pendekin-rest';
import { DataTable } from '@zizibot/shadcn/components/data-table';
import { Button } from '@zizibot/shadcn/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@zizibot/shadcn/components/ui/dropdown-menu';
import PageContainer from '@zizibot/ui/components/PageContainer';
import FormCreatePendekin from '@zizibot/ui/features/pendekin/form-create-pendekin';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ListPendekin() {
  const [listPendekin, setListPendekin] = useState<PendekinItem[]>([]);

  const loadPendekin = () => {
    useGetListPendekin().then(response => setListPendekin(response.result));
  };

  const deletePendekin = (pendekinId: string) => {
    console.log('deletePendekin', pendekinId);
    useDeletePendekin(pendekinId).then(r => {
      loadPendekin();
    });
  };

  const columns: ColumnDef<PendekinItem>[] = [
    {
      accessorKey: 'shortUrl',
      header: 'Short Url'
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
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const pendekinItem = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => window.open(pendekinItem.shortUrl, '_blank', 'noopener, noreferrer')}>
                Open in New Tab
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deletePendekin(pendekinItem.pendekinId)}>
                Delete Route
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  useEffect(() => {
    loadPendekin();
  }, []);

  return (
    <>
      <PageContainer PageTitle={'Pendekin'}>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="aspect-video w-full rounded-lg bg-muted/50 p-2">
            <FormCreatePendekin afterCreatePendekin={loadPendekin} />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex justify-end">
              <Button 
                onClick={loadPendekin}
                variant="outline"
              >
                Refresh List
              </Button>
            </div>
            <div className="max-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <DataTable columns={columns} data={listPendekin} />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
