import axios from 'axios';

export const getData = async (pageNumber: number) => {
  const { data } = await axios.get<ApiPayload>(
    `https://resttest.bench.co/transactions/${pageNumber}.json`
  );

  return data;
};
