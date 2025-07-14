import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import PreferenceItem from './PreferenceItem';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const colors = ['red', 'yellow', 'green'];

const AvailabilityCard = () => {
  const [selected, setSelected] = useState({});

  const handleSelect = (day, color) => {
    setSelected((prev) => ({
      ...prev,
      [day]: prev[day] === color ? null : color,
    }));
  };

  return (
    <GlassCard style={styles.glassCard}>
      <View style={styles.container}>
        <ScrollView nestedScrollEnabled={true} style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.availabilityContainer}>
            {days.map((day) => (
              <View key={day} style={styles.dayContainer}>
                <Text style={styles.dayText}>{day}</Text>
                <View style={styles.optionsContainer}>
                  {colors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => handleSelect(day, color)}
                      activeOpacity={0.8}
                      style={{ width: '25%', height: 40 }}
                    >
                      <PreferenceItem
                        style={styles.preferenceItem}
                        color={color}
                        text=""
                        showCheckmark={true}
                        isSelected={selected[day] === color}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    width: '90%',
    height: 700,
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '12.5%',
  },
  availabilityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6E6E6E',
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  preferenceItem: {
    width: '100%',
    height: '100%',
  },
});

export default AvailabilityCard;