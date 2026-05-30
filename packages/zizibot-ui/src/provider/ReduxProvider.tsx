'use client';

import { Provider } from 'react-redux';
import { useRef, type ReactNode } from 'react';
import { AppStore, appStore } from '@zizibot/store/user/store';

export default function ReduxProvider({ children }: {
  children: ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = appStore;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
