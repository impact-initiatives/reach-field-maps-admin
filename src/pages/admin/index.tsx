import React from 'react';
import { Query } from 'react-apollo';

import SEO from '../../components/seo';
import AdminForm from '../../components/admin-form';
import PageHeader from '../../components/page-header';
import PageFooter from '../../components/page-footer';
import { listMaps } from '../../config/graphql/queries';

interface Props {
  loading: boolean;
  data: {
    listMaps: Data[];
  };
}

const sort = (a: Data, b: Data): number => b.createdAt - a.createdAt;

const AdminPage = () => (
  <div>
    <SEO title="Admin" />
    <PageHeader tab="/admin/" />
    <section className="section">
      <div className="container">
        <Query query={listMaps}>
          {({ loading, data: { listMaps } }: Props) => (
            <AdminForm
              data={listMaps ? listMaps.sort(sort) : []}
              loading={loading}
            />
          )}
        </Query>
      </div>
    </section>
    <PageFooter />
  </div>
);

export default AdminPage;
