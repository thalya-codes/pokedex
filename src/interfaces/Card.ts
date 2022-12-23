export interface IProps {
  name: string;
  urlMoreInfos: string;
  limit: number;
  offset: number;
}

export interface IPokemonInfos {
  abilities: [{ ability: { name: string } }];

  held_items: [];
  species: { name: string; url: string };

  sprites: {
    other: {
      home: { front_default: string };
    };
  };

  types: IPokemonType[];
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface ISpecieInfos {
  capture_rate: number;
  habitat: {
    name: string;
    url: string;
  };
}
