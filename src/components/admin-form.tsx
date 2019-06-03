/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FaEdit, FaClipboardCheck } from 'react-icons/fa';

import Table from './table';

interface Props {
  loading: boolean;
  data: LabeledData[];
}

const onChangeTab = (setState: Function, draft: boolean, published: boolean) =>
  setState({ draft, published });

const AdminForm = ({ loading, data }: Props) => {
  const [state, setState] = useState({ published: false, draft: true });
  const dataFiltered = state.draft
    ? data.filter(d => d.status === 'DRAFT')
    : data.filter(d => d.status === 'PUBLISHED');
  return (
    <div>
      <div className="tabs is-centered is-toggle is-toggle-rounded">
        <ul>
          <li
            className={state.draft ? 'is-active' : ''}
            onClick={() => onChangeTab(setState, true, false)}
          >
            <a>
              <span className="icon is-small">
                <FaEdit />
              </span>
              <span>Draft</span>
            </a>
          </li>
          <li
            className={state.published ? 'is-active' : ''}
            onClick={() => onChangeTab(setState, false, true)}
          >
            <a>
              <span className="icon is-small">
                <FaClipboardCheck />
              </span>
              <span>Published</span>
            </a>
          </li>
        </ul>
      </div>
      <Table data={dataFiltered} />
    </div>
  );
};

export default AdminForm;
