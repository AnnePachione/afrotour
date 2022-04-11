import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Prismic from '@prismicio/client'; //o * significa que tudo que for Prismic virá do @primicio/client

const endpoint = Prismic.getRepositoryEndpoint('afrotour-annepachione');

const client = Prismic.createClient(endpoint)

//const routes = [
//  {
//    type: 'cities',
//    path: '/'
//  }
//]


const citiesContext = createContext({});

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('brazil');

  useEffect(() => {
    async function fetchData() {
   
    const results = await client.getAllByType('cities', {
      predicates: [Prismic.predicate.at('my.cities.country', selectedCountry)]
    });

    const resultsFormatted = results.map(item => {
      return {
        id: item.uid,
        cityName: item.data.nome_da_cidade,
        state: item.data.state,
        area: item.data.area,
        population: item.data.population, 
        image: item.data.image.url,
      }
    });

      setCities(resultsFormatted);
    }

    fetchData();
  }, [selectedCountry]);

  function listCitiesByCountry(country) {
    setSelectedCountry(country);
  }

  async function filterCitiesByName(cityName) {
    
    const results = await client.getAllByType('cities', {
      predicates: [
      Prismic.predicate.at('my.cities.country', selectedCountry),
      Prismic.predicate.fulltext('my.cities.nome_da_cidade', cityName)
    ]
    });

    const resultsFormatted = results.map(item => {
      return {
        id: item.uid,
        cityName: item.data.nome_da_cidade,
        state: item.data.state,
        area: item.data.area,
        population: item.data.population, 
        image: item.data.image.url,
      }
    });


    setCities(resultsFormatted);
  }

  return (
    <citiesContext.Provider value={{
      cities,
      selectedCountry,
      listCitiesByCountry,
      filterCitiesByName
    }}>
      {children}
    </citiesContext.Provider>
  );
}

export function useCities() {
  return useContext(citiesContext);
}