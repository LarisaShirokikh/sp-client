'use client';


import { ReactNode } from 'react';
import { HolidayProvider } from './hooks/useHoliday';

export function HolidayProviders({ children }: { children: ReactNode }) {
  return (
    <HolidayProvider>
      {children}
    </HolidayProvider>
  );
}