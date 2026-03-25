export interface Student {
  id: string;
  name: string;
  studentId: string;
  roomNumber: string;
  dateAdded: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
}

export type Page = 'login' | 'dashboard' | 'students' | 'rooms';
