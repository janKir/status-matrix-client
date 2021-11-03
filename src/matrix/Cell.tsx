import React from "react";
import { useSelectCells } from "../contexts/SelectedCellsContext";
import { ClickableBox } from "../common/ClickableBox";
import { useGetCellEntryQuery } from "./hooks/useGetCellEntry";

export interface CellProps {
  matrixId: string;
  rowId: string;
  columnId: string;
}

export const Cell: React.FC<CellProps> = ({ matrixId, rowId, columnId }) => {
  const { loading, error, data } = useGetCellEntryQuery(
    matrixId,
    rowId,
    columnId
  );

  const { selectSingleCell, unselectCell, checkIsSelected } = useSelectCells();

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { name, color } = data?.cellEntryByMatrix?.value ?? {};
  console.log(data, { name, color });

  const isSelected = checkIsSelected({ rowId, columnId });

  return (
    <ClickableBox
      backgroundColor={color}
      borderColor={isSelected ? "blue" : undefined}
      onClick={() =>
        isSelected
          ? unselectCell({ rowId, columnId })
          : selectSingleCell({ rowId, columnId })
      }
    >
      {name ?? "_"}
    </ClickableBox>
  );
};
