import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="timer-outline" size={28} color="#FF2D55" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={28} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Fasting Timer Card */}
        <View style={styles.card}>
          <View style={styles.timerCircle}>
            {/* Circular Progress Bar */}
            <View style={styles.circularProgressContainer}>
              <Svg width={220} height={220}>
                {/* Background Circle */}
                <Circle
                  cx={110}
                  cy={110}
                  r={100}
                  stroke="#eee"
                  strokeWidth={16}
                  fill="none"
                />
                {/* Progress Circle */}
                <Circle
                  cx={110}
                  cy={110}
                  r={100}
                  stroke="#FF2D55"
                  strokeWidth={20}
                  fill="none"
                  strokeDasharray={628}
                  strokeDashoffset={628 - 628 * 0.7} // 0.7 = 70% progress, adjust as needed
                  strokeLinecap="round"
                />
              </Svg>
              <View style={styles.timerTextOverlay}>
                <Text style={styles.timerLabelSmall}>UPCOMING FAST</Text>
                <Text style={styles.timerHours}>16 hours</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.startFastingButton}>
            <Text style={styles.startFastingText}>Start Fasting</Text>
          </TouchableOpacity>
        </View>

        {/* Water Tracker Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Water Tracker</Text>
            <Icon name="chevron-right" size={22} color="#FF2D55" />
          </View>
          <View style={styles.waterRow}>
            <View>
              <Text style={styles.waterAmount}>300 <Text style={styles.waterUnit}>mL</Text></Text>
              <Text style={styles.waterGoal}>/ 2500 mL</Text>
              <Text style={styles.waterPercent}>8% completed</Text>
            </View>
            <View style={styles.waterControls}>
              <TouchableOpacity style={styles.waterButton}>
                <Icon name="minus" size={22} color="#2196F3" />
              </TouchableOpacity>
              <View style={styles.waterDropContainer}>
                <Icon name="water" size={40} color="#2196F3" />
              </View>
              <TouchableOpacity style={styles.waterButton}>
                <Icon name="plus" size={22} color="#2196F3" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Weight Tracker Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Weight Tracker</Text>
            <Icon name="chevron-right" size={22} color="#FF2D55" />
          </View>
          <View style={styles.weightRow}>
            <Text style={styles.weightValue}>89.5 <Text style={styles.weightUnit}>kg</Text></Text>
            <View style={styles.weightChangeRow}>
              <Icon name="arrow-down" size={16} color="#00C853" />
              <Text style={styles.weightChange}>- 2.5 kg</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="content-copy" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <View style={styles.weightBarBg}>
            <View style={styles.weightBarFill} />
          </View>
          <View style={styles.weightLabelsRow}>
            <Text style={styles.weightLabel}>Starting: 100.0 kg</Text>
            <Text style={styles.weightLabel}>Goal: 76.0 kg</Text>
          </View>
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
          <Icon name="file-chart-outline" size={26} color="#BDBDBD" />
          <Text style={styles.navLabel}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="star-outline" size={26} color="#BDBDBD" />
          <Text style={styles.navLabel}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="account-circle-outline" size={26} color="#BDBDBD" />
          <Text style={styles.navLabel}>Account</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  timerCircle: {
    alignItems: 'center',
    marginBottom: 18,
  },
  circularProgressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    height: 220,
  },
  timerTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: 220,
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
  waterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waterAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  waterUnit: {
    fontSize: 16,
    color: '#BDBDBD',
  },
  waterGoal: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  waterPercent: {
    fontSize: 13,
    color: '#BDBDBD',
    marginTop: 2,
  },
  waterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterButton: {
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 4,
  },
  waterDropContainer: {
    marginHorizontal: 8,
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
    transform: [{ scaleX: 0.8 }],
  },
  timerLabelSmall: {
    fontSize: 13,
    color: '#A0A0A0',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default HomeScreen; 