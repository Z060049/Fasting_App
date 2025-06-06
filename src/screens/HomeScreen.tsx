import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = () => {
  const [isFasting, setIsFasting] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showEditGoals, setShowEditGoals] = useState(false);
  const [fastDuration, setFastDuration] = useState(16 * 60 * 60); // default 16 hours
  // Track completed fasts for each day of the week (Sunday=0 ... Saturday=6)
  const [completedFasts, setCompletedFasts] = useState<boolean[]>(Array(7).fill(false));

  // Progress: 0 to 1
  const progress = isFasting ? Math.min(elapsed / fastDuration, 1) : 0;

  // Timer effect
  useEffect(() => {
    if (isFasting) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev < fastDuration) {
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
  }, [isFasting, fastDuration]);

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
        <Text style={styles.headerTitle}>Fast Track</Text>
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
                fill={completedFasts[idx] ? '#FF2D55' : 'none'}
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
                <Text style={styles.timerHours}>
                  {fastDuration >= 3600
                    ? `${(fastDuration / 3600).toFixed(0)} hours`
                    : `${(fastDuration / 60).toFixed(0)} min`}
                </Text>
                <TouchableOpacity style={styles.editGoalsButton} onPress={() => setShowEditGoals(true)}>
                  <Text style={styles.editGoalsText}>EDIT GOALS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.startFastingButton,
              { backgroundColor: isFasting ? '#BDBDBD' : '#FF2D55' },
            ]}
            onPress={() => {
              if (isFasting) {
                const today = new Date().getDay();
                setCompletedFasts(prev => {
                  const updated = [...prev];
                  updated[today] = true;
                  return updated;
                });
              }
              setIsFasting(!isFasting);
            }}
          >
            <Text style={styles.startFastingText}>
              {isFasting ? 'End Fasting' : 'Start Fasting'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Goals Modal */}
      <Modal
        visible={showEditGoals}
        animationType="slide"
        onRequestClose={() => setShowEditGoals(false)}
        presentationStyle="pageSheet"
        transparent={true}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.15)' }}>
          <View style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 16,
            paddingHorizontal: 20,
            paddingBottom: 32,
            minHeight: 480,
          }}>
            {/* Drag indicator */}
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: '#E0E0E0' }} />
            </View>
            {/* Close X */}
            <TouchableOpacity onPress={() => setShowEditGoals(false)} style={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
              <Icon name="close" size={28} color="#222" />
            </TouchableOpacity>
            {/* Title */}
            <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 18, color: '#222' }}>Change fast goal</Text>
            {/* Grid of cards */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 }}>
              {/* Card 1 */}
              <TouchableOpacity
                onPress={() => {
                  setFastDuration(13 * 60 * 60);
                  setShowEditGoals(false);
                }}
                style={{ width: '30%', aspectRatio: 0.8, backgroundColor: '#6C2EB6', borderRadius: 16, marginBottom: 16, padding: 12, justifyContent: 'space-between' }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Circadian{"\n"}Rhythm TRF</Text>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>13</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>hours</Text>
                </View>
                <Icon name="information" size={18} color="#fff" style={{ alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              {/* Card 2 */}
              <TouchableOpacity
                onPress={() => {
                  setFastDuration(16 * 60 * 60);
                  setShowEditGoals(false);
                }}
                style={{ width: '30%', aspectRatio: 0.8, backgroundColor: '#FF4FA0', borderRadius: 16, marginBottom: 16, padding: 12, justifyContent: 'space-between' }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>16:8{"\n"}TRF</Text>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>16</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>hours</Text>
                </View>
                <Icon name="information" size={18} color="#fff" style={{ alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              {/* Card 3 */}
              <TouchableOpacity
                onPress={() => {
                  setFastDuration(18 * 60 * 60);
                  setShowEditGoals(false);
                }}
                style={{ width: '30%', aspectRatio: 0.8, backgroundColor: '#0B6C3E', borderRadius: 16, marginBottom: 16, padding: 12, justifyContent: 'space-between' }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>18:6{"\n"}TRF</Text>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>18</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>hours</Text>
                </View>
                <Icon name="information" size={18} color="#fff" style={{ alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              {/* Card 4 */}
              <TouchableOpacity
                onPress={() => {
                  setFastDuration(20 * 60 * 60);
                  setShowEditGoals(false);
                }}
                style={{ width: '30%', aspectRatio: 0.8, backgroundColor: '#FFA726', borderRadius: 16, marginBottom: 16, padding: 12, justifyContent: 'space-between' }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>20:4{"\n"}TRF</Text>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>20</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>hours</Text>
                </View>
                <Icon name="information" size={18} color="#fff" style={{ alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              {/* Card 5 */}
              <TouchableOpacity
                onPress={() => {
                  setFastDuration(36 * 60 * 60);
                  setShowEditGoals(false);
                }}
                style={{ width: '30%', aspectRatio: 0.8, backgroundColor: '#2979FF', borderRadius: 16, marginBottom: 16, padding: 12, justifyContent: 'space-between' }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>36-Hour{"\n"}Fast</Text>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>36</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>hours</Text>
                </View>
                <Icon name="information" size={18} color="#fff" style={{ alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              {/* Card 6 */}
              <TouchableOpacity
                onPress={() => {
                  // This is just a placeholder for custom fast logic.
                  setFastDuration(5 * 60);
                  setShowEditGoals(false);
                }}
                style={{ width: '30%', aspectRatio: 0.8, backgroundColor: '#757575', borderRadius: 16, marginBottom: 16, padding: 12, justifyContent: 'space-between' }}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Custom{"\n"}Fast</Text>
                <View>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>5min</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>minutes</Text>
                </View>
                <Icon name="information" size={18} color="#fff" style={{ alignSelf: 'flex-end' }} />
              </TouchableOpacity>
            </View>
            {/* Your Presets */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontWeight: '700', fontSize: 17, color: '#222', marginRight: 8 }}>Your Presets</Text>
              <View style={{ backgroundColor: '#FF2D55', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>Premium</Text>
              </View>
            </View>
            <View style={{ width: 80, height: 80, backgroundColor: '#F0F0F0', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="plus" size={36} color="#888" />
            </View>
          </View>
        </View>
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