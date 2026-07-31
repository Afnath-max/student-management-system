export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  age: number;
  gender: string;
  address: string;
  registrationDate: string;
}

export interface DashboardStats {
  totalStudents: number;
  recentlyAddedStudents: Student[];
}

export interface AuthResponse {
  token: string;
  email: string;
}
