import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';
import { Task } from '@/data/mockData';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in-progress':
        return '#F59E0B';
      case 'overdue':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#10B981" />;
      case 'in-progress':
        return <Clock size={16} color="#F59E0B" />;
      case 'overdue':
        return <AlertTriangle size={16} color="#EF4444" />;
      default:
        return <Circle size={16} color="#6B7280" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          {getStatusIcon(task.status)}
          <Text style={[styles.statusText, { color: getStatusColor(task.status) }]}>
            {task.status.replace('-', ' ').toUpperCase()}
          </Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
          <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.assigneeInfo}>
          <Text style={styles.assigneeText}>Assigned to: {task.assignee}</Text>
          <Text style={styles.departmentText}>{task.department}</Text>
        </View>
        <View style={styles.dateInfo}>
          <Text style={styles.dueDateText}>Due: {formatDate(task.dueDate)}</Text>
          <Text style={styles.hoursText}>
            {task.actualHours || 0}h / {task.estimatedHours}h
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  assigneeInfo: {
    flex: 1,
  },
  assigneeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  departmentText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  dateInfo: {
    alignItems: 'flex-end',
  },
  dueDateText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  hoursText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
});