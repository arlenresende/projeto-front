'use client';

import Sidebar from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="flex h-screen bg-[#f4f3f3]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 text-black  flex items-center justify-between px-6 bg-[#fde3c9]">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <Search className="h-5 w-5 " />
            <Input
              placeholder="Pesquisar..."
              className="border rounded-none placeholder:text-black border-black border-t-0  border-l-0 border-r-0 focus-visible:ring-0 bg-transparent text-black"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
