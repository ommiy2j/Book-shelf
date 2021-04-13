import React, { useEffect, useState } from 'react';
import fakePlaceholder from '../../assets/books/fakeBook.png';

function BookDetails (props) {
	const bookId = props.match.params.bookId;
	const [ bookDetails, setbookDetails ] = useState({});
	const [ image, setImage ] = useState('');
	const showDetails = () => {
		fetch(`https://bookshelf124.herokuapp.com/book/showbooks/bookdetails/${bookId}`, {
			headers: {
				Authorization: 'Bearer' + localStorage.getItem('token')
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				console.log(result);
				setbookDetails(result.book);
				setImage(result.book.image);
			});
	};
	useEffect(() => {
		showDetails();
		console.log(bookDetails);
	}, []);
	return (
		<div>
			<div className='book-details-container'>
				<div className='book-image2'>
					<img src={image ? `https://bookshelf124.herokuapp.com${image}` : fakePlaceholder} alt='' />
				</div>
				<div className='book-details'>
					<div className='book-head'>
						<h2>{bookDetails.name}</h2>
						<h6>By-{bookDetails.author}</h6>
					</div>
				</div>
				<div className='book-desc'>
					<p>{bookDetails.details}</p>
				</div>
			</div>
		</div>
	);
}

export default BookDetails;
