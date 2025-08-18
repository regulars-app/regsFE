import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Countdown from '../components/Countdown';
import MainButton from '../components/MainButton';
import EvidenceUploader from '../components/EvidenceUploader';
import ChallengeDisplayer from '../components/ChallengeDisplayer';
import AdditionalInfoInput from '../components/AdditionalInfoInput';

const DailyChallengeView = ({ routeParams }) => {

    // Handle challenge data from route params
    useEffect(() => {
        if (routeParams?.group?.challenge) {
            console.log('Challenge type:', routeParams.group.challenge);
        }
    }, [routeParams]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton size={30} style={styles.backButton} />
        <Countdown style={styles.countdown}/>
      </View>
      <View style={styles.bodyContent}>
        <ChallengeDisplayer style={styles.challengeDisplayer} challengeType="smart" challengeContent="What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?What is the capital of France?"/>
        <EvidenceUploader style={styles.evidenceUploader} evidenceType="image" challenger="Bob" />
        <AdditionalInfoInput style={styles.additionalInfoInput} placeholder="Add any additional info here e.g. that was impossible!" />
      </View>
      <View style={styles.footer}>
        <MainButton text="Submit" color="green" type="confirm" style={styles.submitButton}/>
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
    height: 120,
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
    marginBottom: 120,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  challengeDisplayer: {
    width: '100%',
    marginTop: 20,
    maxHeight: 300,
  },
  evidenceUploader: {
    marginTop: 20,
    width: '80%',
    height: 150,
  },
  additionalInfoInput: {
    marginTop: 20,
    width: '80%',
    maxHeight: 100,
    minHeight: 60,
  },
  submitButton: {
    position: 'absolute',
    top:0,
    right: '10%',
  },
});

export default DailyChallengeView;
