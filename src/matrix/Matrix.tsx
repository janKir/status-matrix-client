import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Cell } from "./Cell";

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
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <table>
        <thead>
          <th>#</th>
          {columns.map(({ id: columnId, name }) => (
            <td key={columnId}>{name}</td>
          ))}
        </thead>
        {rows.map(({ id: rowId, name }) => (
          <tr key={rowId}>
            <th>{name}</th>
            {columns.map(({ id: columnId, name }) => (
              <td key={columnId}>
                <Cell rowId={rowId} columnId={columnId} />
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};
