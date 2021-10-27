import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MATRICES = gql`
  query Matrices {
    matrices {
      id
      name
      description
    }
  }
`;

export const Matrices: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MATRICES);
  return (
    <div>
      <h1>Matrices</h1>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.matrices?.map(({ id, name, description }) => (
            <div key={id}>
              {name}
              <small>{description}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
