import React, { useEffect } from 'react';
import './popUp.css';

const ShowPopUp = ({ showPopUp }) => {
	
	if (!showPopUp) {
		showPopUp = [
			false,
			''
		];
    }
	useEffect(() => {
		console.log(showPopUp);
	});
	return (
		<div>
			<div id='popUp' class={`popUp-container popUp-${showPopUp[0]}`}>
				<div class='messege'>{showPopUp[1]}</div>
			</div>
		</div>
	);
};

export default ShowPopUp;
