import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history'

const App = () => {
    return (
      <div className="ui container">
          <div>            
            <Router history={history}>
              <div>
                <Header />
                <Switch>
                  <Route path="/" exact component={StreamList} />
                  <Route path="/streams/new" exact component={StreamCreate} />
                  <Route path="/streams/edit/:id" exact component={StreamEdit} />
                  <Route path="/streams/delete/:id" exact component={StreamDelete} />
                  <Route path="/streams/:id" exact component={StreamShow} />
                </Switch>
              </div>              
            </Router>
          </div>
      </div>
    );
  };


  // earlier <Switch> was not there
  
// here we are using <Switch> because /streams/new and /stream/:id have same syntax
// therefore both of them will appear when stream/new is rendered
// what switch will do is it will stop at one route if it finds a match.
// therefore when rendering streams/new, when it is found it will not check for other routes
// Therefore we have to use switch always

export default App