import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Kullanıcı kaydı fonksiyonu
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up: ', error);
    throw error; // Hatanın handle edilmesi için dışarıya fırlatıyoruz
  }
};

// Kullanıcı girişi fonksiyonu
export const signInUser = async (email, password) => {
  const userCredential = await auth().signInWithEmailAndPassword(email, password);
  return userCredential.user;  // Bu, userId'yi döndürecek
};

// Hedefleri kaydetmek için Firestore'a veri ekleme fonksiyonu (alt koleksiyon yapısı)
export const addGoals = async (userId, waterGoal, stepGoal, sleepGoal) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('goals') // Alt koleksiyon
      .doc('userGoals') // Tek bir döküman
      .set({
        waterGoal,
        stepGoal,
        sleepGoal,
      });
    console.log('Goals added to sub-collection!');
  } catch (error) {
    console.error('Error adding goals: ', error);
  }
};

// Hedefleri Firestore'dan okuma fonksiyonu (alt koleksiyon yapısı)
export const getGoals = async (userId) => {
  try {
    const goalDocument = await firestore()
      .collection('users')
      .doc(userId)
      .collection('goals')
      .doc('userGoals')
      .get();

    if (goalDocument.exists) {
      return goalDocument.data();
    } else {
      console.log('No goals found!');
      return null;
    }
  } catch (error) {
    console.error('Error getting goals: ', error);
  }
};

// Hedefleri güncelleme fonksiyonu (alt koleksiyon yapısı)
export const updateGoals = async (userId, newWaterGoal, newStepGoal, newSleepGoal) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('goals')
      .doc('userGoals')
      .update({
        waterGoal: newWaterGoal,
        stepGoal: newStepGoal,
        sleepGoal: newSleepGoal,
      });
    console.log('Goals updated in sub-collection!');
  } catch (error) {
    console.error('Error updating goals: ', error);
  }
};

// Hedefleri silme fonksiyonu (alt koleksiyon yapısı)
export const deleteGoals = async (userId) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('goals')
      .doc('userGoals')
      .delete();
    console.log('Goals deleted from sub-collection!');
  } catch (error) {
    console.error('Error deleting goals: ', error);
  }
};

// Kullanıcı bilgilerini kaydetme fonksiyonu
export const saveUserInfo = async (userId, fullName, email) => {
  try {
    await firestore().collection('users').doc(userId).set({
      fullName: fullName,
      email: email,
    }, { merge: true }); // Kullanıcı bilgilerini koruyarak günceller
    console.log('User info saved!');
  } catch (error) {
    console.error('Error saving user info: ', error);
  }
};