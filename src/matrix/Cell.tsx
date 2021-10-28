import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_CELL_ENTRY = gql`
  query GetCellEntry($matrixId: ID!, $rowId: ID!, $columnId: ID!) {
    cellEntryByMatrix(matrixId: $matrixId, rowId: $rowId, columnId: $columnId) {
      id
      value {
        id
        name
        color
      }
    }
  }
`;

export interface CellProps {
  rowId: string;
  columnId: string;
}

export const Cell: React.FC<CellProps> = ({ rowId, columnId }) => {
  const { id: matrixId } = useParams();
  const { loading, error, data } = useQuery(GET_CELL_ENTRY, {
    variables: { matrixId, rowId, columnId },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data.cellEntryByMatrix) return <div>_</div>;

  const { name, color } = data.cellEntryByMatrix.value;

  return <div style={{ backgroundColor: color }}>{name}</div>;
};
