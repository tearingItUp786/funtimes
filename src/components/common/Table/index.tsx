import React from 'react';
import { Column } from 'react-table';
import { useTable, useFlexLayout } from 'react-table';
import styles from './Table.css';

interface OurTable<D extends object> {
  columns: Column<D>[];
  data: D[];
}

function Table<D extends object>({ columns, data }: OurTable<D>) {
  const tableInstance = useTable<D>({ columns, data }, useFlexLayout);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    // apply the table props
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={styles.headerRow}
            >
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()} className={styles.dataRow}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default Table;
