import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css';
import { GoogleLogin } from 'react-google-login';

const Login = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const Login = (e) => {
		props.onLogin(e, { email, password });
	};

	const responseErrorGoogle = (response) => {
		// console.log(response);
	};
	return (
		<div className="auth-container">
			<div className='container loginForm'>
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
				<form onSubmit={Login}>
					<input
						type='email'
						placeholder='Enter Email&#42;'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<br />
					<input
						type='password'
						placeholder='Enter Password&#42;'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<button className='login-btn' type='submit'>LogIn</button>
					<br />
					<p className='or'>Or </p>
					<div >
						<GoogleLogin
							clientId='720469690674-2td5obcfp5p94qvbv6d3q16m4ecagcgc.apps.googleusercontent.com'
							theme='light'
							className='google-btn'
							buttonText='Login With google'
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

export default Login;
