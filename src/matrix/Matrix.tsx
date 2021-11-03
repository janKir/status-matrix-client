import React from "react";
import { gql, useQuery } from "@apollo/client";

import { Cell } from "./Cell";
import { SelectedCellsContextProvider } from "../contexts/SelectedCellsContext";
import { ValuesContainer } from "./ValuesContainer";
import { AppRoutes, useAppParams } from "../AppRouter";

interface GetMatrixData {
  matrix: {
    id: string;
    name: string;
    description: string;
    rows: Array<{
      id: string;
      name: string;
    }>;
    columns: Array<{
      id: string;
      name: string;
    }>;
  };
}

interface GetMatrixVars {
  id: string;
}

const GET_MATRIX = gql`
  query GetMatrix($id: ID!) {
    matrix(id: $id) {
      id
      name
      description
      rows {
        id
        name
      }
      columns {
        id
        name
      }
    }
  }
`;

export const Matrix: React.FC = () => {
  const { id } = useAppParams<AppRoutes.Matrix>();
  const { loading, error, data } = useQuery<GetMatrixData, GetMatrixVars>(
    GET_MATRIX,
    { variables: { id } }
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { name, description, rows, columns } = data!.matrix;
  return (
    <SelectedCellsContextProvider>
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              {columns.map(({ id: columnId, name: columnName }) => (
                <th key={columnId}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ id: rowId, name: rowName }) => (
              <tr key={rowId}>
                <th>{rowName}</th>
                {columns.map(({ id: columnId }) => (
                  <td key={columnId}>
                    <Cell matrixId={id} rowId={rowId} columnId={columnId} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <ValuesContainer />
      </div>
    </SelectedCellsContextProvider>
  );
};
