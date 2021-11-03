import { css } from "@linaria/core";
import React from "react";
import { useSelectCells } from "../contexts/SelectedCellsContext";
import { Values } from "./Values";

export const ValuesContainer: React.FC = () => {
  const { selectedCells } = useSelectCells();

  return (
    <div className={styles.container}>
      {selectedCells.length > 0 ? (
        <Values
          rowId={selectedCells[0].rowId}
          columnId={selectedCells[0].columnId}
        />
      ) : (
        <div>Select a cell</div>
      )}
    </div>
  );
};

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
  `,
  valueBox: css`
    width: 100px;
    height: 64px;
    border-radius: 8px;
    background-color: var(--color);
    margin: 8px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  `,
  newValueText: css`
    font-style: italic;
    font-size: 0.8em;
  `,
};
