import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track</Text>
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
                  strokeDashoffset={848 - 848 * 0.7}
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
    marginBottom: 18,
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