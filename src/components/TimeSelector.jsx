import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import GlassCard from './GlassCard';
import DateTimePicker from '@react-native-community/datetimepicker';

const formatTime = (date) => {
  if (!date) return '';
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const TimeSelector = ({ title, time, onChange }) => {
  const [selectedTime, setSelectedTime] = useState(time ? new Date(time) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios'); // On Android, always hide after selection
    if (date) {
      setSelectedTime(date);
      if (onChange) onChange(date);
    }
  };

  return (
    <GlassCard style={styles.glassCard}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.timeContainer} onPress={() => setShowPicker(true)}>
          <Text>{formatTime(selectedTime)}</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    minWidth: 100,
    height: 60,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6E6E6E',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2FFF6',
    borderRadius: 20,
    padding: 7,
    elevation: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#F2FFF6',
  },
});
export default TimeSelector;
