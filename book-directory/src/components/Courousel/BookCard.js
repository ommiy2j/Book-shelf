import React from 'react';
import { useState } from 'react';
import './card.css';
import fakePlaceholder from '../../assets/books/fakeBook.png';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Card = ({ book }) => {
	const [ image, setImage ] = useState('');
	const [ randomNo, setRandomNo ] = useState(0);

	const [ isLiked, setIsLiked ] = useState(false);
	const [ totalLike, setTotalLike ] = useState(0);
	const [ liked, setLiked ] = useState(0);
	const [ loading, setLoading ] = useState(false);
	const addlike = (liked) => {
		setLoading(true);
		fetch(`http://localhost:8080/book/showbooks/bookdetails/liked/${book._id}`, {
			method: 'PUT',
			body: JSON.stringify({
				likecount: liked
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer' + localStorage.getItem('token')
			}
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setTotalLike(result.totallike);
				setLoading(false);
			});
	};
	const counter = () => {
		if (isLiked) {
			setLiked(1);
			addlike(liked);
			setIsLiked(!isLiked);
		} else {
			setLiked(-1);
			addlike(liked);
			setIsLiked(!isLiked);
		}
	};

	useEffect(() => {
		setRandomNo(Math.floor(Math.random() * 6));
		console.log(randomNo);
	}, []);
	const styleColor = [ '#fbadaf', '#a4e0eb', '#edb9d6', '#fdca95', '#cbb5e2' ];
	return (
		<div className='b-card' style={{ backgroundColor: styleColor[randomNo] }}>
			<div className='image'>
				<img src={book.image ? `http://localhost:8080${book.image}` : fakePlaceholder} alt='' />
			</div>
			<div className='book-content'>
				<div className='book-title'>{book.name}</div>
				<div className='book-author'>by {book.author}</div>
				{loading ? (
					''
				) : (
					<div className='rate' onClick={counter}>
						<FontAwesomeIcon className={isLiked ? `rate-book-true` : `rate-book-false`} icon='heart' />
					</div>
				)}
				<div className='book-details'>
					{
						book.details
					}
				</div>

				<Link to={'/book/showbooks/bookdetails/' + book._id} className='book-details-link'>
					<div className='book-see' style={{ color: styleColor[randomNo] }}>
						See The Book
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Card;
