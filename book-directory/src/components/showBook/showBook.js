import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Corousel from '../Courousel/bookCorousel.';
import Loader from '../Loader';
import '../pagination/pagination.css';
import TopUsers from '../TopUsers/TopUsers';
import BookCard from './bookCard';

const ShowBook = ({ name, author, details }) => {
	const [ books, setBooks ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ totalPage, setTotalPage ] = useState(1);
	const [ page, setPage ] = useState(1);

	const pages = new Array(totalPage).fill(null).map((v, i) => i);

	const prevPage = () => {
		setPage(Math.max(0, page - 1));
	};
	const nextPage = () => {
		setPage(Math.min(totalPage, page + 1));
	};
	useEffect(
		() => {
			fetch(`https://bookshelf124.herokuapp.com/book/showbooks?page=${page}`, {
				headers: {
					Authorization: 'Bearer' + localStorage.getItem('token')
				}
			})
				.then((res) => {
					if (res.status === 422) {
						throw new Error('Validation failed.');
					}
					if (res.status !== 200 && res.status !== 201) {
						console.log('Error!');
						throw new Error('Could not authenticate you!');
					}
					return res.json();
				})
				.then((result) => {
					// console.log(result);
					setBooks(result.book);
					setTotalPage(result.total);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
			console.log(pages);
		},
		[ page ]
	);
	return (
		<div className='book-main-cont'>
			<Corousel />
			<div className='main-sec'>
			<TopUsers />
				<div className='container-fluid'>
					<h1>Popular books.</h1>
					<div className='book-container'>
						{loading ? (
							<Loader />
						) : (
							books.map((book) => (
								<BookCard
									key={book._id}
									bookId={book._id}
									name={book.name}
									details={book.details}
									image={book.image}
									author={book.author}
								/>
							))
						)}
					</div>
					<div className='pageination-container'>
						<ul>
							<li onClick={prevPage}>
								<FontAwesomeIcon icon='arrow-left' />
							</li>
							{pages.map((pageIndex) => (
								<li onClick={() => setPage(pageIndex + 1)} key={pageIndex}>
									{pageIndex + 1}
								</li>
							))}
							<li onClick={nextPage}>
								<FontAwesomeIcon icon='arrow-right' />
							</li>
						</ul>
					</div>
				</div>
				
			</div>
			
		</div>
	);
};
export default ShowBook;
