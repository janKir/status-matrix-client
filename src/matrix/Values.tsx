import React from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { css, cx } from "@linaria/core";

import { ClickableBox } from "../common/ClickableBox";
import { useIsValueOfSelectedCell } from "./hooks/useIsValueOfSelectedCell";

interface GetValuesData {
  valuesByMatrix: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

interface GetValuesVars {
  matrixId: string;
}

const GET_VALUES = gql`
  query GetValues($matrixId: ID!) {
    valuesByMatrix(matrixId: $matrixId) {
      id
      name
      color
    }
  }
`;

interface SetCellEntryData {
  setValueForCell: {
    id: string;
    value: {
      id: string;
      name: string;
      color: string;
    };
  };
}

interface SetCellEntryVars {
  matrixId: string;
  rowId: string;
  columnId: string;
  valueId?: string;
}

const SET_CELL_ENTRY = gql`
  mutation SetCellEntry(
    $matrixId: ID!
    $rowId: ID!
    $columnId: ID!
    $valueId: ID
  ) {
    setValueForCell(
      matrixId: $matrixId
      rowId: $rowId
      columnId: $columnId
      valueId: $valueId
    ) {
      id
      value {
        id
        name
        color
      }
    }
  }
`;

export interface ValuesProps {
  rowId: string;
  columnId: string;
}

export const Values: React.FC<ValuesProps> = ({ rowId, columnId }) => {
  console.log({ rowId, columnId });
  const { id: matrixId } = useParams();
  const { loading, error, data } = useQuery<GetValuesData, GetValuesVars>(
    GET_VALUES,
    {
      variables: { matrixId },
    }
  );

  const [
    setCellValue,
    { data: changeData, loading: changeLoading, error: changeError },
  ] = useMutation<SetCellEntryData, SetCellEntryVars>(SET_CELL_ENTRY, {
    refetchQueries: ["GetCellEntry"],
  });

  const setValue = (valueId?: string): unknown =>
    setCellValue({ variables: { matrixId, rowId, columnId, valueId } });

  const isValueValueOfSelectedCell = useIsValueOfSelectedCell(
    matrixId,
    rowId,
    columnId
  );

  const getBorderColor = (valueId: string | undefined): string | undefined =>
    isValueValueOfSelectedCell(valueId) ? "blue" : undefined;

  if (loading || changeLoading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ClickableBox
        className={styles.valueBox}
        onClick={() => setValue(undefined)}
        borderColor={getBorderColor(undefined)}
      >
        No value
      </ClickableBox>
      {data!.valuesByMatrix.map(({ id, name, color }) => (
        <ClickableBox
          key={id}
          className={styles.valueBox}
          backgroundColor={color}
          onClick={() => setValue(id)}
          borderColor={getBorderColor(id)}
        >
          {name}
        </ClickableBox>
      ))}
      <ClickableBox
        className={cx(styles.valueBox, styles.newValueText)}
        backgroundColor="lightgrey"
      >
        Create a new Value
      </ClickableBox>
    </>
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
