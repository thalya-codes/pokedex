import React, { useEffect, useState } from 'react';
import { IProps } from '../../interfaces/Button';
import './style.scss';


function Button({  limit, offset ,total_page, setOffset }: IProps) {
	const [maxButtons, setMaxButtons] = useState(5);
	
	const pages = Math.ceil(total_page / limit);
	const currentPage = offset ? (offset / limit) + 1 : 1;

	const side_buttons_quant = (maxButtons - 1) / 2;
	const button_base = Math.max(currentPage - side_buttons_quant, 0);
	const mobile_screen_sm = 768;
	
	const onChangePage = (page: number):void => {
		setOffset((page - 1) * limit);
	};

	const handleMaxButtonsQuantity = (): void => {	
		const currentScreenWidth = window.innerWidth;
		
		if (currentScreenWidth <= mobile_screen_sm) {
			setMaxButtons(3)
		} else {
			setMaxButtons(5);
		};
	};

	useEffect(() => {
		handleMaxButtonsQuantity();
	});
	
	window.addEventListener('resize', (): void => handleMaxButtonsQuantity());	

	return (
		<div className='buttons-container'>
			<li>
				<button
					className='
						buttons-container__button
						buttons-container__button--prev-next
					'
					onClick={() => onChangePage(currentPage - 1)}
					disabled={currentPage === 1}
				>Prev</button>
			</li>
			{
				Array.from({ length: Math.min(maxButtons, pages) })
					.map((_,index) => index + button_base)
					.map((page: number) => (
						<li key={page++}>
							<button
								className={`
									buttons-container__button
									${ page+1 === currentPage ? 
										'buttons-container__button--active' : ''
									}`}

								onClick={() => onChangePage(page) }
								
							>{page+1}</button>
						</li>
					))
			}
			<li>
				<button 
					className='
						buttons-container__button
						buttons-container__button--prev-next
					'
					onClick={() => onChangePage(currentPage + 1)}
					disabled={currentPage === pages}
				>Next</button>
			</li>
		</div>
	);
	
}
export default Button;