import React from 'react';
import { Column } from 'react-table';
import useGetData from '~/hooks/useGetData';
import Table from '../common/Table';
import Spinner from '../common/Spinner';
import styles from './DataTable.css';

function DataTable() {
  const { query, isDoneFetching, totalMoney } = useGetData();
  const columns: Column<Transaction>[] = React.useMemo(() => {
    return [
      {
        Header: 'Date',
        accessor: (d) => d._formatted.date,
        minWidth: 100,
      },
      {
        Header: 'Company',
        accessor: (d) => d.Company,
        minWidth: 300,
      },
      {
        Header: 'Account',
        accessor: (d) => d.Ledger,
        minWidth: 300,
      },
      {
        id: 'Currency',
        Header: totalMoney ?? 'Value',
        accessor: (d) => d._formatted?.currency,
        minWidth: 100,
      },
    ];
  }, [totalMoney]);

  if (query.isError) {
    return (
      <div className={styles.spinContainer}>
        <h1>There was an error loading your data</h1>
      </div>
    );
  }

  if (!isDoneFetching || !query.data || query.isLoading) {
    return (
      <div className={styles.spinContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.dataTableContainer}>
      <Table columns={columns} data={query.data?.custom?.flatData ?? []} />
    </div>
  );
}

export default DataTable;
