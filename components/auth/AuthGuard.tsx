'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/login') {
      setIsAuthenticated(true);
      return;
    }

    const isAuth = localStorage.getItem('cf-authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [pathname, router]);

  // Show nothing while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[var(--grey-900)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--grey-700)]" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--brand-gold)] animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

