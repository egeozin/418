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
          if (doc.data().upvotes.includes(postInfo.postId)) {
            res.json({status:"success", docExists:true, error:null})
            resolve()
          } else {
            userRef
              .update({
                upvotes: firebase.firestore.FieldValue.arrayUnion(postInfo.postId)
              })
              .then((doc) => {
                db
                .collection('posts')
                .doc(postInfo.postId)
                .update({
                    voteCount: firebase.firestore.FieldValue.increment(1),
                    votes: firebase.firestore.FieldValue.arrayUnion(postInfo.userId)
                })
                .then((doc) => {
                  res.json({status:"success", docExists:false, error:null})
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
          }
        }).catch((error) => {
          res.json({ error });
          res.status(405).end();
          resolve()
        })
    })
};