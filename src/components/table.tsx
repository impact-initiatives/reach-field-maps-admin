import React, { useState } from 'react';
import { Link } from 'gatsby';

import TablePagination from './table-pagination';

interface Props {
  data: LabeledData[];
}

const PER_PAGE = 20;

const Table = ({ data }: Props) => {
  const [state, setState] = useState({ page: 1 });
  const start = PER_PAGE * (state.page - 1);
  const end = PER_PAGE + start;
  const pageData = data.slice(start, end);
  const pageCount = Math.ceil(data.length / PER_PAGE);
  return (
    <div>
      <div className="field" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <table className="table is-fullwidth is-hoverable is-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Document Type</th>
              <th>File Type</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(d => (
              <tr key={d.id}>
                <td>
                  <Link to={`/admin/edit/#${d.id}`} aria-label={d.title}>
                    {d.title}
                  </Link>
                </td>
                <td>{d.documentType.label}</td>
                <td>{d.fileType.label}</td>
                <td>
                  {new Date(d.createdAt * 1000).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </td>
                <td>
                  {new Date(d.updatedAt * 1000).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        state={state}
        setState={setState}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Table;
