import { useGetCellEntryQuery } from "./useGetCellEntry";

export function useIsValueOfSelectedCell(
  matrixId: string,
  rowId: string,
  columnId: string
): (valueId: string | undefined) => boolean {
  const { data } = useGetCellEntryQuery(matrixId, rowId, columnId);

  return (valueId: string | undefined) =>
    data?.cellEntryByMatrix?.value?.id === valueId;
}
