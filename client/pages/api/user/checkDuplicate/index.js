import db from '../../../../utils/db/firebase_db';

export default (req, res) => {
  const userInfo = JSON.parse(req.body);
  const username = userInfo.username || '';
  return new Promise((resolve, reject) => {
    return db
      .collection('users')
      .where('username', '==', username)
      .get()
      .then((doc) => {
        if (doc.docs.length) {
          res.json({ userExists: 1 });
          resolve();
        } else {
          res.json({ userExists: 0 });
          resolve();
        }
      })
      .catch((error) => {
        res.json({ error });
        resolve();
      });
  });
};
