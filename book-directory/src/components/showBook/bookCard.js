import React, { useState, useReducer, useEffect } from 'react';
import './book.css';
import fakePlaceholder from '../../assets/books/fakeBook.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const BookCard = (props) => {
	const [ isLiked, setIsLiked ] = useState(false);
	const [ totalLike, setTotalLike ] = useState(0);
	const [ liked, setLiked ] = useState(0);
	const [ loading, setLoading ] = useState(false);
	const { image, bookId, name, author, details } = props;
	const addlike = (liked) => {
		setLoading(true);
		fetch(`https://bookshelf124.herokuapp.com/book/showbooks/bookdetails/liked/${bookId}`, {
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
		console.log(liked);
	}, []);
	return (
		<div className='book-card'>
			<div class='book-container2'>
				<div class='book-image'>
					<img src={image ? `https://bookshelf124.herokuapp.com${image}` : fakePlaceholder} alt='' />
				</div>
				<div className='book-content-2'>
					<div className='book-title'>{name}</div>
					<div className='book-author'>by {author}</div>

					{loading ? (
						''
					) : (
						<div className='rate' onClick={counter}>
							<FontAwesomeIcon className={isLiked ? `rate-book-true`: `rate-book-false`} icon='heart' />
						</div>
					)}
					<div className='book-details'>{details}</div>
					<Link to={'/book/showbooks/bookdetails/' + bookId} className='book-details-link'>
						<div className='book-see'>See The Book</div>
					</Link>
					<div className='total-like'>
						<small>Liked By: {totalLike} </small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookCard;
