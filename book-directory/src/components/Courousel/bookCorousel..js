import React, { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import BookCard from './BookCard';
import './card.css';

const Corousel = () => {
	const [ books, setbooks ] = useState([]);
	const getTopBooks = () => {
		console.log('dfgdfgdfgdfggdg');
		fetch('http://localhost:8080/book/showbooks/bestbooks', {
			headers: {
				Authorization: 'Bearer' + localStorage.getItem('token')
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				console.log(result);
				setbooks(result.book);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getTopBooks();
		console.log('book corousoul', books);
	}, []);
	const breakPoint = [
		{ width: 500, itemsToShow: 1 },
		{ width: 760, itemsToShow: 1 },
		{ width: 980, itemsToShow: 1 },
		{ width: 1200, itemsToShow: 1 }
	];
	return (
		<div className='corousel'>
			<Carousel
				breakPoints={breakPoint}
				focusOnSelect={true}
				enableAutoPlay
				autoPlaySpeed={2500}
			>
				{books.map((book) => <BookCard key={book._id} book={book} />)}
			</Carousel>
		</div>
	);
};
export default Corousel;
