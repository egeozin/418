import db from '../../../../utils/db/firebase_db';

export default (req, res) => {
  const userInfo = JSON.parse(req.body);
  return new Promise((resolve, reject) => {
    var userRef = db.collection('users').doc(userInfo.userId);
    userRef
      .update({
        username: userInfo.username,
        name: userInfo.fullName,
      })
      .then((doc) => {
        res.json({ updated: true, error: null });
        resolve();
      })
      .catch((error) => {
        res.json({ error });
        res.status(405).end();
        resolve();
      });
  });
};
