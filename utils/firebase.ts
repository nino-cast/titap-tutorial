import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAml03QpNJbKZxduFvb-9ujQs_UXTLiL_g',
  authDomain: 'tiptap-example.firebaseapp.com',
  projectId: 'tiptap-example',
  storageBucket: 'tiptap-example.appspot.com',
  messagingSenderId: '768675298531',
  appId: '1:768675298531:web:9ba9433b93e362d91fd9d6',
  measurementId: 'G-ECVM926N0D',
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const storage = getStorage();
