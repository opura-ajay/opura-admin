'use client';

import { getToken } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function DebugAuthPage() {
  const [tokenInfo, setTokenInfo] = useState<{
    localStorage: string | null;
    cookies: string;
  } | null>(null);

  useEffect(() => {
    const localStorageToken = getToken();
    const allCookies = document.cookie;
    
    setTokenInfo({
      localStorage: localStorageToken,
      cookies: allCookies,
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">LocalStorage Token:</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto">
            {tokenInfo?.localStorage || 'No token found'}
          </pre>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">All Cookies:</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto">
            {tokenInfo?.cookies || 'No cookies found'}
          </pre>
        </div>

        <div className="p-4 border rounded bg-yellow-50">
          <h2 className="font-semibold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Check if opura_jwt_token appears in cookies above</li>
            <li>If not, log out and log in again</li>
            <li>The cookie should be set on login with 7-day expiry</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
