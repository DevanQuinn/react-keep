import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const createUserProfile = user => {
	const databaseRef = firebase.database().ref('users/' + user.uid);
	databaseRef.get().then(snapshot => {
		if (snapshot.exists()) {
			firebase.content = snapshot.val().content;
		} else {
			databaseRef
				.set({
					name: user.displayName,
					email: user.email,
					content: [
						{ title: 'Tile', body: 'This is a sample tile.', index: 0 },
					],
				})
				.then(() => console.log('done'));
		}
	});
};

const login = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(result => {
			// const credential = result.credential;
			// This gives you a Google Access Token. You can use it to access the Google API.
			// const token = credential.accessToken;
			// The signed-in user info.
			// ...,
			createUserProfile(result.user);
		})
		.catch(error => {
			// // Handle Errors here.
			// const errorCode = error.code;
			// const errorMessage = error.message;
			// // The email of the user's account used.
			// const email = error.email;
			// // The firebase.auth.AuthCredential type that was used.
			// const credential = error.credential;
			// ...
		});
};

const writeData = content => {
	const user = firebase.auth().currentUser.uid;
	firebase
		.database()
		.ref('/users/' + user)
		.set({ content })
		.then(() => console.log('done'))
		.catch(err => console.log(err));
};

const logout = () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			// Sign-out successful.
		})
		.catch(error => {
			// An error happened.
		});
};

export { login, logout, firebase, writeData };
