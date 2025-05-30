import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MeScreen from './src/screens/MeScreen';
import { FastingProvider } from './src/context/FastingContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'me'>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'explore':
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Explore Page (Coming Soon)</Text>
          </View>
        );
      case 'me':
        return <MeScreen />;
      default:
        return null;
    }
  };

  return (
    <FastingProvider>
      <View style={{ flex: 1 }}>
        {renderScreen()}

        {/* Custom Bottom Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.navItem}>
            <Icon name="home" size={26} color={activeTab === 'home' ? '#FF2D55' : '#888'} />
            <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('explore')} style={styles.navItem}>
            <Icon name="compass-outline" size={26} color={activeTab === 'explore' ? '#FF2D55' : '#888'} />
            <Text style={[styles.navText, activeTab === 'explore' && styles.navTextActive]}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('me')} style={styles.navItem}>
            <Icon name="account-circle-outline" size={26} color={activeTab === 'me' ? '#FF2D55' : '#888'} />
            <Text style={[styles.navText, activeTab === 'me' && styles.navTextActive]}>Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FastingProvider>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: '#888',
    fontSize: 13,
    marginTop: 6,
  },
  navTextActive: {
    color: '#FF2D55',
    fontWeight: 'bold',
  },
});

export default App;
