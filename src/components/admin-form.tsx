import React from 'react';

import Table from './table';

interface Props {
  loading: boolean;
  data: LabeledData[];
}

const AdminForm = ({ loading, data }: Props) => (
  <div>
    <Table data={data} />
  </div>
);

export default AdminForm;
