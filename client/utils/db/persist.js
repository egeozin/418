require('dotenv').config({ path: './.env.local' });
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
const { questions, answers, users } = require('../fakeData');
const { firestoreAutoId } = require('../utilFunctions');

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

const db = firebase.firestore();

var usersRef = db.collection('users');

const addUsersToDb = (u, userIDs) => {
  return usersRef
    .add({
      username: u.username,
      name: u.name,
      description: '',
      creationDate: firebase.firestore.FieldValue.serverTimestamp(),
      lastAccessDate: firebase.firestore.FieldValue.serverTimestamp(),
      claps: 0,
      confuseds: 0,
      eyvallahs: 0,
      likes: 0,
      location: '',
      photoImageURL: '',
      reputation: 0,
      upvotes: [],
    })
    .then((userRef) => {
      userIDs.push(userRef.id);
    })
    .catch((err) => {
      console.error('Error adding document: ', err);
    });
};

async function usersForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const addUsers = async () => {
  var userIds = [];
  await usersForEach(users, async (u) => {
    await addUsersToDb(u, userIds);
  });
  return userIds;
};

/*
const addPosts = async (userIds) => {
    var postsRef = db.collection("postos");
    questions.forEach((q) => {
        var userid = userIds[Math.floor(Math.random() * userIds.length)];
        postsRef.add({
            title: q.title,
            body: q.text,
            tags: q.language,
            postType: 1,
            creationDate: firebase.firestore.FieldValue.serverTimestamp(),
            answerCount: 3,
            ownerUserId: userid,
            ownerName: "", 
            votes: Math.floor(Math.random() * 30)
        })
        .then((postRef) => {
            console.log("Document written with ID: ", postRef.id);
            var answer = answers[Math.floor(Math.random() * answers.length)];
            answer.answers.forEach((a) => {
                postsRef.add({
                    title: "",
                    body: a.text,
                    postType: 2,
                    creationDate: firebase.firestore.FieldValue.serverTimestamp(),
                    answerCount: 3,
                    ownerUserId: firestoreAutoId(),
                    ownerName: a.name, 
                    votes: Math.floor(Math.random() * 10)
                })
            
            })
        
        })
        .catch((err) => {
            console.error("Error adding document: ", err);
        });
    })
}*/

const result = addUsers().then((userIds) => {
  console.log('users added!');
  return true;
  //addPosts(userIds)
});
