import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css';
import { GoogleLogin } from 'react-google-login';

const Signup = (props) => {
	const [ fname, setfName ] = useState('');
	const [ lname, setlName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const signUp = (e) => {
		props.onSignUp(e, { fname, lname, email, password, confirmPassword });
	};

	const responseErrorGoogle = (response) => {
		// console.log(response);
	};
	return (
		<div className="auth-container">
			<div className='container signupform'>
				<div className='tab-group'>
					<div className='tab-content'>
						<ul>
							<li>
								<NavLink className='link' activeClassName='active' to='/login'>
									LogIn
								</NavLink>
							</li>
							<li>
								<NavLink className='link' activeClassName='active' to='/signup'>
									SignUp
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<form onSubmit={signUp}>
					<section className='SignUp_name'>
						<input
							type='text'
							placeholder='First Name'
							autoComplete='off'
							onChange={(e) => setfName(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Last Name'
							autoComplete='off'
							onChange={(e) => setlName(e.target.value)}
						/>
					</section>
					<input
						type='email'
						placeholder='Email Address'
						autoComplete='off'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						name='password'
						placeholder='Set A Password'
						id=''
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type='password'
						name='confirmPassword'
						placeholder='Confirm Password'
						id=''
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button  type='submit' className='signUpButton'>
						SignUp
					</button>
					<br />
					<p className='or'>Or</p>
					<div>
						<GoogleLogin
							clientId='720469690674-9nfmonfgu4tlrceiag0cvqf793t08vt0.apps.googleusercontent.com'
							theme='light'
							className='google-btn-signUp'
							buttonText='Sign Up With google'
							onSuccess={props.responseSuccessGoogle}
							onFailure={responseErrorGoogle}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
