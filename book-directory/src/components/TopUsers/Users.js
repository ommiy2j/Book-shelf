import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import placeholder from '../../assets/profile.png';

const Users = ({ user }) => {
	const [ image, setImage ] = useState('');
	const titleRef = useRef();
	// const changeClass = () => {
	// 	titleRef.current.classList.add('abc');
	// };
	useEffect(() => {
		if (user.profile.image) {
			if (user.profile.image.startsWith('https')) {
				setImage(user.profile.image);
			} else {
				setImage('http://localhost:8080' + user.profile.image);
			}
		} else {
			setImage(placeholder);
		}
	}, []);
	return (
		<li>
			<img src={image} />
			<h5 ref={titleRef}>{user.profile.fname}</h5>
			<p>{user.email}</p>
		</li>
	);
};

export default Users;
