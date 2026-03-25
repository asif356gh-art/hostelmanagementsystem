import { Users, Home, DoorOpen } from 'lucide-react';
import { Student, Room } from '../types';

interface DashboardProps {
  students: Student[];
  rooms: Room[];
}

function Dashboard({ students, rooms }: DashboardProps) {
  const totalStudents = students.length;
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.occupied < room.capacity).length;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
    },
    {
      title: 'Total Rooms',
      value: totalRooms,
      icon: Home,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
    },
    {
      title: 'Available Rooms',
      value: availableRooms,
      icon: DoorOpen,
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.bgLight} p-4 rounded-full`}>
                <stat.icon className={`w-8 h-8 text-${stat.color.replace('bg-', '')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Students</h2>
          {students.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No students added yet</p>
          ) : (
            <div className="space-y-3">
              {students.slice(-5).reverse().map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">ID: {student.studentId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">
                      Room {student.roomNumber}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Room Status</h2>
          {rooms.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No rooms added yet</p>
          ) : (
            <div className="space-y-3">
              {rooms.slice(0, 5).map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">Room {room.roomNumber}</p>
                    <p className="text-sm text-gray-500">
                      Capacity: {room.capacity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      room.occupied < room.capacity ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {room.occupied < room.capacity ? 'Available' : 'Full'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {room.occupied}/{room.capacity} occupied
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
