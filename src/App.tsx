import { useState, useEffect } from 'react';
import { Page } from './types';
import { getStudents, getRooms } from './utils/storage';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentsPage from './components/StudentsPage';
import RoomsPage from './components/RoomsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [students, setStudents] = useState(getStudents());
  const [rooms, setRooms] = useState(getRooms());

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleUpdate = () => {
    setStudents(getStudents());
    setRooms(getRooms());
  };

  useEffect(() => {
    handleUpdate();
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {currentPage === 'dashboard' && (
          <Dashboard students={students} rooms={rooms} />
        )}
        {currentPage === 'students' && (
          <StudentsPage
            students={students}
            rooms={rooms}
            onUpdate={handleUpdate}
          />
        )}
        {currentPage === 'rooms' && (
          <RoomsPage rooms={rooms} onUpdate={handleUpdate} />
        )}
      </main>
    </div>
  );
}

export default App;
