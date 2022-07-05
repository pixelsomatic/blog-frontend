import { DocumentNode, useQuery } from "@apollo/react-hooks";
import { IPosts } from "./types/Posts";

export function usePostQuery(gqlQuery: DocumentNode) {
  const { loading, error, data } = useQuery<IPosts>(gqlQuery);
  return { loading, error, data };
}
