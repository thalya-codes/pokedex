import React, { useEffect, useState } from 'react';
import getRequest from '../../utility/getRequest';
import { IPokemonInfos, IPokemonType, IProps, ISpecieInfos } from '../../interfaces/Card';
import './style.scss';

function Card({ name, urlMoreInfos,limit, offset }: IProps): JSX.Element {
	const [pokemonInfos, setPokemonInfos] = useState<IPokemonInfos>();
	const [speciesInfos, setSpeciesInfos] = useState<ISpecieInfos>();
	const speciesURL = pokemonInfos?.species.url;
	
	useEffect(() => {
		getRequest(urlMoreInfos, limit, offset)
			.then(data => setPokemonInfos(data));
	},[]);	

	useEffect(() => {
		getRequest(speciesURL || '', limit, offset)
			.then(data => setSpeciesInfos(data));	
	}, [pokemonInfos]);		

	return (
		<div className='card'>
			<header className='card__header'>
				<div className="card__header-title">
					<h3 className='card__header-name'>{ name }</h3>

					<div className='card__header-pokemon-type'>
						{pokemonInfos?.types.map((pokeType: IPokemonType): JSX.Element => {
							return (
								<span 
									className='card__header-pokemon-type-text'  
									key={pokeType.slot + pokeType.type.name}>
										
									{pokeType.type.name}

								</span>
							);
						})}
					</div>
				</div>

				<img 
					className='card__header-img' 
					src={pokemonInfos?.sprites.other.home.front_default} 
					alt={name} 
				/>
			</header>

			<div className='card__content'>
				<ul className='card__content-list'>
					<div className='card__content-list-container'>
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
					{ speciesInfos?.capture_rate !== undefined &&
						<li className='card__content-list-container'>
							<span className='card__content-list-label'>Capture rate: </span>
							<span className='card__content-list-item'>{speciesInfos?.capture_rate}</span>
						</li>
					}
					{ speciesInfos?.habitat !== undefined &&
						<li className='card__content-list-container'>
							<span className='card__content-list-label'>Habitat: </span>						
							<span className='card__content-list-item'>{speciesInfos?.habitat.name}</span> 
						</li>
					}
				</ul>
			</div>
		</div>
	);
}

export default Card;