export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  assigneeId: string;
  department: string;
  dueDate: string;
  createdDate: string;
  estimatedHours: number;
  actualHours?: number;
  dependencies?: string[];
  attachments?: string[];
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  staffCount: number;
  activeTasksCount: number;
  completedTasksCount: number;
  avgCompletionTime: number;
  utilization: number;
  budget: number;
  budgetUsed: number;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar: string;
  activeTasksCount: number;
  completedTasksCount: number;
  hoursWorked: number;
  efficiency: number;
  status: 'available' | 'busy' | 'offline';
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Quarterly Report Analysis',
    description: 'Analyze Q4 financial performance and create comprehensive report',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Johnson',
    assigneeId: '1',
    department: 'Finance',
    dueDate: '2025-01-15',
    createdDate: '2025-01-08',
    estimatedHours: 16,
    actualHours: 8,
  },
  {
    id: '2',
    title: 'Website Redesign',
    description: 'Complete frontend redesign for company website',
    status: 'pending',
    priority: 'medium',
    assignee: 'Mike Chen',
    assigneeId: '2',
    department: 'IT',
    dueDate: '2025-01-20',
    createdDate: '2025-01-10',
    estimatedHours: 40,
  },
  {
    id: '3',
    title: 'Employee Training Program',
    description: 'Develop and implement new employee onboarding program',
    status: 'completed',
    priority: 'high',
    assignee: 'Lisa Davis',
    assigneeId: '3',
    department: 'HR',
    dueDate: '2025-01-12',
    createdDate: '2025-01-05',
    estimatedHours: 24,
    actualHours: 22,
  },
  {
    id: '4',
    title: 'Marketing Campaign Launch',
    description: 'Execute Q1 marketing campaign across all channels',
    status: 'overdue',
    priority: 'high',
    assignee: 'David Wilson',
    assigneeId: '4',
    department: 'Marketing',
    dueDate: '2025-01-10',
    createdDate: '2025-01-03',
    estimatedHours: 32,
    actualHours: 35,
  },
  {
    id: '5',
    title: 'Security Audit',
    description: 'Conduct comprehensive security audit of all systems',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Alex Rodriguez',
    assigneeId: '5',
    department: 'IT',
    dueDate: '2025-01-18',
    createdDate: '2025-01-12',
    estimatedHours: 20,
    actualHours: 12,
  },
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Finance',
    manager: 'Sarah Johnson',
    staffCount: 8,
    activeTasksCount: 12,
    completedTasksCount: 45,
    avgCompletionTime: 3.2,
    utilization: 85,
    budget: 500000,
    budgetUsed: 425000,
  },
  {
    id: '2',
    name: 'IT',
    manager: 'Mike Chen',
    staffCount: 15,
    activeTasksCount: 23,
    completedTasksCount: 67,
    avgCompletionTime: 4.1,
    utilization: 92,
    budget: 750000,
    budgetUsed: 680000,
  },
  {
    id: '3',
    name: 'HR',
    manager: 'Lisa Davis',
    staffCount: 6,
    activeTasksCount: 8,
    completedTasksCount: 34,
    avgCompletionTime: 2.8,
    utilization: 78,
    budget: 300000,
    budgetUsed: 245000,
  },
  {
    id: '4',
    name: 'Marketing',
    manager: 'David Wilson',
    staffCount: 10,
    activeTasksCount: 18,
    completedTasksCount: 52,
    avgCompletionTime: 3.5,
    utilization: 88,
    budget: 600000,
    budgetUsed: 545000,
  },
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Finance',
    role: 'Finance Manager',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    activeTasksCount: 3,
    completedTasksCount: 28,
    hoursWorked: 168,
    efficiency: 92,
    status: 'busy',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    department: 'IT',
    role: 'Senior Developer',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    activeTasksCount: 4,
    completedTasksCount: 35,
    hoursWorked: 172,
    efficiency: 87,
    status: 'available',
  },
  {
    id: '3',
    name: 'Lisa Davis',
    email: 'lisa.davis@company.com',
    department: 'HR',
    role: 'HR Manager',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    activeTasksCount: 2,
    completedTasksCount: 22,
    hoursWorked: 160,
    efficiency: 95,
    status: 'available',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    department: 'Marketing',
    role: 'Marketing Director',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    activeTasksCount: 5,
    completedTasksCount: 31,
    hoursWorked: 180,
    efficiency: 83,
    status: 'busy',
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    department: 'IT',
    role: 'Security Specialist',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    activeTasksCount: 3,
    completedTasksCount: 19,
    hoursWorked: 165,
    efficiency: 89,
    status: 'available',
  },
];

export const mockKPIs: KPI[] = [
  {
    id: '1',
    name: 'Task Completion Rate',
    value: 87,
    target: 85,
    unit: '%',
    trend: 'up',
    percentage: 2.4,
  },
  {
    id: '2',
    name: 'Average Response Time',
    value: 2.3,
    target: 3.0,
    unit: 'hours',
    trend: 'down',
    percentage: 23.3,
  },
  {
    id: '3',
    name: 'Team Productivity',
    value: 92,
    target: 90,
    unit: '%',
    trend: 'up',
    percentage: 2.2,
  },
  {
    id: '4',
    name: 'Budget Utilization',
    value: 78,
    target: 80,
    unit: '%',
    trend: 'stable',
    percentage: 0,
  },
];