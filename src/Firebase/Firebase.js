import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDn-QaVOWUJtQhaSU3nHh9RDWU_aCHKTdg',
	authDomain: 'react-keep-308103.firebaseapp.com',
	projectId: 'react-keep-308103',
	storageBucket: 'react-keep-308103.appspot.com',
	messagingSenderId: '207147364239',
	appId: '1:207147364239:web:55e24a32049b627d51e5fa',
	measurementId: 'G-M6LVZYVBB4',
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

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

export { login, logout, firebase };
