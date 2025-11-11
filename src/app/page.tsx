'use client';

import { List, ListItem } from '@/components/ui/List';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { useTheme } from '@/hooks/useTheme';
import { TextField } from '@/components/ui/TextField';
import { Table } from '@/components/ui/Table';
import Button from '@/components/ui/Button/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Alert } from '@/components/ui/Alert';
import type { ColumnDef } from '@tanstack/react-table';

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
      <h1 className="text-white">{t('title')}</h1>

      <p>Locale</p>
      <List variant={'light'}>
        {locales.map((locale) => (
          <ListItem key={locale} onClick={() => setLocale(locale)}>
            {locale}
          </ListItem>
        ))}
      </List>

      <p>Theme</p>
      <List variant={'light'}>
        {themes.map((t) => (
          <ListItem key={t} onClick={() => setTheme(t)}>
            {t}
          </ListItem>
        ))}
      </List>

      <List size={'xs'} variant={'contained'} disabledRipple>
        {themes.map((t) => (
          <ListItem key={t} color={t === 'BLUEBERRY' ? 'error' : undefined}>
            {t}
          </ListItem>
        ))}
      </List>

      <div className="w-full mt-6">
        <TextField
          fullWidth
          label={'Email'}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={!email ? 'Required' : 'Looks good'}
          error={!email}
          variant="outlined"
          color="primary"
          size="md"
          startAdornment={<span>@</span>}
          endAdornment={<span>.com</span>}
        />
      </div>

      <div className="w-full mt-6">
        <Alert
          variant="flat"
          color="info"
          title="Heads up"
          description="This is an informational alert with dismiss."
          dismissible
        />
      </div>

      <div className="w-full mt-4">
        <Tabs
          variant="underlined"
          color="primary"
          items={[
            {
              value: 'overview',
              label: 'Overview',
              content: <div className="text-sm">Overview content</div>,
            },
            {
              value: 'details',
              label: 'Details',
              content: <div className="text-sm">Detailed content</div>,
            },
            {
              value: 'settings',
              label: 'Settings',
              content: <div className="text-sm">Settings content</div>,
              disabled: false,
            },
          ]}
          defaultValue="overview"
        />
      </div>

      <div className="w-full mt-6">
        <Table
          data={people}
          columns={columns}
          size="md"
          striped
          hoverable
          radius="md"
          shadow="sm"
          enableSorting
          enableFiltering
          enablePagination
          pageSize={5}
          enableRowSelection
          enableExpanding
          enableColumnPinning
          toolbarPlaceholder="Filter people"
          getSubRows={(row) => row.subRows}
          renderSubComponent={(row) => (
            <div className="text-sm text-gray-700">Expanded details for {row.original.name}</div>
          )}
        />
      </div>

      <div className="w-full flex flex-wrap gap-3 mt-4">
        <Button variant="contained" color="primary" size="md">
          Primary
        </Button>
        <Button variant="outlined" color="success" size="md" startIcon={<span>✓</span>}>
          Outlined
        </Button>
        <Button variant="ghost" color="error" size="md" endIcon={<span>→</span>}>
          Ghost
        </Button>
        <Button variant="flat" color="info" size="md" isIconOnly aria-label="Settings">
          ⚙️
        </Button>
        <Button variant="contained" color="warning" size="md" loading>
          Loading
        </Button>
      </div>
    </div>
  );
}
