import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import './pagination.css';

const Pagination = (props) => {
	// useEffect(() => {
	// 	console.log(props);
	// }, []);
	return (
		<div>
			<div className='pageination-container'>
				<ul>
					<li onClick={props.onPrevious}>
						<FontAwesomeIcon icon='arrow-left' />
					</li>
					{props.pages.map((pageIndex) => <li onClick={props.setPageNo(pageIndex)} key={pageIndex}>{pageIndex + 1}</li>)}
					<li onClick={props.onNext}>
						<FontAwesomeIcon icon='arrow-right' />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Pagination;
