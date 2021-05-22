import firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDUs55ZLIJ0oMh58CddE_96K96rNsw6iuo',
  authDomain: 'eclinic-firebase.firebaseapp.com',
  projectId: 'eclinic-firebase',
  storageBucket: 'eclinic-firebase.appspot.com',
  messagingSenderId: '993742829139',
  appId: '1:993742829139:web:cacca3f99e158582fd38a6',
  measurementId: 'G-W4KR4T306Y',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
