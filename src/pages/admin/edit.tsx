import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';

import SEO from '../../components/seo';
import AdminEditForm from '../../components/admin-edit-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import { listDocuments } from '../../config/graphql/queries';
import { dataTpl } from '../../config/schema/schema';

interface Props {
  loading: boolean;
  data: {
    listDocuments: Data[];
  };
}

const componentDidMount = (setId: Function) =>
  setId(() => window.location.hash.slice(1));

const UploadPage = () => {
  const [id, setId] = useState('');
  useEffect(() => componentDidMount(setId), []);
  return (
    <div>
      <SEO title="Admin" />
      <PageHeader tab="/admin" />
      <section className="section">
        <div className="container is-tablet">
          <Query query={listDocuments}>
            {({ loading, data: { listDocuments } }: Props) =>
              id ? (
                <AdminEditForm
                  data={listDocuments.find(d => d.id === id) || dataTpl}
                  loading={loading}
                />
              ) : null
            }
          </Query>
        </div>
      </section>
      <PageFooter />
    </div>
  );
};

export default UploadPage;
