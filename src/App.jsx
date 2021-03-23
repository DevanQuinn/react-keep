import { useState } from 'react';
import { firebase, logout } from './Firebase/Firebase';
import TileContainer from './Components/TileContainer/TileContainer';
import { AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import './App.css';
import GoogleLogin from './Components/GoogleLogin/GoogleLogin';

const App = () => {
	const [userData, setUserData] = useState(-1);
	firebase.auth().onAuthStateChanged(user => {
		setUserData(user);
	});

	if (!userData) return <GoogleLogin />;

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
			<TileContainer />
		</>
	);
};

export default App;
