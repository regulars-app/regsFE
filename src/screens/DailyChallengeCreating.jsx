import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/BackButton';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import GroupNav from '../components/GroupNav';
import ChallengeWriterBox from '../components/ChallengeWriterBox';
import Countdown from '../components/Countdown';
import EvidenceTypeSelector from '../components/EvidenceTypeSelector';
import MainButton from '../components/MainButton';

const DailyChallengeCreating = () => {


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton size={30} style={styles.backButton} />
        <Countdown style={styles.countdown}/>
      </View>
      <View style={styles.bodyContent}>
        <ChallengeWriterBox challengeType="smart" style={styles.challengeWriterBox}/>
        <EvidenceTypeSelector style={styles.evidenceTypeSelector}/>
      </View>
      <View style={styles.footer}>
        <MainButton text="Submit" color="green" type="confirm" style={styles.submitButton}/>
        <GroupNav style={styles.groupNav}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6F0',
    height: '100%',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 100,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    height: 200,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  countdown: {
    position: 'absolute',
    bottom: 0,
  },
  bodyContent: {
    marginTop: 100,
    marginBottom: 200,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  challengeWriterBox: {
    width: '90%',
    marginTop: 20,
    height: 400,
  },
  evidenceTypeSelector: {
    marginTop: 20,
    width: '80%',
  },
  submitButton: {
    position: 'absolute',
    top:0,
    right: '10%',
  },
  groupNav: {
    position: 'absolute',
    bottom: 20,
  },
});

export default DailyChallengeCreating;
