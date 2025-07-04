import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Mail, CircleCheck as CheckCircle, Clock, TrendingUp } from 'lucide-react-native';
import { Staff } from '@/data/mockData';

interface StaffCardProps {
  staff: Staff;
  onPress?: () => void;
}

export default function StaffCard({ staff, onPress }: StaffCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10B981';
      case 'busy':
        return '#F59E0B';
      case 'offline':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return '#10B981';
    if (efficiency >= 80) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: staff.avatar }} style={styles.avatar} />
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(staff.status) }]} />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{staff.name}</Text>
          <Text style={styles.role}>{staff.role}</Text>
          <Text style={styles.department}>{staff.department}</Text>
          
          <View style={styles.contactContainer}>
            <Mail size={12} color="#6B7280" />
            <Text style={styles.email}>{staff.email}</Text>
          </View>
        </View>
        
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: getStatusColor(staff.status) }]}>
            {staff.status.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.statValue}>{staff.activeTasksCount}</Text>
          <Text style={styles.statLabel}>Active Tasks</Text>
        </View>
        
        <View style={styles.statItem}>
          <CheckCircle size={16} color="#6B7280" />
          <Text style={styles.statValue}>{staff.completedTasksCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        
        <View style={styles.statItem}>
          <TrendingUp size={16} color="#6B7280" />
          <Text style={styles.statValue}>{staff.hoursWorked}h</Text>
          <Text style={styles.statLabel}>Hours Worked</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.efficiencyContainer}>
            <View style={[styles.efficiencyDot, { backgroundColor: getEfficiencyColor(staff.efficiency) }]} />
          </View>
          <Text style={[styles.statValue, { color: getEfficiencyColor(staff.efficiency) }]}>
            {staff.efficiency}%
          </Text>
          <Text style={styles.statLabel}>Efficiency</Text>
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
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  role: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 1,
  },
  department: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  email: {
    fontSize: 10,
    color: '#6B7280',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 9,
    color: '#6B7280',
  },
  efficiencyContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  efficiencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});