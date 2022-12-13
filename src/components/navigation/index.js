import React, { useEffect, useState } from 'react';
import { getPetTypes } from '../../api/petfinder';
import Logo from '../../assets/logo.svg';
import Search from '../search';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  return (
    <nav>
      <div className="nav-logo">
        <img src={Logo} alt="Petlover" />
        <Search />
      </div>
      <ul className="nav-links">
        <li key="all">
          {/* This link should have an activeClassName and exact prop >> exact prop: 'All pets' and other clicked pet BOTH would have activeClassName css styling. to prevent the “All Pets” NavLink from always displaying as active, add the exact prop to it. This will ensure that the NavLink only renders as active when the current URL’s path is an exact match (so, for example, the “All Pets” NavLink will render as active when the current path is '/' but not when the current path is '/dogs') */}
          <NavLink
            to="/"
            className="nav-link"
            activeClassName="nav-link-active"
            exact
          >
            All Pets
          </NavLink>
        </li>
        {petTypes
          ? petTypes.map((type) => (
              <li key={type.name}>
                {/* These links should have an activeClassName prop >> activeClassName: Recall that NavLink also accepts an activeClassName property that will be applied to the NavLink whose to prop matches the current URL. In public/index.css, we’ve written a CSS selector for the class .nav-link-active that will darken the background of any element with that class name.*/}
                <NavLink
                  to={`/${type._links.self.href.split('/').pop()}`}
                  key={type.name}
                  className="nav-link"
                  activeClassName="nav-link-active"
                >
                  {type.name}s
                </NavLink>{' '}
              </li>
            ))
          : 'Loading...'}
      </ul>
    </nav>
  );
};

export default Navigation;
