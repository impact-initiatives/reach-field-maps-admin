import React, { useState } from 'react';
import { navigate } from 'gatsby';

import getFormType from '../utils/get-form-type';
import schema from '../config/schema/schema';
import handleSubmit from '../utils/upload-functions';

const UploadForm = () => {
  const [state, setState] = useState({ loading: false, admin: false });
  const loadingClass = state.loading ? ' is-loading' : '';
  return (
    <form onSubmit={e => handleSubmit(e, setState)}>
      {Object.keys(schema).map(groupKey =>
        Object.keys(schema[groupKey]).map(key => getFormType(groupKey, key)),
      )}
      <br />
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button className={`button is-primary is-rounded ${loadingClass}`}>
            Submit
          </button>
        </div>
        <p className="control">
          <button
            className="button is-light is-rounded"
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </p>
      </div>
    </form>
  );
};

export default UploadForm;
