import React, { useEffect, useState } from 'react';
import './profile.css';
import profileImg from '../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';


const Profile = () => {
	const [ name, setName ] = useState('');
	const [ fname, setFName ] = useState('');
	const [ lname, setLName ] = useState('');
	const [ country, setCountry ] = useState('');
	const [ state, setState ] = useState('');
	const [ profImage, setProfileImage ] = useState('');
	const [ fbUrl, setFbUrl ] = useState('');
	const [ linkdinUrl, setLinkdinUrl ] = useState('');
	const [ githubUrl, setGithubUrl ] = useState('');
	const [ skills, setSkills ] = useState([]);
	const userId = localStorage.getItem('userId');
	const showProfile = () => {
		
		fetch('https://bookshelf124.herokuapp.com/profile/' + userId, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer' + localStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				// console.log(res);
				return res.json();
			})
			.then((result) => {
				console.log(result.image);
				setFName(result.fname);
				setLName(result.lname);
				setName(result.name);
				setState(result.location.state);
				setCountry(result.location.country);
				setFbUrl(result.social.facebook);
				setGithubUrl(result.social.github);
				setLinkdinUrl(result.social.linkdin);
				setSkills(result.skills);
				if (result.image.startsWith('https')) {
					setProfileImage(result.image);
				} else {
					setProfileImage('https://bookshelf124.herokuapp.com' + result.image);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const editProfile = (e) => {
		console.log('Edit Page',fname);
	};

	useEffect(() => {
		showProfile();
	}, []);

	return (
		<div className='profile'>
			<div className='profile-container'>
				<div className='edit' onClick={(e) => editProfile(e)}>
					<NavLink
						to={{
							pathname: `/edit-profile/${userId}`,
							profileDetails: {
								fname: name,
								lname: lname,
								image: profImage,
								githubUrl: githubUrl,
								linkdinUrl: linkdinUrl,
								fbUrl: fbUrl
							}
						}}
					>
						<FontAwesomeIcon icon='pencil-alt' className='edit-pencil' />
					</NavLink>
				</div>
				<div className='location'>
					<FontAwesomeIcon icon='location-arrow' className='Prof-Icon' />
					<small>
						{country},{state}{' '}
					</small>
				</div>
				<div className='profile-image'>
					<img draggable='false' src={profImage ? profImage : profileImg} alt='' />
				</div>
				<div className='profile-details'>
					<div className='name'>
						<h2>{name}</h2>
					</div>
					<div class='specialist'>
						<small>
							<ul>{skills.map((skill) => <li>{skill}</li>)}</ul>
						</small>
					</div>
					<div className='profile-social'>
						<ul>
							<li>
								<a href={fbUrl ? fbUrl : `#`} target='_blank'>
									<FontAwesomeIcon className='social-icon-fb' icon={faFacebook} />
								</a>
							</li>
							<li>
								<a href={linkdinUrl ? linkdinUrl : `#`} target='_blank'>
									<FontAwesomeIcon className='social-icon-linkdin' icon={faLinkedin} />
								</a>
							</li>
							<li>
								<a href={githubUrl ? githubUrl : `#`} target='_blank'>
									<FontAwesomeIcon className='social-icon-git' icon={faGithub} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
