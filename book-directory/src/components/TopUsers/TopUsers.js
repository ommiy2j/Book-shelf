import React from 'react';
import { useEffect, useState } from 'react';
import Loader from '../Loader';
import './user.css';
import Users from './Users';

const TopUsers = () => {
	const [ users, setusers ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		fetch('http://localhost:8080/users/allusers')
			.then((res) => {
				return res.json();
			})
			.then((users) => {
				setusers(users.users);
				setLoading(false);
			});

		console.log(users);
	}, []);
	return (
		<div className='user-section'>
			<div class='panel'>
				<h6>Users & Developers</h6>
				<ul class='user-list'>{loading ? <Loader /> : users.map((user) => <Users key={user._id} user={user} />)}</ul>
			</div>
		</div>
	);
};

export default TopUsers;
