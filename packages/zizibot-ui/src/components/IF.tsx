import { ReactNode } from 'react';

function IF({ children, condition }: { children: ReactNode, condition: boolean }) {
  return condition ? children : null;
}

export {
  IF
};
