import React, { useEffect, useState } from 'react';
import '../css/global.scss';
import { IPokemonResults } from '../interfaces/App';
import getRequest from '../utility/getRequest';
import Card from './Card';

function App(): JSX.Element  {
	const [offsetParam, setOffSetParam] = useState(1);
	const [results, setResults] = useState([]);
	const URL = 'https://pokeapi.co/api/v2/pokemon';
	
	useEffect(() => {
		getRequest(URL, offsetParam).then(data => setResults(data.results));	
	},[]);
	
	return (
		<section className='cards'>
			{results.map((result: IPokemonResults, index: number): JSX.Element => (
				<Card 
					key={index+result.name} 
					name={result.name} 
					urlMoreInfos={result.url} 
					offsetParam={offsetParam}
				/>
			))}
		</section>
	);
}

export default App;
