import React from 'react';

import TablePaginationShort from './table-pagination-short';
import TablePaginationLong from './table-pagination-long';

interface Props {
  state: {
    page: number;
  };
  setState: Function;
  pageCount: number;
}

const SHORT_LIST_PAGE_COUNT = 6;

const TablePagination = ({ state, setState, pageCount }: Props) => (
  <nav className="pagination is-rounded is-centered" role="navigation">
    <button
      className="button pagination-previous"
      disabled={state.page === 1}
      onClick={() => setState({ page: state.page - 1 })}
    >
      Previous
    </button>
    <button
      className="button pagination-next"
      disabled={state.page === pageCount}
      onClick={() => setState({ page: state.page + 1 })}
    >
      Next page
    </button>
    {pageCount <= SHORT_LIST_PAGE_COUNT ? (
      <TablePaginationShort
        state={state}
        setState={setState}
        pageCount={pageCount}
      />
    ) : (
      <TablePaginationLong
        state={state}
        setState={setState}
        pageCount={pageCount}
      />
    )}
  </nav>
);

export default TablePagination;
