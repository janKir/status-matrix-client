import React from "react";

interface SelectedCell {
  rowId: string;
  columnId: string;
}
interface SelectedCellsContextType {
  selectedCells: SelectedCell[];
  selectCell(cell: SelectedCell): void;
  selectSingleCell(cell: SelectedCell): void;
  unselectCell(cell: SelectedCell): void;
  clearSelection(): void;
  checkIsSelected(cell: SelectedCell): boolean;
}

const SelectedCellsContext = React.createContext<SelectedCellsContextType>({
  selectedCells: [],
  selectCell: () => {},
  selectSingleCell: () => {},
  unselectCell: () => {},
  clearSelection: () => {},
  checkIsSelected: () => false,
});

export const SelectedCellsContextProvider: React.FC = ({ children }) => {
  const [selectedCells, setSelectedCells] = React.useState<SelectedCell[]>([]);

  const checkIsSelected = React.useCallback(
    (cell: SelectedCell) =>
      selectedCells.some(
        (otherCell) =>
          cell.rowId === otherCell.rowId && cell.columnId === otherCell.columnId
      ),
    [selectedCells]
  );

  const selectCell = React.useCallback(
    (cell: SelectedCell) => {
      if (!checkIsSelected(cell)) {
        setSelectedCells([...selectedCells, cell]);
      }
    },
    [checkIsSelected, selectedCells]
  );

  const selectSingleCell = React.useCallback((cell: SelectedCell) => {
    console.log("selectSingleCell", cell);
    setSelectedCells([cell]);
  }, []);

  const unselectCell = React.useCallback(
    (cell: SelectedCell) => {
      setSelectedCells(
        selectedCells.filter(
          (otherCell) =>
            cell.rowId !== otherCell.rowId &&
            cell.columnId !== otherCell.columnId
        )
      );
    },
    [selectedCells]
  );

  const clearSelection = React.useCallback(() => {
    setSelectedCells([]);
  }, []);

  return (
    <SelectedCellsContext.Provider
      value={{
        selectedCells,
        selectCell,
        selectSingleCell,
        unselectCell,
        clearSelection,
        checkIsSelected,
      }}
    >
      {children}
    </SelectedCellsContext.Provider>
  );
};

export function useSelectCells(): SelectedCellsContextType {
  return React.useContext(SelectedCellsContext);
}
