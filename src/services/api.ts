import { PlanetsType } from '../types';

const URL_API = 'https://swapi.dev/api/planets';

export const fetchApiStarWars = async () => {
  const response = await fetch(URL_API);
  const data = await response.json();

  const StarWarsPlanets = data.results.map((Planets: PlanetsType) => {
    return {
      name: Planets.name,
      rotation_period: Planets.rotation_period,
      orbital_period: Planets.orbital_period,
      diameter: Planets.diameter,
      climate: Planets.climate,
      gravity: Planets.gravity,
      terrain: Planets.terrain,
      surface_water: Planets.surface_water,
      population: Planets.population,
      films: Planets.films,
      created: Planets.created,
      edited: Planets.edited,
      url: Planets.url,
    };
  });
  return StarWarsPlanets;
};
