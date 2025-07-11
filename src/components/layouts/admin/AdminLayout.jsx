import Navbar from './layouts/navbar';
import { useState } from 'react';
import Sidebar from './layouts/sidebar';
import Toast from '@/components/common/Toast';

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content Scrollable */}
        <main className="flex-1 overflow-auto p-4">
          <div className="min-w-full overflow-x-auto">
            {children}
          </div>
        </main>

        <Toast />
      </div>
    </div>
  );
}
