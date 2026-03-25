import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { Room } from '../types';
import { addRoom, deleteRoom } from '../utils/storage';

interface RoomsPageProps {
  rooms: Room[];
  onUpdate: () => void;
}

function RoomsPage({ rooms, onUpdate }: RoomsPageProps) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    capacity: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const roomExists = rooms.find(r => r.roomNumber === formData.roomNumber);
    if (roomExists) {
      alert('Room number already exists. Please use a different number.');
      return;
    }

    const newRoom: Room = {
      id: Date.now().toString(),
      roomNumber: formData.roomNumber,
      capacity: parseInt(formData.capacity),
      occupied: 0,
    };

    addRoom(newRoom);
    setFormData({ roomNumber: '', capacity: '' });
    setShowModal(false);
    onUpdate();
  };

  const handleDelete = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.occupied > 0) {
      alert('Cannot delete room with students. Please move students first.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(roomId);
      onUpdate();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Rooms</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Room
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No rooms added yet</p>
          <p className="text-gray-400 mt-2">Click "Add Room" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Room {room.roomNumber}
                </h3>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="text-red-600 hover:text-red-800 transition"
                  disabled={room.occupied > 0}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-semibold text-gray-800">{room.capacity}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Occupied:</span>
                  <span className="font-semibold text-gray-800">{room.occupied}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-semibold text-green-600">
                    {room.capacity - room.occupied}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                      className={`text-sm font-medium ${
                        room.occupied < room.capacity
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {room.occupied < room.capacity ? 'Available' : 'Full'}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        room.occupied >= room.capacity
                          ? 'bg-red-500'
                          : room.occupied > room.capacity * 0.7
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${(room.occupied / room.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Add New Room</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Number
                </label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, roomNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="e.g., 101, A-1, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Number of students"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomsPage;
