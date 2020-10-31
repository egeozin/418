import db from '../../../../utils/db/firebase_db';
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

export default (req, res) => {
  const postInfo = JSON.parse(req.body);
  // ADD SERVER-SIDE VALIDATIONS
  return new Promise((resolve, reject) => {
    const userId = postInfo.userId;
    const parentId = postInfo.parentId;
    const postId = postInfo.postId;
    const postsRef = db.collection('posts');
    const docRef = postsRef.doc(postId);

    docRef
      .delete()
      .then(() => {
        const parent = postsRef.doc(parentId);
        parent
          .update({
            responses: firebase.firestore.FieldValue.arrayRemove(postId),
            answerCount: firebase.firestore.FieldValue.increment(-1),
          })
          .then(() => {
            parent
              .get()
              .then((parentDoc) => {
                if (parentDoc.data().responses.length) {
                  postsRef
                    .where('__name__', 'in', parentDoc.data().responses)
                    .get()
                    .then((querySnapshot) => {
                      var answers = querySnapshot.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id };
                      });
                      res.json({ q: parentDoc.data(), a: answers, id: postId });
                      resolve();
                    })
                    .catch((error) => {
                      console.log({ error });
                      res.json({ error });
                      res.status(405).end();
                      resolve();
                    });
                } else {
                  res.json({ q: parentDoc.data(), a: [], id: postId });
                  resolve();
                }
              })
              .catch((error) => {
                console.log({ error });
                res.json({ error });
                res.status(405).end();
                resolve();
              });
          })
          .catch((error) => {
            res.json({ error });
            res.status(405).end();
            resolve();
          });
      })
      .catch((error) => {
        res.json({ error });
        res.status(405).end();
        resolve();
      });
  });
};
