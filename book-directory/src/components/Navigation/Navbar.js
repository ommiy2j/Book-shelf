import { NavLink, useHistory } from 'react-router-dom';
import React from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Navbar = ({ auth, logout }) => {
	const [ mobviewmenu, setmobviewmenu ] = useState(false);
	var history = useHistory();
	// console.log(auth, logout);
	const mobileView = () => {
		setmobviewmenu(!mobviewmenu);
	};
	const closeNavItems = () => {
		if (mobviewmenu) {
			setmobviewmenu(false);
		}
	};
	return (
		<div>
			<div className='nav_container'>
				<div className='mainNav'>
					<div className='logo'>
						<h3 className='main-heading'>Bookshelf</h3>
					</div>
					<div className='navbar'>
						{!auth ? (
							<div className='loginNav'>
								<NavLink className='nav' activeClassName='active' to='/login'>
									<FontAwesomeIcon icon='sign-in-alt' className='navIcon' />
								</NavLink>
								<NavLink className='nav' activeClassName='active' to='/signup'>
									<FontAwesomeIcon icon='user-plus' className='navIcon' />
								</NavLink>
							</div>
						) : (
							<div className='authNav'>
								<NavLink exact className='nav' activeClassName='active' to='/home'>
									<FontAwesomeIcon icon='home' className='navIcon' />
								</NavLink>
								<NavLink exact to='/books' className='nav' activeClassName='active'>
									<FontAwesomeIcon icon='book' className='navIcon' />
								</NavLink>
								<NavLink to='/profile' className='nav' activeClassName='active'>
									<FontAwesomeIcon className='navIcon' icon='user-circle' />
								</NavLink>
								<a
									href='/'
									onClick={() => {
										history.push('/');
										logout();
										window.flash('logged out successfully!', 'success');
									}}
									className='nav'
								>
									<FontAwesomeIcon className='navIcon' icon='sign-out-alt' />
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='nav_container-mobile'>
				<div className='head-mob'>Bookshelf</div>
				<div className='main-nav-mobile'>
					<div onClick={mobileView} className={mobviewmenu ? `cross` : `lines`}>
						<span />
						<span />
						<span />
					</div>
					<div
						onClick={closeNavItems}
						className={mobviewmenu ? `mobile-nav-items` : `mobile-nav-items-hidden`}
					>
						<div className='triangle' />
						<ul>
							{!auth ? (
								<li>
									<NavLink className='nav-mob' activeClassName='active' to='/login'>
										Login
									</NavLink>
									<NavLink className='nav' activeClassName='active' to='/signup'>
										sign up
									</NavLink>
								</li>
							) : (
								<ul>
									<li>
										<NavLink exact className='nav-mob' activeClassName='active' to='/home'>
											Home
										</NavLink>
									</li>
									<li>
										<NavLink exact to='/books' className='nav-mob' activeClassName='active'>
											Books
										</NavLink>
									</li>
									<li>
										<NavLink to='/profile' className='nav-mob' activeClassName='active'>
											Profile
										</NavLink>
									</li>
									<li>
										<a
											href='/'
											onClick={() => {
												history.push('/');
												logout();
												window.flash('logged out successfully!', 'success');
											}}
											className='nav-mob'
										>
											Log out
										</a>
									</li>
								</ul>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

// <div className='container-nav'>
// 				<div className='navbar'>
// 					<div className="logo">
// 						<h2>Book~~Dire..</h2>
// 					</div>
// 					<div className='mainNav'>
// 						<NavLink className='nav' activeClassName='active' to='/home'>
// 							Home
// 						</NavLink>
// 					</div>
// 					{!auth ? (
// 						<div className='authNav'>
// 							<NavLink className='nav' activeClassName='active' to='/login'>
// 								LogIn
// 							</NavLink>
// 							<NavLink className='nav' activeClassName='active' to='/signup'>
// 								SignUp
// 							</NavLink>
// 						</div>
// 					) : (
// 						<div className='normal-nav'>
// 							<Profile />
// 							<NavLink
// 								onClick={logout}
// 								to='/logout'
// 								className='nav'
// 								activeClassName='active'
// 								to='/logout'
// 							>
// 								Logout
// 							</NavLink>
// 							<div className='fav'>{/* Favourite Book { fav } */}</div>
// 						</div>
// 					)}
// 				</div>
// 			</div>
