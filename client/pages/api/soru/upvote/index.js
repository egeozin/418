import db from '../../../../utils/db/firebase_db'
import Document from 'next/document';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

export default (req, res) => {
    const postInfo = JSON.parse(req.body)
    return new Promise((resolve, reject) => {
      var userRef = db.collection('users').doc(postInfo.userId)
      userRef
        .get().then((doc) => {
          userRef
            .update({
              upvotes: postInfo.selected ? firebase.firestore.FieldValue.arrayUnion(postInfo.postId) : firebase.firestore.FieldValue.arrayRemove(postInfo.postId)
            })
            .then((doc) => {
              db
              .collection('posts')
              .doc(postInfo.postId)
              .update({
                  voteCount: postInfo.selected ? firebase.firestore.FieldValue.increment(1) : firebase.firestore.FieldValue.increment(-1),
                  votes: postInfo.selected ? firebase.firestore.FieldValue.arrayUnion(postInfo.userId) : firebase.firestore.FieldValue.arrayRemove(postInfo.userId)
              })
              .then((doc) => {
                res.json({status:"success",  error:null})
                resolve()
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
              resolve()
            })
          
        }).catch((error) => {
          res.json({ error });
          res.status(405).end();
          resolve()
        })
    })
};