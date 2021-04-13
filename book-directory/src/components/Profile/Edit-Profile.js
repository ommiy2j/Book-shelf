import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useHistory, useLocation } from 'react-router-dom';

const EditProfile = (props) => {
	let location = useLocation();
	console.log(location.profileDetails);
	const history = useHistory();
	const [ country, setCountry ] = useState('');
	const [ state, setState ] = useState('');
	const [ profImage, setProfileImage ] = useState('');
	const [ profImageUrl, setProfileImageUrl ] = useState('');
	const [ fname, setFname ] = useState('');
	const [ lname, setLname ] = useState('');
	const [ fbUrl, setFbUrl ] = useState('');
	const [ linkdinUrl, setLinkdinUrl ] = useState('');
	const [ githubUrl, setGithubUrl ] = useState('');
	const [ skillInp, setSkillInp ] = useState('');
	const [ skills, setSkills ] = useState([]);

	const onFileChange = (e) => {
		setProfileImage(e.target.files[0]);
		const imgUrl = URL.createObjectURL(e.target.files[0]);
		setProfileImageUrl(imgUrl);
		console.log(profImage, profImageUrl);
	};

	const clearInput = () => {
		setSkillInp('');
	};
	const addSkills = (e) => {
		if (skillInp === '') {
			console.log('error');
		} else {
			skills.push(skillInp);
			console.log(skills);
			clearInput();
		}
	};

	const addSkillsUsingEnter = (e) => {
		if (e.key === 'Enter') {
			addSkills();
		}
	};

	const updateProfile = () => {
		const userId = localStorage.getItem('userId');
		const formData = new FormData();
		formData.append('fname', fname);
		formData.append('lname', lname);
		formData.append('image', profImage);
		formData.append('country', country);
		formData.append('state', state);
		formData.append('fbUrl', fbUrl);
		formData.append('linkdinUrl', linkdinUrl);
		formData.append('githubUrl', githubUrl);
		formData.append('skills', skills);

		fetch('https://bookshelf124.herokuapp.com/profile/' + userId, {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer' + localStorage.getItem('token')
			},
			body: formData
		})
			.then((res) => {
				console.log(res);
				history.push('/profile');
				return res.json();
			})
			.then((result) => {
				history.push('/profile');
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {});

	return (
		<div>
			<div className='edit-profile-container'>
				<div className='edit-form'>
					<div className='heading-edit'>
						<h2>Edit Information</h2>
					</div>
					<div className='info-edit'>
						<div className='edit-name'>
							<div class='input-wrapper'>
								<input
									type='text'
									onChange={(e) => setFname(e.target.value)}
									value={fname}
									id='firstname'
									required
								/>
								<label for='user'>First name</label>
							</div>

							<div class='input-wrapper'>
								<input
									type='text'
									id='lastname'
									value={lname}
									onChange={(e) => setLname(e.target.value)}
									required
								/>
								<label for='user'>last name</label>
							</div>
						</div>
						<div className='skills'>
							<div className='input-wrapper'>
								<input
									value={skillInp}
									type='text'
									onKeyPress={(e) => addSkillsUsingEnter(e)}
									onChange={(e) => setSkillInp(e.target.value)}
								/>
								<label htmlFor='skills-input'>Add your skills</label>
								<div className='plus-icon' onClick={addSkills}>
									<FontAwesomeIcon className='add-skill-btn' icon='plus' />
								</div>
							</div>
							<div className='skill-show'>
								<p className='skills-head'>Your Skills:</p>
								<div className='all-skills'>{skills.map((skill) => <span>{skill}</span>)}</div>
							</div>
						</div>
						<div className='edit-location'>
							<div className='input-wrapper'>
								<label for='country'>Country</label>
								<CountryDropdown
									className='country'
									value={country}
									onChange={(e) => setCountry(e)}
									value={country}
								/>
							</div>
							<div className='input-wrapper'>
								<label for='country'>State</label>
								<RegionDropdown
									className='country'
									country={country}
									onChange={(e) => setState(e)}
									value={state}
								/>
							</div>
						</div>
						<div className='upload-profile-pic'>
							<div className='input-wrapper'>
								<div className={profImage ? `image-upload-wrap-hide` : `image-upload-wrap`}>
									<div className='drag-text'>
										<h3>Add Your Image</h3>
									</div>
									<input
										type='file'
										onChange={(e) => onFileChange(e)}
										name='profile-img'
										id='profile-img'
									/>
								</div>
								<div className={profImage ? `file-upload-content-show` : `file-upload-content`}>
									<img class='file-upload-image' src={profImageUrl} alt='your image' />
									<FontAwesomeIcon
										className='remove-profImage'
										onClick={() => {
											setProfileImage('');
										}}
										icon='times'
									/>
								</div>
							</div>
						</div>
						<div className='social-add'>
							<h3>Add Social sites</h3>
							<div className='input-wrapper-social'>
								<label className='facebook-url-label' htmlFor='facevook'>
									Facebook
								</label>
								<input
									type='text'
									name='fb'
									value={fbUrl}
									onChange={(e) => setFbUrl(e.target.value)}
									id='fb'
								/>
							</div><br/>
							<div className='input-wrapper-social'>
								<label htmlFor='facevook'>Linkdin</label>
								<input
									type='text'
									value={linkdinUrl}
									onChange={(e) => setLinkdinUrl(e.target.value)}
									name='ld'
									id='ld'
								/>
							</div><br/>
							<div className='input-wrapper-social'>
								<label htmlFor='facevook'>Github</label>
								<input
									type='text'
									name='gh'
									value={githubUrl}
									onChange={(e) => setGithubUrl(e.target.value)}
									id='gh'
								/>
							</div>
						</div>
						<div className='submit-btn'>
							<button className='profile-update-btn btn' onClick={updateProfile}>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
