'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { useTheme } from '@/hooks/useTheme';
import type { ColumnDef } from '@tanstack/react-table';
import { Chart } from '@/components/ui/Chart';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const { setTheme, themes } = useTheme();
  const t = useTranslations('HomePage');
  const { setLocale, locales } = useI18n();
  const [email, setEmail] = useState('');
  type Person = {
    id: number;
    name: string;
    age: number;
    role: string;
    subRows?: Person[];
  };

  const people: Person[] = [
    {
      id: 1,
      name: 'Ava',
      age: 28,
      role: 'Admin',
      subRows: [{ id: 11, name: 'Ava Jr.', age: 3, role: 'Child' }],
    },
    { id: 2, name: 'Noah', age: 34, role: 'User' },
    { id: 3, name: 'Liam', age: 42, role: 'Manager' },
  ];

  const columns: ColumnDef<Person>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age' },
    { accessorKey: 'role', header: 'Role' },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl mx-auto px-2 py-10">
      <div>
        <Button>Click</Button>
      </div>
    </div>
  );
}
