import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {  useState } from 'react';
import './AddBook.css';

const AddBook = ({ addPop, closeAddBook }) => {
	const [ bookName, setBookName ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ image, setImage ] = useState('');
	const [ details, setDetails ] = useState('');
	const [ imageUrl, setImageUrl ] = useState('');

	const addBooks = () => {
		const formdata = new FormData();
		formdata.append('name', bookName);
		formdata.append('author', author);
		formdata.append('image', image);
		formdata.append('details', details);

		fetch('https://bookshelf124.herokuapp.com/book/addbook', {
			method: 'POST',
			body: formdata,
			headers: {
				Authorization: 'Bearer' + localStorage.getItem('token')
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				window.flash('Book Added!', 'success');
				clearInputs();
				closeAddBook();
			});
	};

	const onFileChange = (e) => {
		setImage(e.target.files[0]);
		const imgUrl = URL.createObjectURL(e.target.files[0]);
		setImageUrl(imgUrl);
	};

	const clearInputs = () => {
		setAuthor('');
		setBookName('');
		setDetails('');
		setImage('');
	};

	return (
		<div className={`AddBook AddBook-${addPop} `}>
			<div className='addBook-container'>
				<div className='main'>
					<div className='form'>
						<div className={`close`}>
							<FontAwesomeIcon
								className='close-icon'
								icon='times'
								onClick={() => {
									closeAddBook();
									clearInputs();
								}}
							/>
						</div>
						<div className='heading'>
							<h2>Add Book</h2>
						</div>
						<div className='input'>
							<input
								type='text'
								value={bookName}
								placeholder='Enter Book Name'
								onChange={(e) => setBookName(e.target.value)}
							/>
							<input
								type='text'
								value={author}
								placeholder='Enter Author Name'
								onChange={(e) => setAuthor(e.target.value)}
							/>
							<textarea
								name='details'
								id='details'
								value={details}
								placeholder='Add Details '
								onChange={(e) => setDetails(e.target.value)}
								cols='50'
								rows='4'
							/>
						</div>
						<div className='wrapper'>
							<div className='left'>
								{!image ? (
									<img src='http://placehold.it/350x350' alt='' />
								) : (
									<img src={imageUrl} alt='' />
								)}
							</div>
							<div className='right'>
								{!image ? (
									<input className='imgSrc' type='text' placeholder='Add Image Url' value='' />
								) : (
									<input className='imgSrc' type='text' value={image.name} />
								)}
								<span className='file-wrapper'>
									<input type='file' className='file' onChange={(e) => onFileChange(e)} />
									<span className='btn btn-large btn-alpha'>Upload Image</span>
								</span>
							</div>
							<div className='submit-btn'>
								<button className='btn btn-submit' onClick={addBooks}>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddBook;
