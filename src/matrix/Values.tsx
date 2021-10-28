import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { css, cx } from "@linaria/core";

import { ClickableBox } from "../common/ClickableBox";

const GET_VALUES = gql`
  query GetValues($matrixId: ID!) {
    valuesByMatrix(matrixId: $matrixId) {
      id
      name
      color
    }
  }
`;

export const Values: React.FC = () => {
  const { id: matrixId } = useParams();
  const { loading, error, data } = useQuery(GET_VALUES, {
    variables: { matrixId },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ClickableBox className={styles.valueBox}>No value</ClickableBox>
      {data.valuesByMatrix.map(({ id, name, color }) => (
        <ClickableBox
          key={id}
          className={styles.valueBox}
          backgroundColor={color}
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
