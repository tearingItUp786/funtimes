import React from 'react';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { DateService, NumberService } from '~services/locale-service';
import { getData } from '../services/axios-service';

/**
 * Had to hack the type system since react-query doesn't give a real nice way
 * of overriding the data attributes
 */
type Custom = {
  totalCount: number;
  flatData: Transaction[];
  dollarAmount: number;
};
type HackType = UseInfiniteQueryResult<ApiPayload, unknown> & {
  data: {
    custom?: Custom;
  };
};

function useGetData(): {
  isDoneFetching: boolean;
  totalMoney?: string;
  query: HackType;
} {
  const realQuery = useInfiniteQuery(
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
              let dollarAmount = acc.dollarAmount;
              return {
                totalCount: curr.totalCount,
                flatData: [
                  ...acc.flatData,
                  ...curr.transactions?.map((o) => {
                    dollarAmount += Number(o.Amount);
                    return {
                      ...o,
                      _formatted: {
                        date: DateService.getDate(o.Date),
                        currency: NumberService.getCurrencyNumber(o.Amount),
                      },
                    };
                  }),
                ],
                dollarAmount,
              };
            },
            { totalCount: 0, flatData: [], dollarAmount: 0 }
          ),
        };
      },
    }
  );
  const query = realQuery as HackType;

  React.useEffect(() => {
    if (query.data) {
      const {
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
      query?.data?.custom &&
      query?.data?.custom?.totalCount === query?.data.custom?.flatData?.length,
    totalMoney: NumberService.getCurrencyNumber(
      query?.data?.custom?.dollarAmount
    ),
  };
}

export default useGetData;
