/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { HomeScreen } from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AllProductsScreen from "./screens/AllProductsScreen";
import FilteredProductsScreen from "./screens/FilteredProductsScreen";
import FilteredProductsPriceScreen from "./screens/FilteredProductsPriceScreen";
import FilteredProductsPriceSecondScreen from "./screens/FilteredProductsPriceSecondScreen";
import SortedProductsScreen from "./screens/SortedProductsScreen";
import SortedProductsBrandScreen from "./screens/SortedProductsBrandScreen";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/products/:category/:min&:max"
            component={FilteredProductsPriceSecondScreen}
            exact
          ></Route>
          <Route
            path="/products/:category/:min&:max/sort=:sort"
            component={SortedProductsScreen}
            exact
          ></Route>
          <Route
            path="/products/:category"
            component={AllProductsScreen}
            exact
          ></Route>
          <Route
            path="/products/:category/sort=:sort"
            component={SortedProductsScreen}
            exact
          ></Route>
          <Route
            path="/products/:category/:brand"
            component={FilteredProductsScreen}
            exact
          ></Route>
          <Route
            path="/products/:category/:brand/sort=:sort"
            component={SortedProductsBrandScreen}
            exact
          ></Route>
          <Route
            path="/products/:category/:brand/:min&:max/sort=:sort"
            component={SortedProductsBrandScreen}
            exact
          ></Route>
          <Route
            path="/products/:category/:brand/:min&:max"
            component={FilteredProductsPriceScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
