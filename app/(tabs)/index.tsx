import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, Users, SquareCheck as CheckSquare, TriangleAlert as AlertTriangle, Clock, TrendingUp } from 'lucide-react-native';
import { mockTasks, mockDepartments, mockKPIs, mockStaff } from '@/data/mockData';
import KPICard from '@/components/KPICard';
import TaskCard from '@/components/TaskCard';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getTaskStats = () => {
    const total = mockTasks.length;
    const completed = mockTasks.filter(t => t.status === 'completed').length;
    const inProgress = mockTasks.filter(t => t.status === 'in-progress').length;
    const overdue = mockTasks.filter(t => t.status === 'overdue').length;
    const pending = mockTasks.filter(t => t.status === 'pending').length;
    
    return { total, completed, inProgress, overdue, pending };
  };

  const getRecentTasks = () => {
    return mockTasks
      .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      .slice(0, 3);
  };

  const getTopPerformers = () => {
    return mockStaff
      .sort((a, b) => b.efficiency - a.efficiency)
      .slice(0, 3);
  };

  const stats = getTaskStats();
  const recentTasks = getRecentTasks();
  const topPerformers = getTopPerformers();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Company Overview & Analytics</Text>
        </View>

        <View style={styles.periodSelector}>
          {['week', 'month', 'quarter'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
            <BarChart3 size={20} color="#3B82F6" />
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <CheckSquare size={20} color="#10B981" />
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
            <Clock size={20} color="#F59E0B" />
            <Text style={styles.statValue}>{stats.inProgress}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#FEF2F2' }]}>
            <AlertTriangle size={20} color="#EF4444" />
            <Text style={styles.statValue}>{stats.overdue}</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          {mockKPIs.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          {recentTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          <View style={styles.performersContainer}>
            {topPerformers.map((staff, index) => (
              <View key={staff.id} style={styles.performerCard}>
                <View style={styles.performerRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.performerInfo}>
                  <Text style={styles.performerName}>{staff.name}</Text>
                  <Text style={styles.performerRole}>{staff.role}</Text>
                  <Text style={styles.performerDepartment}>{staff.department}</Text>
                </View>
                <View style={styles.performerStats}>
                  <View style={styles.performerStatItem}>
                    <TrendingUp size={14} color="#10B981" />
                    <Text style={styles.performerEfficiency}>{staff.efficiency}%</Text>
                  </View>
                  <Text style={styles.performerTasks}>
                    {staff.completedTasksCount} tasks completed
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Department Overview</Text>
          <View style={styles.departmentGrid}>
            {mockDepartments.map((dept) => (
              <View key={dept.id} style={styles.departmentCard}>
                <Text style={styles.departmentName}>{dept.name}</Text>
                <View style={styles.departmentStats}>
                  <View style={styles.departmentStatItem}>
                    <Users size={14} color="#6B7280" />
                    <Text style={styles.departmentStatText}>{dept.staffCount} staff</Text>
                  </View>
                  <View style={styles.departmentStatItem}>
                    <CheckSquare size={14} color="#6B7280" />
                    <Text style={styles.departmentStatText}>{dept.activeTasksCount} active</Text>
                  </View>
                </View>
                <View style={styles.departmentUtilization}>
                  <Text style={styles.departmentUtilizationText}>
                    {dept.utilization}% utilization
                  </Text>
                  <View style={styles.departmentUtilizationBar}>
                    <View 
                      style={[
                        styles.departmentUtilizationFill,
                        { 
                          width: `${dept.utilization}%`,
                          backgroundColor: dept.utilization > 90 ? '#EF4444' : '#10B981'
                        }
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#3B82F6',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  performersContainer: {
    gap: 12,
  },
  performerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  performerRole: {
    fontSize: 12,
    color: '#6B7280',
  },
  performerDepartment: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  performerStats: {
    alignItems: 'flex-end',
  },
  performerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  performerEfficiency: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  performerTasks: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  departmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  departmentCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  departmentStats: {
    gap: 4,
    marginBottom: 12,
  },
  departmentStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  departmentStatText: {
    fontSize: 12,
    color: '#6B7280',
  },
  departmentUtilization: {
    gap: 4,
  },
  departmentUtilizationText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  departmentUtilizationBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  departmentUtilizationFill: {
    height: '100%',
    borderRadius: 2,
  },
});