import React from 'react';

interface Props {
  state: {
    page: number;
  };
  setState: Function;
  pageCount: number;
}

const TablePaginationShort = ({ state, setState, pageCount }: Props) => (
  <ul className="pagination-list">
    {Array.from(new Array(pageCount)).map((_, index) => (
      <li key={index}>
        <button
          className={`button pagination-link${
            index + 1 === state.page ? ' is-current' : ''
          }`}
          onClick={() => setState({ page: index + 1 })}
        >
          {index + 1}
        </button>
      </li>
    ))}
  </ul>
);

export default TablePaginationShort;
