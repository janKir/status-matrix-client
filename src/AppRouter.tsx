import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Matrices } from "./matrices/Matrices";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/page1">
          <div>page 1</div>
        </Route>
        <Route path="/">
          <Matrices />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
