require('dotenv').config({ path: './.env.local' });
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
import initFirebase from '../auth/initFirebase';

initFirebase();
const db = firebase.firestore();

export default db;
