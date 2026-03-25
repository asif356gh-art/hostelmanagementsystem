import { Student, Room } from '../types';

const STUDENTS_KEY = 'hostel_students';
const ROOMS_KEY = 'hostel_rooms';

export const getStudents = (): Student[] => {
  const data = localStorage.getItem(STUDENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveStudents = (students: Student[]): void => {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
};

export const getRooms = (): Room[] => {
  const data = localStorage.getItem(ROOMS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRooms = (rooms: Room[]): void => {
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
};

export const addStudent = (student: Student): void => {
  const students = getStudents();
  students.push(student);
  saveStudents(students);

  const rooms = getRooms();
  const room = rooms.find(r => r.roomNumber === student.roomNumber);
  if (room) {
    room.occupied += 1;
    saveRooms(rooms);
  }
};

export const deleteStudent = (studentId: string): void => {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);

  if (student) {
    const rooms = getRooms();
    const room = rooms.find(r => r.roomNumber === student.roomNumber);
    if (room && room.occupied > 0) {
      room.occupied -= 1;
      saveRooms(rooms);
    }
  }

  const updatedStudents = students.filter(s => s.id !== studentId);
  saveStudents(updatedStudents);
};

export const addRoom = (room: Room): void => {
  const rooms = getRooms();
  rooms.push(room);
  saveRooms(rooms);
};

export const deleteRoom = (roomId: string): void => {
  const rooms = getRooms();
  const updatedRooms = rooms.filter(r => r.id !== roomId);
  saveRooms(updatedRooms);
};
