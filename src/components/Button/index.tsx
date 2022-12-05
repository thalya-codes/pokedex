import React from 'react';
import { IProps } from '../../interfaces/Button';
import './style.scss';

const max_buttons = 5;
const side_buttons_quant = (max_buttons - 1) / 2;

function Button({  limit, offset ,total_page, setOffset }: IProps) {

	const currentPage = offset ? (offset / limit) + 1 : 1;
	const pages = Math.ceil(total_page / limit);
	const button_base = Math.max(currentPage - side_buttons_quant, 0);
	
	const onChangePage = (page: number):void => {
		setOffset((page - 1) * limit);
	};

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
				Array.from({ length: Math.min(max_buttons, pages) })
					.map((_,index) => index + button_base)
					.map((page: number) => (
						<li key={page++}>
							<button
								className={`
									buttons-container__button ${page+1 === currentPage ? 'buttons-container__button--active' : ''}`}
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