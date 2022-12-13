import React, { useEffect, useState } from 'react';
import { getPets } from '../../api/petfinder';
import Hero from '../../components/hero';
import Pet from '../../components/pet';
import { useParams, Link } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState(null);
  const {type} = useParams();//Notice that even after you navigate to /cats, the HomePage component still renders all the pets (not just the cats). The useParams() hook can be used to give a component access to the values of the URL parameters in the current URL. How does this work? Inside the useEffect() hook below, we’ve passed type to our API’s getPets method which fetches pets of the specified type to be rendered on the page.
  useEffect(() => {
    async function getPetsData() {
      const petsData = await getPets(type);//...we’ve passed type to our API’s getPets method which fetches pets of the specified type to be rendered on the page
      setData(petsData);
    }

    getPetsData();
  }, [type]);//// Only re-run the effect if 'type' value changes (i.e. cat is selected instead of a dog)

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page">
      <Hero />
      <h3>
        <span className="pet-type-label">{type ? `${type}s` : 'Pets'}</span>{' '}
        available for adoption near you
      </h3>

      {data.length ? (
        <div className="grid">
          {data.map((animal) => (
            <Link // Change me to a Link!
              key={animal.id}
              to={`/${animal.type.toLowerCase()}/${animal.id}`}
              className="pet"
            >
              <article>
                <div className="pet-image-container">
                  {
                    <img
                      className="pet-image"
                      src={
                        animal.photos[0]?.medium ||
                        '/missing-animal.png'
                      }
                      alt=""
                    />
                  }
                </div>
                <h3>{animal.name}</h3>
                <p>Breed: {animal.breeds.primary}</p>
                <p>Color: {animal.colors.primary}</p>
                <p>Gender: {animal.gender}</p>
              </article>
            </Link> // Don't forget to change me from 'a' tag to 'Link' tag!
          ))}
        </div>
      ) : (
        <p className="prompt">No {type}s available for adoption now.</p>
      )}
    </div>
  );
};

export default HomePage;
