import React, { useEffect, useState } from 'react';

import { IPokemonResults } from '../interfaces/App';
import getRequest from '../utility/getRequest';

import Button from './Button';
import Card from './Card';

import '../style/global.scss';
import './app.scss';


function App(): JSX.Element  {
	const URL= 'https://pokeapi.co/api/v2/pokemon';
	const limit = 6;
	const [offset, setOffset] = useState(0);
	const [results, setResults] = useState([]);
	
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		getRequest(URL, limit, offset)
			.then(data => {
				setResults(data.results);
				setTotalPage(data.count);
			});
	},[offset]);



	return (
		<div className="container">
			<main className='cards'>
				{results.map((result: IPokemonResults, index: number): JSX.Element => (
					<Card 
						key={index+result.name} 
						name={result.name} 
						urlMoreInfos={result.url} 
						limit={limit}
						offset={offset}
					/>
				))}

				<Button
					limit={limit}
					offset={offset}
					setOffset={setOffset}
					total_page={totalPage}
				/>
			</main>
		</div>
	);
}

export default App;
