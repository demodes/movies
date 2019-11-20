import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from './Search';
import Detail from './Detail';
import Favourites from './Favourites';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'

const store = createStore(reducer);

export default function App() {
    return (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Search />
                </Route>
                <Route path="/detail/:id">
                    <Detail />
                </Route>
                <Route path="/favourites">
                    <Favourites  />
                </Route>
            </Switch>
        </Router>
    </Provider>
    );
}
