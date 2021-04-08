import React, { useState } from 'react';
import { firebase, logout } from './Firebase/Firebase';
import TileContainer from './Components/TileContainer/TileContainer';
import { AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import './App.css';
import GoogleLogin from './Components/GoogleLogin/GoogleLogin';

const App = () => {
	const [userData, setUserData] = useState(undefined);
	const [userContent, setUserContent] = useState(null);
	firebase.auth().onAuthStateChanged(user => {
		if (userData) return;
		setUserData(user);
		if (user)
			firebase
				.database()
				.ref('users/' + user.uid)
				.get()
				.then(snapshot => {
					if (!snapshot.exists()) return;
					setUserContent(snapshot.val());
				});
	});
	// useEffect(() => {
	// 	if (!userData) return;
	// 	const databaseRef = firebase.database().ref('users/' + userData.uid);
	// 	databaseRef.on('value', snapshot => {
	// 		if (!snapshot.exists()) return;
	// 		const data = snapshot.val();
	// 		setUserContent(data);
	// 	});
	// 	return () => {
	// 		setUserContent(null);
	// 		setUserData(null);
	// 	};
	// }, [userData, userContent]);

	if (userData === null) return <GoogleLogin />;

	return (
		<>
			<AppBar position='static' color='secondary'>
				<Toolbar variant='dense'>
					<Tooltip title='Menu'>
						<IconButton>
							<MenuIcon />
						</IconButton>
					</Tooltip>
					<p style={{ marginLeft: 'auto' }}>
						{userData?.displayName?.split(' ')[0]}
					</p>
					<Tooltip title='Logout'>
						<IconButton onClick={logout} style={{ marginLeft: 'auto' }}>
							<LockIcon />
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
			{userContent ? (
				<TileContainer userContent={userContent?.content} />
			) : null}
		</>
	);
};

export default App;
