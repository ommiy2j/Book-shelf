import './App.css';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import { useEffect, useState } from 'react';
import Home from './components/home/Home';
import './components/FontAwesome';
import Welcome from './components/Welcome/Welcome';
import Bus from './utils/Bus';
import { Flash } from './components/Flash';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/Edit-Profile';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import ShowBook from './components/showBook/showBook';
import ErrorPage from './components/404/404';
import BookDetails from './components/showBook/bookDetails';

function App () {
	window.flash = (message, type = 'success') => Bus.emit('flash', { message, type });
	const history = useHistory();
	const [ isLoading, setIsLoading ] = useState(true);
	const [ auth, setAuth ] = useState(false);
	const [ user, setUser ] = useState('');

	const logInHandler = (e, data) => {
		e.preventDefault();
		fetch('https://bookshelf124.herokuapp.com/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password
			})
		})
			.then((res) => {
				if (res.status === 422) {
					throw new Error('Validation failed.');
				}
				if (res.status !== 200 && res.status !== 201) {
					console.log('Error!');
					throw new Error('Could not authenticate you!');
				}
				return res.json();
			})
			.then((result) => {
				// console.log(result);
				setAuth(true);
				// setCount((prev) => prev + 1);
				localStorage.setItem('token', result.token);
				localStorage.setItem('username', result.name);
				localStorage.setItem('userId', result.userId);
				const remTime = 60 * 60 * 1000;
				const expiryTime = new Date(new Date().getTime() + remTime);
				localStorage.setItem('expiryTime', expiryTime.toISOString());
				// setAutoLogOut(expiryTime);
				history.push('/home');
				window.flash('logged In successfully!', 'success');
				// showProfile();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const responseSuccessGoogle = (response) => {
		// console.log(response);
		fetch('https://bookshelf124.herokuapp.com/auth/googlelogin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: response.tokenId
			})
		})
			.then((res) => {
				if (res.status === 422) {
					throw new Error('Validation failed.');
				}
				if (res.status !== 200 && res.status !== 201) {
					console.log('Error!');
					throw new Error('Could not authenticate you!');
				}
				return res.json();
			})
			.then((result) => {
				console.log(result, 'hello');
				setAuth(true);
				// setCount((prev) => prev + 1);
				localStorage.setItem('token', result.token);
				localStorage.setItem('username', result.name);
				localStorage.setItem('userId', result.userId);
				const remTime = 60 * 60 * 1000;
				const expiryTime = new Date(new Date().getTime() + remTime);
				localStorage.setItem('expiryTime', expiryTime);
				// setAutoLogOut(expiryTime);
				history.push('/home');
				window.flash('logged In successfully!', 'success');
				// showProfile();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const signUpJHandler = async (e, data) => {
		e.preventDefault();
		await fetch('https://bookshelf124.herokuapp.com/auth/signup', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fname: data.fname,
				lname: data.lname,
				email: data.email,
				password: data.password,
				confirmPassword: data.confirmPassword
			})
		})
			.then((res) => {
				if (res.status === 422) {
					throw new Error('Validation failed.');
				}
				if (res.status !== 200 && res.status !== 201) {
					console.log('Error!');
					throw new Error('Could not authenticate you!');
				}
				return res.json();
			})
			.then((result) => {
				window.flash('Signed In successfully!', 'success');
			})
			.catch((err) => {
				window.flash('Signed In Failed!', 'error');
			});
	};
	const logOutHandler = () => {
		setAuth(false);
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('username');
		localStorage.removeItem('expiryTime');
	};

	const setAutoLogOut = (remTime) => {
		setTimeout(() => {
			history.push('/');
			logOutHandler();
		}, remTime);
	};
	const authListner = () => {
		const token = localStorage.getItem('token');
		const userName = localStorage.getItem('username');
		if (!token) {
			return;
		}
		console.log(userName, isLoading);
		setAuth(true);
		setUser(userName);
		setIsLoading(false);
	};

	useEffect(() => {
		let expiryTime = localStorage.getItem('expiryTime');
		const token = localStorage.getItem('token');
		if (!token || !expiryTime) {
			return;
		}
		// expiryTime = expiryTime.toISOString();
		const remTime = new Date(new Date(expiryTime).getTime() - new Date().getTime());
		setAutoLogOut(remTime);
		authListner();
		console.log(remTime, expiryTime, auth);
	});

	return (
		<div>
			{auth ? (
				<div>
					<Navbar auth={auth} logout={logOutHandler} />
					<Switch>
						<Route path='/home' exact render={() => <Home auth={auth} user={user} />} />
						<Route path='/profile' exact render={() => <Profile />} />
						<Route path='/edit-profile/:userId' exact render={() => <EditProfile />} />
						<Route path='/books' exact render={() => <ShowBook />} />
						<Route path='/book/showbooks/bookdetails/:bookId' component={BookDetails} />
						<Redirect to='/home' />
					</Switch>
				</div>
			) : (
				<div>
					<Switch>
						<Route
							path='/login'
							exact
							render={() => (
								<Login responseSuccessGoogle={responseSuccessGoogle} onLogin={logInHandler} />
							)}
						/>
						<Route
							path='/signup'
							exact
							render={() => (
								<Signup responseSuccessGoogle={responseSuccessGoogle} onSignUp={signUpJHandler} />
							)}
						/>
						<Route
							path='/'
							exact
							render={() => (
								<Welcome
									loginwithgoogle={responseSuccessGoogle}
									logInHandler={logInHandler}
									signUpJHandler={signUpJHandler}
								/>
							)}
						/>
					</Switch>
				</div>
			)}
			<Flash />
		</div>
	);
}

export default App;
