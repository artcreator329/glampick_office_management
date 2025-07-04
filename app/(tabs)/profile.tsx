import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, MapPin, Calendar, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Award, Clock, Target } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Mock current user data
  const currentUser = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Finance',
    role: 'Finance Manager',
    location: 'New York, NY',
    joinDate: '2022-03-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    stats: {
      tasksCompleted: 28,
      hoursWorked: 168,
      efficiency: 92,
      projectsLed: 5,
    },
    recentAchievements: [
      'Completed Q4 Financial Report',
      'Led Budget Planning Initiative',
      'Achieved 95% Task Completion Rate',
    ],
  };

  const menuItems = [
    { icon: Settings, label: 'Account Settings', color: '#6B7280' },
    { icon: Bell, label: 'Notifications', color: '#6B7280', hasSwitch: true },
    { icon: Shield, label: 'Privacy & Security', color: '#6B7280' },
    { icon: HelpCircle, label: 'Help & Support', color: '#6B7280' },
    { icon: LogOut, label: 'Sign Out', color: '#EF4444' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            <View style={styles.statusDot} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.role}>{currentUser.role}</Text>
            <Text style={styles.department}>{currentUser.department}</Text>
            
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Mail size={16} color="#6B7280" />
                <Text style={styles.contactText}>{currentUser.email}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <Phone size={16} color="#6B7280" />
                <Text style={styles.contactText}>{currentUser.phone}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.contactText}>{currentUser.location}</Text>
              </View>
              
              <View style={styles.contactItem}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.contactText}>
                  Joined {new Date(currentUser.joinDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Target size={20} color="#10B981" />
            <Text style={styles.statValue}>{currentUser.stats.tasksCompleted}</Text>
            <Text style={styles.statLabel}>Tasks Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={20} color="#3B82F6" />
            <Text style={styles.statValue}>{currentUser.stats.hoursWorked}h</Text>
            <Text style={styles.statLabel}>Hours Worked</Text>
          </View>
          
          <View style={styles.statCard}>
            <Award size={20} color="#F59E0B" />
            <Text style={styles.statValue}>{currentUser.stats.efficiency}%</Text>
            <Text style={styles.statLabel}>Efficiency</Text>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {currentUser.recentAchievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Award size={16} color="#F59E0B" />
              <Text style={styles.achievementText}>{achievement}</Text>
            </View>
          ))}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <item.icon size={20} color={item.color} />
                <Text style={[styles.menuItemText, { color: item.color }]}>
                  {item.label}
                </Text>
              </View>
              
              {item.hasSwitch ? (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
                />
              ) : (
                <View style={styles.menuItemRight}>
                  <Text style={styles.menuItemArrow}>›</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Office Management App v1.0.0
          </Text>
          <Text style={styles.footerText}>
            © 2025 Company Name
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  editButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
  },
  statusDot: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 2,
  },
  department: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  contactInfo: {
    width: '100%',
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 16,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  achievementsSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  achievementText: {
    fontSize: 14,
    color: '#374151',
  },
  menuSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemRight: {
    padding: 4,
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});