import React from "react";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import { Matrices } from "./matrices/Matrices";
import { Matrix } from "./matrix/Matrix";

export enum AppRoutes {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Matrices = "/",
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Matrix = "/matrix/:id",
}

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoutes.Matrix}>
          <Matrix />
        </Route>
        <Route path={AppRoutes.Matrices}>
          <Matrices />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export interface AppRouteParams {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [AppRoutes.Matrices]: {};
  [AppRoutes.Matrix]: {
    id: string;
  };
}

export function useAppParams<T extends AppRoutes>(): AppRouteParams[T] {
  return useParams<AppRouteParams[T]>();
}
