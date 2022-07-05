import { DocumentNode, useLazyQuery, useQuery } from "@apollo/react-hooks";
import { IPosts } from "./types/Posts";

export function usePostQuery(gqlQuery: DocumentNode) {
  const [getPostList, { loading, error, data }] = useLazyQuery<IPosts>(gqlQuery);
  return { getPostList, loading, error, data };
}
