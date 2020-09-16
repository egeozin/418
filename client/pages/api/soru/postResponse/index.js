import db from '../../../../utils/db/firebase_db'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

export default (req, res) => {
    const rData = JSON.parse(req.body)
    // ADD SERVER-SIDE VALIDATIONS 
    return new Promise((resolve, reject) => {
        const postsRef = db.collection('posts')
        postsRef
            .add({
                title: "",
                body: rData.body,
                tags: [],
                language: [],
                likeCount: 0,
                confusedCount: 0,
                clapCount: 0,
                responses:[],
                postType: 2,
                creationDate: firebase.firestore.FieldValue.serverTimestamp(),
                updateDate: firebase.firestore.FieldValue.serverTimestamp(),
                answerCount: 0,
                ownerUserId: rData.userId,
                ownerName: rData.userName, 
                voteCount: 0,
                votes: [],
                likes: [],
                claps:[],
                confuseds:[]
            })
            .then((doc) => {
                const parent = postsRef.doc(rData.postId)
                parent
                    .update({
                        responses: firebase.firestore.FieldValue.arrayUnion(doc.id),
                        answerCount: firebase.firestore.FieldValue.increment(1)
                    })
                    .then(() => {
                        parent
                            .get()
                            .then((parentDoc) => {
                                postsRef
                                .where('__name__', 'in' , parentDoc.data().responses)
                                .get()
                                .then((querySnapshot) => {
                                    var answers = querySnapshot.docs.map((doc) => {
                                        return {...doc.data(), id: doc.id}
                                    });
                                    res.json({q:parentDoc.data(), a:answers, id: rData.postId});
                                    resolve()
                                })
                                .catch((error) => {
                                    res.json({ error });
                                    res.status(405).end();
                                    resolve()
                                });
                            }).catch((error) => {
                                res.json({ error });
                                res.status(405).end();
                                resolve()
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
    })
};