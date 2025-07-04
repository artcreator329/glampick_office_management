import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, TrendingUp, DollarSign, Clock, Settings, ChartBar as BarChart } from 'lucide-react-native';
import { mockDepartments, mockStaff, mockTasks } from '@/data/mockData';
import DepartmentCard from '@/components/DepartmentCard';
import StaffCard from '@/components/StaffCard';

export default function DepartmentScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getDepartmentStats = () => {
    const totalStaff = mockStaff.length;
    const totalBudget = mockDepartments.reduce((sum, dept) => sum + dept.budget, 0);
    const totalBudgetUsed = mockDepartments.reduce((sum, dept) => sum + dept.budgetUsed, 0);
    const avgUtilization = mockDepartments.reduce((sum, dept) => sum + dept.utilization, 0) / mockDepartments.length;
    
    return { totalStaff, totalBudget, totalBudgetUsed, avgUtilization };
  };

  const getResourceAllocation = () => {
    return mockDepartments.map(dept => ({
      name: dept.name,
      allocated: dept.staffCount,
      utilization: dept.utilization,
      budget: dept.budget,
      budgetUsed: dept.budgetUsed,
    }));
  };

  const getBottlenecks = () => {
    const overutilized = mockDepartments.filter(dept => dept.utilization > 90);
    const overdueTasks = mockTasks.filter(task => task.status === 'overdue');
    const resourceConstrained = mockDepartments.filter(dept => (dept.budgetUsed / dept.budget) > 0.9);
    
    return { overutilized, overdueTasks, resourceConstrained };
  };

  const stats = getDepartmentStats();
  const resourceAllocation = getResourceAllocation();
  const bottlenecks = getBottlenecks();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Department</Text>
          <Text style={styles.subtitle}>Resource management and analytics</Text>
        </View>

        <View style={styles.viewSelector}>
          {['overview', 'staff', 'analytics'].map((view) => (
            <TouchableOpacity
              key={view}
              style={[
                styles.viewButton,
                selectedView === view && styles.viewButtonActive
              ]}
              onPress={() => setSelectedView(view)}
            >
              <Text style={[
                styles.viewButtonText,
                selectedView === view && styles.viewButtonTextActive
              ]}>
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Users size={20} color="#3B82F6" />
            <Text style={styles.statValue}>{stats.totalStaff}</Text>
            <Text style={styles.statLabel}>Total Staff</Text>
          </View>
          
          <View style={styles.statCard}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={styles.statValue}>{stats.avgUtilization.toFixed(0)}%</Text>
            <Text style={styles.statLabel}>Avg Utilization</Text>
          </View>
          
          <View style={styles.statCard}>
            <DollarSign size={20} color="#F59E0B" />
            <Text style={styles.statValue}>{((stats.totalBudgetUsed / stats.totalBudget) * 100).toFixed(0)}%</Text>
            <Text style={styles.statLabel}>Budget Used</Text>
          </View>
        </View>

        {selectedView === 'overview' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Departments Overview</Text>
              {mockDepartments.map((department) => (
                <DepartmentCard key={department.id} department={department} />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Resource Allocation</Text>
              {resourceAllocation.map((resource) => (
                <View key={resource.name} style={styles.resourceCard}>
                  <View style={styles.resourceHeader}>
                    <Text style={styles.resourceName}>{resource.name}</Text>
                    <Text style={styles.resourceUtilization}>{resource.utilization}%</Text>
                  </View>
                  
                  <View style={styles.resourceStats}>
                    <View style={styles.resourceStat}>
                      <Text style={styles.resourceStatLabel}>Staff Allocated</Text>
                      <Text style={styles.resourceStatValue}>{resource.allocated}</Text>
                    </View>
                    
                    <View style={styles.resourceStat}>
                      <Text style={styles.resourceStatLabel}>Budget Usage</Text>
                      <Text style={styles.resourceStatValue}>
                        {formatCurrency(resource.budgetUsed)} / {formatCurrency(resource.budget)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.resourceProgress}>
                    <View style={styles.resourceProgressBar}>
                      <View 
                        style={[
                          styles.resourceProgressFill,
                          { 
                            width: `${resource.utilization}%`,
                            backgroundColor: resource.utilization > 90 ? '#EF4444' : '#10B981'
                          }
                        ]}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {selectedView === 'staff' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Staff Members</Text>
            {mockStaff.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </View>
        )}

        {selectedView === 'analytics' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bottleneck Analysis</Text>
              
              <View style={styles.bottleneckCard}>
                <View style={styles.bottleneckHeader}>
                  <Clock size={20} color="#EF4444" />
                  <Text style={styles.bottleneckTitle}>Overutilized Departments</Text>
                </View>
                {bottlenecks.overutilized.length > 0 ? (
                  bottlenecks.overutilized.map((dept) => (
                    <View key={dept.id} style={styles.bottleneckItem}>
                      <Text style={styles.bottleneckItemText}>
                        {dept.name} - {dept.utilization}% utilization
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.bottleneckNone}>No overutilized departments</Text>
                )}
              </View>

              <View style={styles.bottleneckCard}>
                <View style={styles.bottleneckHeader}>
                  <DollarSign size={20} color="#F59E0B" />
                  <Text style={styles.bottleneckTitle}>Budget Constraints</Text>
                </View>
                {bottlenecks.resourceConstrained.length > 0 ? (
                  bottlenecks.resourceConstrained.map((dept) => (
                    <View key={dept.id} style={styles.bottleneckItem}>
                      <Text style={styles.bottleneckItemText}>
                        {dept.name} - {((dept.budgetUsed / dept.budget) * 100).toFixed(0)}% budget used
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.bottleneckNone}>No budget constraints</Text>
                )}
              </View>

              <View style={styles.bottleneckCard}>
                <View style={styles.bottleneckHeader}>
                  <BarChart size={20} color="#8B5CF6" />
                  <Text style={styles.bottleneckTitle}>Task Bottlenecks</Text>
                </View>
                {bottlenecks.overdueTasks.length > 0 ? (
                  bottlenecks.overdueTasks.map((task) => (
                    <View key={task.id} style={styles.bottleneckItem}>
                      <Text style={styles.bottleneckItemText}>
                        {task.title} - {task.department}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.bottleneckNone}>No overdue tasks</Text>
                )}
              </View>
            </View>
          </>
        )}
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
  viewSelector: {
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
  viewButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonActive: {
    backgroundColor: '#3B82F6',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  viewButtonTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
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
  resourceCard: {
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
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  resourceUtilization: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  resourceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resourceStat: {
    flex: 1,
  },
  resourceStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  resourceStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  resourceProgress: {
    marginTop: 8,
  },
  resourceProgressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  resourceProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  bottleneckCard: {
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
  bottleneckHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  bottleneckTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  bottleneckItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  bottleneckItemText: {
    fontSize: 14,
    color: '#374151',
  },
  bottleneckNone: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
});