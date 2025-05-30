import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const FAST_DURATION_SECONDS = 16 * 60 * 60; // 16 hours in seconds

const HomeScreen = () => {
  const [isFasting, setIsFasting] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showEditGoals, setShowEditGoals] = useState(false);

  // Progress: 0 to 1
  const progress = isFasting ? Math.min(elapsed / FAST_DURATION_SECONDS, 1) : 0;

  // Timer effect
  useEffect(() => {
    if (isFasting) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev < FAST_DURATION_SECONDS) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current!);
            return prev;
          }
        });
      }, 1000);
    } else {
      setElapsed(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isFasting]);

  // Format elapsed time as HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const todayIdx = new Date().getDay();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track</Text>
      </View>

      {/* Weekly Fasting Tracker */}
      <View style={styles.weekTracker}>
        {daysOfWeek.map((day, idx) => (
          <View key={day} style={styles.weekDayContainer}>
            <Text style={[styles.weekDayLabel, idx === todayIdx && styles.weekDayLabelActive]}>{day}</Text>
            <Svg width={32} height={32}>
              <Circle
                cx={16}
                cy={16}
                r={12.8}
                stroke={idx === todayIdx ? '#FF2D55' : '#D8D3D5'}
                strokeWidth={6}
                fill="none"
              />
            </Svg>
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Fasting Timer Card */}
        <View style={styles.card}>
          <View style={styles.timerCircle}>
            {/* Circular Progress Bar */}
            <View style={styles.circularProgressContainer}>
              <Svg width={300} height={300}>
                <Circle
                  cx={150}
                  cy={150}
                  r={135}
                  stroke="#eee"
                  strokeWidth={20}
                  fill="none"
                />
                <Circle
                  cx={150}
                  cy={150}
                  r={135}
                  stroke="#FF2D55"
                  strokeWidth={24}
                  fill="none"
                  strokeDasharray={848}
                  strokeDashoffset={848 - 848 * progress}
                  strokeLinecap="round"
                  transform="rotate(-90 150 150)"
                />
              </Svg>
              <View style={styles.timerTextOverlay}>
                <Text style={styles.timerLabelSmall}>
                  {isFasting ? formatTime(elapsed) : 'UPCOMING FAST'}
                </Text>
                <Text style={styles.timerHours}>16 hours</Text>
                <TouchableOpacity style={styles.editGoalsButton} onPress={() => setShowEditGoals(true)}>
                  <Text style={styles.editGoalsText}>EDIT GOALS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.startFastingButton}
            onPress={() => setIsFasting(true)}
            disabled={isFasting}
          >
            <Text style={styles.startFastingText}>{isFasting ? 'Fasting...' : 'Start Fasting'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={26} color="#FF2D55" />
          <Text style={[styles.navLabel, { color: '#FF2D55' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="compass-outline" size={26} color="#BDBDBD" />
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="account-circle-outline" size={26} color="#BDBDBD" />
          <Text style={styles.navLabel}>Me</Text>
        </TouchableOpacity>
      </View>
      {/* Edit Goals Modal */}
      <Modal
        visible={showEditGoals}
        animationType="slide"
        onRequestClose={() => setShowEditGoals(false)}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Edit Goals</Text>
          <TouchableOpacity
            onPress={() => setShowEditGoals(false)}
            style={{
              marginTop: 20,
              padding: 12,
              backgroundColor: '#FF2D55',
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F7F7F7',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    height: SCREEN_HEIGHT * (2 / 3),
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircle: {
    alignItems: 'center',
    marginBottom: 28,
  },
  circularProgressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  timerTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerLabel: {
    color: '#BDBDBD',
    fontSize: 15,
    marginBottom: 2,
  },
  timerValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  timerSubLabel: {
    color: '#BDBDBD',
    fontSize: 14,
  },
  timerNext: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  fastingTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fastingTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  fastingTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginRight: 4,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
  },
  startFastingButton: {
    backgroundColor: '#FF2D55',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    width: '90%',
    alignSelf: 'center',
    minWidth: undefined,
    paddingHorizontal: 0,
  },
  startFastingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  waterBoxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterBox: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    marginHorizontal: 6,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  waterBoxText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weightValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  weightUnit: {
    fontSize: 16,
    color: '#BDBDBD',
  },
  weightChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  weightChange: {
    fontSize: 15,
    color: '#00C853',
    fontWeight: '600',
    marginLeft: 2,
  },
  weightBarBg: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  weightBarFill: {
    height: 10,
    backgroundColor: '#FF2D55',
    borderRadius: 8,
    width: '35%', // Placeholder for progress
  },
  weightLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightLabel: {
    fontSize: 13,
    color: '#BDBDBD',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 2,
    fontWeight: '600',
  },
  timerHours: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  timerLabelSmall: {
    fontSize: 13,
    color: '#A0A0A0',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 2,
  },
  editGoalsButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  editGoalsText: {
    color: '#FF2D55',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  weekTracker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    marginHorizontal: 8,
    marginTop: 18,
  },
  weekDayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  weekDayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B3A7AE',
    marginBottom: 2,
    letterSpacing: 1.2,
  },
  weekDayLabelActive: {
    color: '#222',
  },
});

export default HomeScreen; 