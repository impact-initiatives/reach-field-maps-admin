import React, { useState } from 'react';

import SelectOneOption from './upload-form-select-option';

interface Props {
  field: {
    label: string;
    value: string;
    options: {
      label: string;
      value: string | number;
    };
  };
  options: string[];
  optionValues: {
    [key: string]: Set<string>;
  };
}

interface State {
  sourceField: string[];
}

const onChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setState: Function,
) => {
  e.persist();
  setState((state: State) => ({
    ...state,
    sourceField: e.target.value,
  }));
};

const SelectOne = ({ field, options, optionValues }: Props) => {
  const [state, setState] = useState({ sourceField: '' });
  return (
    <div className="field" key={field.value}>
      <label className="label" htmlFor={field.value}>
        <span>{field.label}</span>
      </label>
      <div className="control">
        <div className="select is-fullwidth">
          <select
            required={true}
            aria-required={true}
            name={field.value}
            id={field.value}
            defaultValue=""
            onChange={e => onChange(e, setState)}
          >
            <option value="" disabled>
              Select one
            </option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {field.options && state.sourceField ? (
        <div className="content">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Source Value</th>
                <th>New Value</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(optionValues[state.sourceField])
                .sort()
                .map((opt, index) => (
                  <SelectOneOption
                    key={index}
                    srcOption={opt}
                    destOption={field.options}
                  />
                ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SelectOne;
