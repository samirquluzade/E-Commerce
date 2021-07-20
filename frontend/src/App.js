/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { HomeScreen } from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
