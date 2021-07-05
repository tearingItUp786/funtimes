import React from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { getData } from '../services/axios-service';

function useGetData() {
  const query = useInfiniteQuery(
    ['DATA'],
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.transactions.length === 0 ? undefined : lastPage.page + 1,
      select: (data) => {
        return {
          ...data,
          custom: data.pages?.reduce(
            (acc, curr) => {
              return {
                totalCount: curr.totalCount,
                flatData: [...acc.flatData, ...curr.transactions],
              };
            },
            { totalCount: 0, flatData: [] }
          ),
        };
      },
    }
  );

  React.useEffect(() => {
    if (query.data) {
      const {
        // @ts-ignore
        custom: { totalCount, flatData },
      } = query.data;
      if (flatData.length !== totalCount) {
        query.fetchNextPage();
      }
    }
  }, [query]);

  return {
    query,
    isDoneFetching:
      // @ts-ignore
      query?.data?.custom &&
      // @ts-ignore
      query?.data?.custom?.totalCount === query?.data.custom?.flatData?.length,
  };
}

export default useGetData;
