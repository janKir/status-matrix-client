import React from "react";

interface SelectedCellsContextType {
  selectedCells: string[];
  selectCell(id: string): void;
  selectSingleCell(id: string): void;
  unselectCell(id: string): void;
  clearSelection(): void;
}

const SelectedCellsContext = React.createContext<SelectedCellsContextType>({
  selectedCells: [],
  selectCell: () => {},
  selectSingleCell: () => {},
  unselectCell: () => {},
  clearSelection: () => {},
});

export const SelectedCellsContextProvider: React.FC = ({ children }) => {
  const [selectedCells, setSelectedCells] = React.useState<string[]>([]);
  const selectCell = React.useCallback(
    (id: string) => {
      if (!selectedCells.includes(id)) {
        setSelectedCells([...selectedCells, id]);
      }
    },
    [selectedCells]
  );
  const selectSingleCell = React.useCallback((id: string) => {
    setSelectedCells([id]);
  }, []);
  const unselectCell = React.useCallback(
    (id: string) => {
      if (selectedCells.includes(id)) {
        setSelectedCells(
          selectedCells.filter((selectedId) => selectedId !== id)
        );
      }
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
      }}
    >
      {children}
    </SelectedCellsContext.Provider>
  );
};

export function useSelectCells(): SelectedCellsContextType {
  return React.useContext(SelectedCellsContext);
}
