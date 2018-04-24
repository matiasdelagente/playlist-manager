import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Playlist from './Playlist';

const App = () => (
  <Switch>
    <Route exact path='/' component={Main} />
    <Route path='/playlists/:id' component={Playlist} />
  </Switch>
)

export default App;