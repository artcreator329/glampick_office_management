import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, Clock, DollarSign, Activity } from 'lucide-react-native';
import { Department } from '@/data/mockData';

interface DepartmentCardProps {
  department: Department;
  onPress?: () => void;
}

export default function DepartmentCard({ department, onPress }: DepartmentCardProps) {
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return '#EF4444';
    if (utilization >= 80) return '#F59E0B';
    return '#10B981';
  };

  const getBudgetUsagePercentage = () => {
    return (department.budgetUsed / department.budget) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{department.name}</Text>
          <Text style={styles.manager}>Manager: {department.manager}</Text>
        </View>
        <View style={[styles.utilizationBadge, { backgroundColor: getUtilizationColor(department.utilization) }]}>
          <Text style={styles.utilizationText}>{department.utilization}%</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users size={16} color="#6B7280" />
          <Text style={styles.statValue}>{department.staffCount}</Text>
          <Text style={styles.statLabel}>Staff</Text>
        </View>
        
        <View style={styles.statItem}>
          <Activity size={16} color="#6B7280" />
          <Text style={styles.statValue}>{department.activeTasksCount}</Text>
          <Text style={styles.statLabel}>Active Tasks</Text>
        </View>
        
        <View style={styles.statItem}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.statValue}>{department.avgCompletionTime}d</Text>
          <Text style={styles.statLabel}>Avg Time</Text>
        </View>
        
        <View style={styles.statItem}>
          <DollarSign size={16} color="#6B7280" />
          <Text style={styles.statValue}>{getBudgetUsagePercentage().toFixed(0)}%</Text>
          <Text style={styles.statLabel}>Budget Used</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetText}>
            Budget: {formatCurrency(department.budgetUsed)} / {formatCurrency(department.budget)}
          </Text>
          <View style={styles.budgetBar}>
            <View 
              style={[
                styles.budgetFill, 
                { 
                  width: `${getBudgetUsagePercentage()}%`,
                  backgroundColor: getBudgetUsagePercentage() > 90 ? '#EF4444' : '#10B981'
                }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.completionContainer}>
          <Text style={styles.completionText}>
            Completed: {department.completedTasksCount} tasks
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  manager: {
    fontSize: 12,
    color: '#6B7280',
  },
  utilizationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  utilizationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  footer: {
    gap: 8,
  },
  budgetContainer: {
    gap: 6,
  },
  budgetText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  budgetBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  budgetFill: {
    height: '100%',
    borderRadius: 3,
  },
  completionContainer: {
    alignItems: 'flex-end',
  },
  completionText: {
    fontSize: 12,
    color: '#6B7280',
  },
});