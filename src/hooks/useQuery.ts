import {useQuery as useReactQuery} from '@tanstack/react-query';
import http from '../util/http'


// generate querykey from url path
const generateQueryKey = (path: string) => path.split('/');

type queryPathTypes = string;

export const useQuery = (path: queryPathTypes) => {
  const queryUrl = path;
//   const queryUrl = path.includes(':userId') ? path.replace(':userId', id + '') : path;
  const queryKey = generateQueryKey(queryUrl);
  const {isLoading, error, data} = useReactQuery(queryKey, () =>
    http.get(queryUrl),
  );
  console.log("query - data?.data", data?.data)
  if (data?.data?.status === '200') {
    return {isLoading, error, data: data?.data?.data};
  }

  return {
    isLoading,
    error: data?.data?.error?.message || 'server error, try again',
    data: null,
  };
};