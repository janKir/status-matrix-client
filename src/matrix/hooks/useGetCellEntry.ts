import { gql, useQuery, QueryResult } from "@apollo/client";

interface GetCellEntryData {
  cellEntryByMatrix: {
    id: string;
    value?: {
      id: string;
      name: string;
      color: string;
    };
  };
}

interface GetCellEntryVars {
  matrixId: string;
  rowId: string;
  columnId: string;
}

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

export function useGetCellEntryQuery(
  matrixId: string,
  rowId: string,
  columnId: string
): QueryResult<GetCellEntryData, GetCellEntryVars> {
  return useQuery<GetCellEntryData, GetCellEntryVars>(GET_CELL_ENTRY, {
    variables: { matrixId, rowId, columnId },
  });
}
