import db from '../../../../utils/db/firebase_db';
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

export default (req, res) => {
  const qData = JSON.parse(req.body);
  // ADD SERVER-SIDE VALIDATIONS
  return new Promise((resolve, reject) => {
    const postsRef = db.collection('posts');
    postsRef
      .add({
        title: qData.title,
        body: qData.body,
        tags: [],
        language: qData.languages,
        likeCount: 0,
        confusedCount: 0,
        clapCount: 0,
        responses: [],
        postType: 1,
        creationDate: firebase.firestore.FieldValue.serverTimestamp(),
        updateDate: firebase.firestore.FieldValue.serverTimestamp(),
        answerCount: 0,
        ownerUserId: qData.userId,
        ownerName: qData.userName,
        voteCount: 0,
        votes: [],
        likes: [],
        claps: [],
        confuseds: [],
      })
      .then((doc) => {
        const data = doc.data();
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
