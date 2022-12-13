//When searching for a pet, users will be redirected to URLs such as /search?name=fido, where fido is the search query. In order to render the pets that match the specified query, we will need to capture the query parameter value from ?name=fido. Remember, we can do this with the useLocation() hook.

import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../../components/hero';
import { getPets } from '../../api/petfinder';
import Pet from '../../components/pet';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {

  const {search} = useLocation();
  
  //Recall that the search property on the location object corresponds to the !!!current URL’s query string!!!. To turn this query string into an object whose keys correspond to query parameters and whose values correspond to those parameters’ values, you should pass the search object to the URLSearchParams constructor and store the result in a constant called queryParams.
  const queryParams = useMemo(() => { 
    return new URLSearchParams(search);
  }, [search]); // will return an OBJECT containing current search info

    //console.log(search) //prints: ?name=gia (i.e. string)
    //vs.
    //console.log(queryParams) //prints: URLSearchParams {} and a bunch of functions inside the object. 

  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function getPetsData() {
      const petNameToFind = queryParams.get('name');//to get the value of a specific query parameter (searched word i.e. 'shuri'), we pass in the name of the query parameter whose value we want to obtain as a string ('name') to the queryParams.get() method. 
      const petsData = await getPets('', petNameToFind);

      setPets(petsData);
    }

    getPetsData();
  }, [queryParams]);

  return (
    <div className="page">
      <Hero displayText={`Results for ${queryParams.get('name')}`} />

      <h3>Pets available for adoption near you</h3>

      <main>
        <div className="grid">
          {pets.map((pet) => (
            <Pet animal={pet} key={pet.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
