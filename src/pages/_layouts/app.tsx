import Sidebar from '@/components/sidebar';
import { useSidebar } from '@/components/sidebar/context';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Bell, LogOut, Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  const { setMobileOpen } = useSidebar();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = '/sign-in';
  };

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block">
              <h2 className="text-sm text-gray-500 dark:text-gray-400">
                Olá,{' '}
                <span className="text-gray-900 dark:text-white font-semibold">
                  {user?.name?.split(' ')[0] ?? 'Usuário'}
                </span>
                👋
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#465fff] rounded-full border-2 border-white dark:border-[#111827]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
