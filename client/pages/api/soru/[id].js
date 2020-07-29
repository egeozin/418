import firebase from '../../../utils/db/firebase_db'
import useSWR from 'swr'
import PostLayout from '../../../layouts/Post/PostLayout'
import PostBody from '../../../components/Post/PostBody'


console.log(firebase)

export default (req, res) => {
  console.log(req.query.id);
  firebase
    .collection('posts')
    .doc(req.query.id)
    .get()
    .then((doc) => {
      const responses = doc.data().responses;
      firebase 
        .collection('posts')
        .where('__name__', 'in' ,responses)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          var answers = querySnapshot.docs.map((doc) => doc.data());
          res.json({q:doc.data(),a:answers});

          })
          .catch((error) => {
            res.json({ error });
          });
    })
    .catch((error) => {
      res.json({ error });
    });
};
