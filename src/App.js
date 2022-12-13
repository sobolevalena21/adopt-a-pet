import HomePage from './pages/home';
import SearchPage from './pages/search';
import PetDetailsPage from './pages/detail';
import PetDetailsNotFound from './pages/petDetailsNotFound';
import Navigation from './components/navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/search'> {/*Add a Route in the Switch that renders the SearchPage component we’ve imported for you. This route’s path prop should match URLs that begin with '/search'. Make sure to render this component above the HomePage component! */}
          <SearchPage />
        </Route>
        <Route path='/:type/:id'>
          <PetDetailsPage />
        </Route>
        <Route path='/pet-details-not-found'>
        <PetDetailsNotFound />
        </Route>
        <Route path='/:type?'> {/* We still want the HomePage to render even if no type is specified in the URL path, i.e 'type' should be an optional URL parameter >> add '?' at the end.*/}
          <HomePage />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
