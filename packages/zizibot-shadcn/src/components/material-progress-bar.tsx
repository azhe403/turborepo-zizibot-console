'use client';

import * as React from 'react';
import { cn } from '@zizibot/shadcn/lib/utils';
import { Progress } from '@zizibot/shadcn/components/ui/progress';

interface MaterialProgressBarProps
  extends React.ComponentPropsWithoutRef<typeof Progress> {
  color?: 'primary' | 'accent' | 'warn';
  mode?: 'determinate' | 'indeterminate';
}

export function MaterialProgressBar({
                                      value = 0,
                                      color = 'primary',
                                      mode = 'determinate',
                                      className,
                                      ...props
                                    }: MaterialProgressBarProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (mode === 'indeterminate') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    } else {
      setProgress(value || 0);
    }
  }, [mode, value]);

  return (
    <Progress
      value={progress}
      className={cn(
        'h-1 w-full',
        {
          'bg-primary': color === 'primary',
          'bg-purple-500': color === 'accent',
          'bg-red-500': color === 'warn'
        },
        mode === 'indeterminate' && 'animate-pulse',
        className
      )}
      {...props}
    />
  );
}

