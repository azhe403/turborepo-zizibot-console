import type { ReactNode } from 'react';

export default function PageContainer({ PageTitle, children }: { PageTitle: string; children: ReactNode; }) {
  return (
    <>
      <h1 className={'display-2'}>{PageTitle}</h1>
      {children}
    </>
  );
}
