import React, { useState } from 'react';
import AddBook from '../AddBook/AddBook';
import './home.css';
import bookgif from '../../assets/3.png';

const Home = () => {
	const [ addPop, setAddPop ] = useState(false);
	const showAddBook = () => {
		setAddPop(true);
	};
	const closeAddBook = () => {
		setAddPop(false);
	};
	return (
		<div className='home'>
			<div className={addPop ? `home-container-blur`: `home-container`}>
				<div id='background' />
				<div className='book-gif'>
					<img className='book-img' src={bookgif} alt='' />
				</div>
				<div className='main-content'>
					<h2 class='less-margin'>
						Inspire <span class='highlight'>Create</span> Dream <span class='highlight'>Learn .</span>
					</h2>
					<div className='main-wel'>
						<h2>
							<span class='highlight'>Welcome</span> To <strong>BookShelf</strong>{' '}
							<small>for Developers...</small>
						</h2>
					</div>
					<div className='quote'>
						<small>“A half-read book is a half-finished love affair.”</small>
					</div>
					<div className='add-book-btn'>
						<p>Add your first book...</p>
						<button className='addBooks-btn' style={{ cursor: 'pointer' }} onClick={showAddBook}>
							Add Book
						</button>
					</div>
				</div>
				
			</div>
			{/* <BookCard /> */}
			<AddBook addPop={addPop} closeAddBook={closeAddBook} />
		</div>
	);
};

export default Home;
