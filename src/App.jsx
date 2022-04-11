import React from 'react';

import { Navbar } from './components/Navbar';
import { CityCard } from './components/CityCard';
import { SearchInput } from './components/SearchInput'

import { useCities } from './hooks/useCities';

import { countries } from './utils/countries';

import './styles/global.scss';
import './styles/app.scss';
import './styles/cities.scss';

export function App() {
  const { cities, selectedCountry } = useCities();
 
  return (
    <div className="app">
      <Navbar />

      <section className="cities">
        <div className="search-area">
          <SearchInput />
          <h1>{countries[selectedCountry]}</h1>
        </div>
        <div className="card-container">
          {cities.map(city => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>
    </div>
  );
}