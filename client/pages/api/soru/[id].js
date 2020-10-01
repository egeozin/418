import db from '../../../utils/db/firebase_db'

export default (req, res) => {
  
  return new Promise((resolve, reject) => {
    db
      .collection('posts')
      .doc(req.query.id)
      .get()
      .then((doc) => {
        const responses = doc.data().responses;
        if (responses.length) {
          db 
          .collection('posts')
          .where('__name__', 'in' , responses)
          .get()
          .then((querySnapshot) => {
              var answers = querySnapshot.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
              }).sort((a, b) => b.creationDate - a.creationDate)
              res.json({q:doc.data(), a:answers, id: req.query.id});
              resolve()
          })
          .catch((error) => {
            res.json({ error });
            resolve()
          });
        } else { 
          res.json({q:doc.data(),a:[], id: req.query.id});
          resolve()
        }
      })
      .catch((error) => {
        res.json({ error });
        resolve()
      });
  })
};

