import React, { useState } from 'react';
import { navigate } from 'gatsby';

import handleSubmit from '../utils/upload-functions';
import UploadFormFile from './upload-form-file';

const name = { label: 'Name', value: 'n' };
const settlement = {
  label: 'Settlement Size',
  value: 's',
  options: [
    { label: 'Admin 0 Capital City', value: 1 },
    { label: 'Admin 1 Capital Cities', value: 2 },
    { label: 'Admin 2 Capital Cities', value: 3 },
    { label: 'Admin 3 Capital Cities', value: 4 },
    { label: 'Admin 4 Capital Cities', value: 5 },
    { label: 'Other Settlements', value: 6 },
    { label: 'N/A', value: null },
  ],
};
const camp = {
  label: 'Type',
  value: 'c',
  options: [
    { label: 'Refugee Camp', value: 1 },
    { label: 'IDP Protection of Civilian Site', value: 2 },
    { label: 'IDP Spontaneous Settlement', value: 3 },
    { label: 'N/A', value: null },
  ],
};
const road = {
  label: 'Type',
  value: 'r',
  options: [
    { label: 'Primary', value: 1 },
    { label: 'Secondary', value: 2 },
    { label: 'Tertiary', value: 3 },
    { label: 'N/A', value: null },
  ],
};
const river = {
  label: 'Type',
  value: 'w',
  options: [
    { label: 'Primary', value: 1 },
    { label: 'Secondary', value: 2 },
    { label: 'Tertiary', value: 3 },
    { label: 'N/A', value: null },
  ],
};

const UploadForm = () => {
  const [state, setState] = useState({ loading: false });
  const loadingClass = state.loading ? ' is-loading' : '';
  return (
    <form onSubmit={e => handleSubmit(e, setState)}>
      <h4 className="title is-4">Points</h4>
      <UploadFormFile
        name="settlements"
        label="Settlements"
        fields={[name, settlement]}
      />
      <UploadFormFile name="camps" label="Camps" fields={[name, camp]} />
      <hr />
      <h4 className="title is-4">Lines</h4>
      <UploadFormFile name="roads" label="Roads" fields={[road]} />
      <UploadFormFile name="rivers" label="Rivers" fields={[river]} />
      <UploadFormFile
        name="undLine"
        label="Undetermined Boundaries"
        fields={[]}
      />
      <hr />
      <h4 className="title is-4">Polygons</h4>
      <UploadFormFile name="admin0" label="Admin 0" fields={[name]} />
      <UploadFormFile name="admin1" label="Admin 1" fields={[name]} />
      <UploadFormFile name="admin2" label="Admin 2" fields={[name]} />
      <UploadFormFile name="lakes" label="Lakes" fields={[]} />
      <UploadFormFile name="marshlands" label="Marshlands" fields={[]} />
      <UploadFormFile
        name="parks"
        label="Parks / Protected Areas"
        fields={[]}
      />
      <UploadFormFile
        name="undArea"
        label="Undetermined Boundaries"
        fields={[name]}
      />
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
