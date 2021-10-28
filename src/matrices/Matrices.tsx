import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

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
              <Link to={`/matrix/${id}`}>
                {name}
                <small>{description}</small>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
