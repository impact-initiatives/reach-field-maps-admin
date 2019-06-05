import React, { useState } from 'react';

interface Props {
  srcOption: string;
  destOption: string[];
}

const SelectOne = ({ srcOption, destOption }: Props) => {
  const [state, setState] = useState({ sourceField: '' });
  return (
    <tr>
      <td>{srcOption}</td>
      <td>
        <div className="select is-fullwidth">
          <select
            required={true}
            aria-required={true}
            name={srcOption}
            id={srcOption}
            defaultValue=""
          >
            <option value="" disabled>
              Select one
            </option>
            {destOption.map(({ label, value }, index) => (
              <option key={index} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </td>
    </tr>
  );
};

export default SelectOne;
