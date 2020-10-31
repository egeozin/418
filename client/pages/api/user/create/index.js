import db from '../../../../utils/db/firebase_db';
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

export default (req, res) => {
  const userInfo = JSON.parse(req.body);
  return new Promise((resolve, reject) => {
    db.collection('users')
      .doc(userInfo.userId)
      .set({
        username: userInfo.username,
        name: '',
        email: userInfo.email,
        description: '',
        creationDate: firebase.firestore.FieldValue.serverTimestamp(),
        lastAccessDate: firebase.firestore.FieldValue.serverTimestamp(),
        likes: [],
        location: '',
        photoImageURL: `https://storage.cloud.google.com/kodkoda-generated-avatar/${userInfo.userId}.png`,
        reputation: 0,
        upvotes: [],
        claps: [],
        confuseds: [],
        eyvallahs: [],
      })
      .then((doc) => {
        res.json({ status: 'success' });
        resolve();
      })
      .catch((error) => {
        res.json({ error });
        res.status(405).end();
        resolve();
      });
  });
};
