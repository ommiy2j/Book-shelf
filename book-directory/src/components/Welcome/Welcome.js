import React, { useEffect, useState } from 'react';
import './welcome.css';
import {  NavLink, useHistory } from 'react-router-dom';



const Welcome = () => {
	useEffect(() => {});
	return (
		<div>
			<div className='welcome-container'>
				<div className='main-wel-cont'>
					<div class='bottom-container'>Welcome to bookshelf!</div>
					<div class='top-container'>Welcome to bookshelf!</div>
					<NavLink className='welcomeLogin' to='/login'>
						Please Login/signup to Continue
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
