import React from 'react';

import SEO from '../components/seo';
import UploadForm from '../components/upload-form';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';

const UploadPage = () => (
  <div>
    <SEO title="Upload" />
    <PageHeader tab="/upload" />
    <section className="section">
      <div className="container is-tablet">
        <UploadForm />
      </div>
    </section>
    <PageFooter />
  </div>
);

export default UploadPage;
