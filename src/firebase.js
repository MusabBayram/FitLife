// firebase.js

import firestore from '@react-native-firebase/firestore';

// Hedefleri kaydetmek için Firestore'a veri ekleme fonksiyonu
export const addGoals = async (userId, waterGoal, stepGoal, sleepGoal) => {
  try {
    await firestore().collection('Goals').doc(userId).set({
      waterGoal: waterGoal,
      stepGoal: stepGoal,
      sleepGoal: sleepGoal,
    });
    console.log('Goals added!');
  } catch (error) {
    console.error('Error adding goals: ', error);
  }
};

// Hedefleri Firestore'dan okuma fonksiyonu
export const getGoals = async (userId) => {
  try {
    const goalDocument = await firestore().collection('Goals').doc(userId).get();
    if (goalDocument.exists) {
      return goalDocument.data();
    } else {
      console.log('No goals found!');
    }
  } catch (error) {
    console.error('Error getting goals: ', error);
  }
};

// Hedefleri güncelleme fonksiyonu
export const updateGoals = async (userId, newWaterGoal, newStepGoal, newSleepGoal) => {
  try {
    await firestore().collection('Goals').doc(userId).update({
      waterGoal: newWaterGoal,
      stepGoal: newStepGoal,
      sleepGoal: newSleepGoal,
    });
    console.log('Goals updated!');
  } catch (error) {
    console.error('Error updating goals: ', error);
  }
};

// Hedefleri silme fonksiyonu
export const deleteGoals = async (userId) => {
  try {
    await firestore().collection('Goals').doc(userId).delete();
    console.log('Goals deleted!');
  } catch (error) {
    console.error('Error deleting goals: ', error);
  }
};