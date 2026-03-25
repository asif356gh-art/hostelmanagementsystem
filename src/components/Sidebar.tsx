import { LayoutDashboard, Users, Home, LogOut, Menu, X } from 'lucide-react';
import { Page } from '../types';
import { useState } from 'react';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onLogout: () => void;
}

function Sidebar({ currentPage, onPageChange, onLogout }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { page: 'dashboard' as Page, icon: LayoutDashboard, label: 'Dashboard' },
    { page: 'students' as Page, icon: Users, label: 'Students' },
    { page: 'rooms' as Page, icon: Home, label: 'Rooms' },
  ];

  const handlePageChange = (page: Page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Hostel MS</h1>
            <p className="text-sm text-gray-600 mt-1">Management System</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handlePageChange(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                  currentPage === item.page
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
