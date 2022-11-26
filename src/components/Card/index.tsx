import React, { useEffect, useState } from 'react';
import getRequest from '../../utility/getRequest';
import { IPokemonInfos, IPokemonType, IProps, ISpecieInfos } from '../../interfaces/Card';

function Card({ name, urlMoreInfos,offsetParam }: IProps): JSX.Element {
	const [pokemonInfos, setPokemonInfos] = useState<IPokemonInfos>();
	const [speciesInfos, setSpeciesInfos] = useState<ISpecieInfos>();
	const speciesURL = pokemonInfos?.species.url;
	
	useEffect(() => {
		getRequest(urlMoreInfos, offsetParam)
			.then(data => setPokemonInfos(data));

	},[]);	

	useEffect(() => {
		getRequest(speciesURL || '', offsetParam)
			.then(data => setSpeciesInfos(data));	
	}, [pokemonInfos]);		

	return (
		<div className='card'>
			<header className='card__header'>
				<h3 className='card__header-name'>{ name }</h3>
				{pokemonInfos?.types.map((pokeType: IPokemonType): JSX.Element => {
					return (
						<div className='container' key={pokeType.slot + pokeType.type.name}>
							<span className='card__header-pokemon-type'>{pokeType.type.name}</span>
						</div>
					);
				})}

				<img 
					className='card__header-img' 
					src={pokemonInfos?.sprites.other.home.front_default} 
					alt={name} 
				/>
			</header>

			<div className='card__content'>
				<ul className='card__content-list'>
					<div className='container'>
						<span className='card__content-list-label'>Hability: </span>
						{ pokemonInfos?.abilities.map((item, index: number):JSX.Element => {
							return (
								<li 
									className='card__content-list-item'
									key={index + item.ability.name}>{item.ability.name}
								</li>
							);
						}) }
					</div>

					<li className='container'>
						<span className='card__content-list-label'>Caputure rate: </span>
						<span className='card__content-list-item'>{speciesInfos?.capture_rate}</span>
					</li>
				
					<li className='container'>
						<span className='card__content-list-label'>Habitat: </span>						
						{ 
							speciesInfos?.habitat !== undefined 
							&& <span className='card__content-list-item'>{speciesInfos?.habitat.name}</span> 
						}
					</li>					
				</ul>
			</div>
		</div>
	);
}

export default Card;