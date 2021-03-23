import googleIcon from '../../Google/btn_google_signin_dark_normal_web@2x.png';
import { login } from '../../Firebase/Firebase';
import './GoogleLogin.css';

const GoogleLogin = () => {
	return (
		<div className='login'>
			<img
				className='login-img'
				src={googleIcon}
				alt='google-login-icon'
				onClick={login}
			/>
			<p>Sign In Required</p>
		</div>
	);
};

export default GoogleLogin;
