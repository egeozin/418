import db from '../../../utils/db/firebase_db';

export default async (req, res) => {
  const page = parseInt(req.query.number[0]);
  const pageCursor = page == 1 ? 1 : page - 1;

  const first = db
    .collection('posts')
    .where('postType', '==', 1)
    .orderBy('creationDate', 'desc')
    .limit(pageCursor * 15);

  const snapshot = await first.get();
  const cursor = page == 1 ? snapshot.docs[0] : snapshot.docs[snapshot.docs.length - 1];

  return new Promise((resolve, reject) => {
    return db
      .collection('posts')
      .where('postType', '==', 1)
      .orderBy('creationDate', 'desc')
      .startAt(cursor.data().creationDate)
      .limit(15)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          var docs = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
          res.json(docs);
          resolve();
        } else {
          var docs = querySnapshot.docs.map((doc) => ({ id: doc.id, data: [] }));
          res.json(docs);
          resolve();
        }
      })
      .catch((error) => {
        res.json({ error });
        resolve();
      });
  });
};
