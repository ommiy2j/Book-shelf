import React from 'react';
import './loadingCss.css';
const LoadingButton = () => {
	return (
		<div>
			<button className='profile-update-btn btn'>
				<label for='check' class='btn-label'>
					<span class='load open' />
				</label>
			</button>
		</div>
	);
};

export default LoadingButton;
