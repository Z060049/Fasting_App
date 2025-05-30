import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useFastingContext } from '../context/FastingContext';

const MeScreen = ({ completedFasts = Array(31).fill(false) }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const { fastDuration = 0 } = useFastingContext?.() ?? {};
  const formattedDuration =
    fastDuration >= 3600
      ? `${(fastDuration / 3600).toFixed(0)} hours`
      : `${(fastDuration / 60).toFixed(0)} min`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Section 1: Profile Info */}
      <View style={styles.profileCard}>
        <Image
          source={require('../../assets/monkey.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Monkey Software</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total fasts</Text>
            <Text style={styles.statNumber}>2</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Fast Duration</Text>
            <Text style={styles.statNumber}>{formattedDuration}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Longest streak</Text>
            <Text style={styles.statNumber}>1</Text>
          </View>
        </View>
      </View>

      {/* Section 2: Calendar */}
      <View style={styles.calendarSection}>
        <Text style={styles.sectionTitle}>Calendar</Text>
        <View style={styles.calendarGrid}>
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = i + 1;
            const isFasted = date <= today.getDate() && Math.random() > 0.5;
            return (
              <View key={date} style={styles.dayBox}>
                <Svg width={28} height={28}>
                  <Circle
                    cx={14}
                    cy={14}
                    r={12}
                    stroke={isFasted ? '#FF2D55' : '#ccc'}
                    strokeWidth={4}
                    fill={isFasted ? '#FF2D55' : '#f2f2f2'}
                  />
                </Svg>
                <Text style={styles.dayLabel}>{date}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Section 3: Weekly Metrics */}
      <View style={styles.metricsSection}>
        <Text style={styles.sectionTitle}>Weekly Metrics</Text>
        <View style={styles.metricsCard}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Weight</Text>
            <Text style={styles.metricValue}>140.0 kg</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Avg. Fat Burning</Text>
            <View style={styles.zeroTag}>
              <Text style={styles.zeroTagText}>500 Cal</Text>
            </View>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Avg. Activity</Text>
            <Text style={styles.metricValue}>0m</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 100, paddingHorizontal: 16, backgroundColor: '#f2f2f2' },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    marginTop: -40,
  },
  name: { fontSize: 22, fontWeight: '700', color: '#222' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: { alignItems: 'center' },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  calendarSection: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  calendarGrid: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayBox: {
    width: '14.28%',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 11,
    color: '#222',
    marginTop: 2,
  },
  metricsSection: { marginTop: 20 },
  metricsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  zeroTag: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  zeroTagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default MeScreen;