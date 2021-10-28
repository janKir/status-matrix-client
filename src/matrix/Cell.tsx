import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelectCells } from "../contexts/SelectedCellsContext";
import { css } from "@linaria/core";
import { ClickableBox } from "../common/ClickableBox";

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

  const { selectedCells, selectSingleCell, unselectCell } = useSelectCells();

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { name, color } = data.cellEntryByMatrix?.value ?? {};
  const rowColCompoundId = rowId + "__" + columnId;

  const isSelected = selectedCells.includes(rowColCompoundId);

  return (
    <ClickableBox
      backgroundColor={color}
      borderColor={isSelected ? "blue" : undefined}
      onClick={() =>
        isSelected
          ? unselectCell(rowColCompoundId)
          : selectSingleCell(rowColCompoundId)
      }
    >
      {name ?? "_"}
    </ClickableBox>
  );
};

const styles = {
  container: css`
    margin: 1px;
    width: 30px;
    height: 20px;
    background-color: var(--color);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      box-shadow: 0 0 3px;
    }
  `,
  containerSelected: css`
    border: 1px solid blue;
  `,
};
