import React from "react";
import Nav from './Components/Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Form from "./Components/Form";
import Home from "./Components/Home";


const App = () => {
  return (
    <BrowserRouter>
      <Nav />
        <Switch>
          <Route path="/pizza" render={() => <Form />} />
          <Route path="/" render={() => <Home /> } />
        </Switch>
    </BrowserRouter>
    
  );
};
export default App;