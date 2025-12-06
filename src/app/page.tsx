'use client';

import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl mx-auto px-2 py-10">
      <div>
        <Button variant="outlined" color="primary">
          Click
        </Button>
      </div>
    </div>
  );
}
