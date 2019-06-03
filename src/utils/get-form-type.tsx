import React, { useRef } from 'react';
import { FaUpload } from 'react-icons/fa';

import schema, { dataTpl } from '../config/schema/schema';
import awsExports from '../config/aws/aws-exports';
import SelectMultiple from '../components/select-multiple';

const onChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  uploadDiv: HTMLDivElement | null,
) => {
  if (e.currentTarget.files && e.currentTarget.files[0] && uploadDiv) {
    uploadDiv.innerHTML = e.currentTarget.files[0].name;
  }
};

const upload = (key: string, value: Input, defaultValue: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const uploadDiv = useRef<HTMLDivElement>(null);
  return (
    <div className="field" key={key}>
      <label className="label" htmlFor={key}>
        <span>{value.label}</span>
        <span className="has-text-danger">{value.required ? ' *' : ''}</span>
      </label>
      <div className="control">
        <div className="file has-name is-fullwidth">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name={key}
              required={defaultValue ? false : value.required}
              aria-required={value.required}
              onChange={e => onChange(e, uploadDiv.current)}
            />
            <span className="file-cta">
              <span className="file-icon">
                <FaUpload />
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
            <span className="file-name" ref={uploadDiv}>
              {defaultValue ? (
                <a href={awsExports.AWSS3.url + defaultValue}>
                  {defaultValue.substring(8)}
                </a>
              ) : (
                'No file chosen'
              )}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

const input = (key: string, value: Input, defaultValue: string) => (
  <div className="field" key={key}>
    <label className="label" htmlFor={key}>
      <span>{value.label}</span>
      <span className="has-text-danger">{value.required ? ' *' : ''}</span>
    </label>
    <div className="control">
      <input
        className="input"
        type="text"
        name={key}
        id={key}
        placeholder={value.label}
        required={value.required}
        aria-required={value.required}
        defaultValue={defaultValue}
      />
    </div>
  </div>
);

export const selectOne = (key: string, value: Select, defaultValue: string) => (
  <div className="field" key={key}>
    <label className="label" htmlFor={key}>
      <span>{value.label}</span>
      <span className="has-text-danger">{value.required ? ' *' : ''}</span>
    </label>
    <div className="control">
      <div className="select is-fullwidth">
        <select
          required={value.required}
          aria-required={value.required}
          name={key}
          id={key}
          defaultValue={defaultValue}
        >
          <option value="" disabled>
            Select one
          </option>
          {Object.entries(value.options).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

const selectMultiple = (key: string, value: Select, defaultValue: string[]) => (
  <div className="field" key={key}>
    <label className="label" htmlFor={key}>
      <span>{value.label}</span>
      <span className="has-text-danger">{value.required ? ' *' : ''}</span>
    </label>
    <div className="control">
      <SelectMultiple name={key} value={value} defaultValue={defaultValue} />
    </div>
  </div>
);

const selectMultipleGrouped = (
  key: string,
  value: SelectGrouped,
  defaultValue: string[],
) => (
  <div className="field" key={key}>
    <label className="label" htmlFor={key}>
      <span>{value.label}</span>
      <span className="has-text-danger">{value.required ? ' *' : ''}</span>
    </label>
    <div className="control">
      <SelectMultiple name={key} value={value} defaultValue={defaultValue} />
    </div>
  </div>
);

const getFormType = (groupKey: string, key: string, data: Data = dataTpl) => {
  switch (groupKey) {
    case 'upload':
      return upload(key, schema.upload[key], data[key]);
    case 'input':
      return input(key, schema.input[key], data[key]);
    case 'selectOne':
      return selectOne(key, schema.selectOne[key], data[key]);
    case 'selectMultiple':
      return selectMultiple(key, schema.selectMultiple[key], data[key]);
    case 'selectMultipleGrouped':
      return selectMultipleGrouped(
        key,
        schema.selectMultipleGrouped[key],
        data[key],
      );
    default:
      return null;
  }
};

export default getFormType;
