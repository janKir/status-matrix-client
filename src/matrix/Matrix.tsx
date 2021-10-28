import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { Cell } from "./Cell";
import { SelectedCellsContextProvider } from "../contexts/SelectedCellsContext";
import { ValuesContainer } from "./ValuesContainer";

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
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MATRIX, { variables: { id } });

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { name, description, rows, columns } = data.matrix;
  return (
    <SelectedCellsContextProvider>
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              {columns.map(({ id: columnId, name }) => (
                <th key={columnId}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ id: rowId, name }) => (
              <tr key={rowId}>
                <th>{name}</th>
                {columns.map(({ id: columnId }) => (
                  <td key={columnId}>
                    <Cell rowId={rowId} columnId={columnId} />
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
