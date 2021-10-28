import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Matrices } from "./matrices/Matrices";
import { Matrix } from "./matrix/Matrix";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/matrix/:id">
          <Matrix />
        </Route>
        <Route path="/">
          <Matrices />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
