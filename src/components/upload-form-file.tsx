import React, { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { propEach } from '@turf/meta';

import SelectOne from './upload-form-select';

type FieldOptions = {
  label: string;
  value: string | number;
};

interface Fields {
  label: string;
  value: string;
  options?: FieldOptions[];
}

interface Props {
  name: string;
  label: string;
  fields: Fields[];
  buffer?: boolean;
}

interface State {
  options: string[];
}

interface SetObject {
  [key: string]: Set<string>;
}

const getFileJson = (file: Blob) =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(JSON.parse(e.target.result));
    reader.readAsText(file);
  });

const getProps = (geoJson: GeoJSON, setState: Function) => {
  const optionsArray: string[] = [];
  propEach(geoJson, prop => {
    optionsArray.push(...Object.keys(prop));
  });
  const options = Array.from(new Set(optionsArray));
  const optionValues: SetObject = options.reduce(
    (acc, cur) => ({ ...acc, [cur]: new Set() }),
    {},
  );
  propEach(geoJson, prop => {
    Object.entries(prop).forEach(([key, value]) => {
      optionValues[key].add(value);
    });
  });
  setState((state: State) => ({ ...state, options, optionValues }));
};

const onChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  uploadDiv: HTMLDivElement | null,
  setState: Function,
) => {
  if (e.currentTarget.files && e.currentTarget.files[0] && uploadDiv) {
    uploadDiv.innerHTML = e.currentTarget.files[0].name;
    getFileJson(e.currentTarget.files[0]).then(geoJson =>
      getProps(geoJson, setState),
    );
  }
};

const UploadFormFile = ({ name, label, fields, buffer }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const uploadDiv = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ options: [], optionValues: {} });
  return (
    <div className="box field">
      <label className="label" htmlFor={name}>
        <span>{label}</span>
      </label>
      <div className="control">
        <div className="file has-name is-fullwidth">
          <label className="file-label">
            <input
              accept="application/json"
              className="file-input"
              type="file"
              name={name}
              data-buffer={buffer}
              onChange={e => onChange(e, uploadDiv.current, setState)}
            />
            <span className="file-cta">
              <span className="file-icon">
                <FaUpload />
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
            <span className="file-name" ref={uploadDiv}>
              No file chosen
            </span>
          </label>
        </div>
      </div>
      {state.options.length ? <br /> : null}
      {state.options.length
        ? fields.map(field => (
            <SelectOne
              key={field.value}
              parent={name}
              field={field}
              options={state.options}
              optionValues={state.optionValues}
            />
          ))
        : null}
    </div>
  );
};

export default UploadFormFile;
