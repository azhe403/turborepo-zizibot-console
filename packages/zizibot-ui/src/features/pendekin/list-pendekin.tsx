'use client';

import { useState } from 'react';
import PageContainer from '@zizibot/ui/components/PageContainer';
import CreatePendekin from '@zizibot/ui/features/pendekin/create-pendekin';
import { useGetPendekin } from '@zizibot/rest-client/internal/pendekin-rest';
import { PendekinItem } from '@zizibot/contracts/rest-api/pendekin';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@zizibot/shadcn/components/ui/table';

export default function ListPendekin() {
  const [listPendekin, setListPendekin] = useState<PendekinItem[]>();
  const loadPendekin = () => {
    useGetPendekin();
  };
  return (
    <>
      <PageContainer PageTitle={'Daftar Pendekin'}>
        <CreatePendekin afterCreatePendekin={loadPendekin} />
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </PageContainer>
    </>
  );
}
