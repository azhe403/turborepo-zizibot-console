import React from 'react';

export default ({ PageTitle, children }: { PageTitle: string; children: React.ReactNode; }) => {
  return (
    <>
      <h1 className={'display-2'}>{PageTitle}</h1>
      {children}
    </>);
}
