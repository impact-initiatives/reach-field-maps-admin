/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';

const MOBILE_REG_EXP = /Mobile|iP(hone|od|ad)|Android/i;

interface Props {
  name: string;
  value: Select | SelectGrouped;
  defaultValue?: string[];
  onChangeFunc?: Function;
  onChangeArgs?: any[];
}

interface State {
  selectedOptions: HTMLOptionElement[];
  modalActive: boolean;
  isMobile: boolean;
}

const onMouseDownOption = (
  e: React.MouseEvent<HTMLOptionElement>,
  state: State,
  setState: Function,
  selectElement: HTMLSelectElement | null,
) => {
  if (state.isMobile) return;
  e.preventDefault();
  e.persist();
  setState({ ...state, modalActive: true });
  if (selectElement) {
    const { scrollTop } = selectElement;
    if (state.modalActive) e.currentTarget.selected = !e.currentTarget.selected;
    selectElement.focus();
    setTimeout(() => {
      selectElement.scrollTop = scrollTop;
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));
    }, 0);
  }
};

const getOptionsLength = (options: Object): number =>
  Object.values(options).reduce((acc, cur) => {
    return typeof cur === 'object'
      ? acc + Object.values(cur).reduce((acc1: number) => acc1 + 1, 0)
      : acc + 1;
  }, 0);

const getOptions = (
  options: Object,
  state: State,
  setState: Function,
  selectElement: HTMLSelectElement | null,
) =>
  Object.entries(options).map(([key, value]) =>
    typeof value === 'object' ? (
      <optgroup key={key} label={key}>
        {Object.entries(value).map(([key1, value1]) => (
          <option
            key={key1}
            value={key1}
            onMouseDown={e =>
              onMouseDownOption(e, state, setState, selectElement)
            }
          >
            {value1}
          </option>
        ))}
      </optgroup>
    ) : (
      <option
        key={key}
        value={key}
        onMouseDown={e => onMouseDownOption(e, state, setState, selectElement)}
      >
        {value}
      </option>
    ),
  );

const onChangeSelect = (
  e: React.ChangeEvent<HTMLSelectElement>,
  state: State,
  setState: Function,
): void => {
  const selectedOptions = Array.from(e.currentTarget.selectedOptions);
  setState({ ...state, selectedOptions });
};

const onClickDelete = (
  e: React.MouseEvent<HTMLButtonElement>,
  option: HTMLOptionElement,
  state: State,
  setState: Function,
  selectElement: HTMLSelectElement | null,
) => {
  e.persist();
  if (selectElement) {
    for (const currentOption of Array.from(selectElement.selectedOptions)) {
      if (option === currentOption) {
        currentOption.selected = false;
        const newOptions = state.selectedOptions.filter(
          item => item !== option,
        );
        setState({ ...state, selectedOptions: newOptions });
        setTimeout(() => (selectElement.scrollTop = 0), 0);
      }
    }
  }
};

const onClickModal = (state: State, setState: Function) => {
  setState({ ...state, modalActive: false });
};

const componentDidMount = (
  setState: Function,
  selectElement: HTMLSelectElement | null,
) => {
  const isMobile = MOBILE_REG_EXP.test(navigator.userAgent);
  const selectedOptions = selectElement
    ? Array.from(selectElement.selectedOptions)
    : [];
  setState((state: State) => ({ ...state, isMobile, selectedOptions }));
};

const SelectMultiple = ({
  name,
  value,
  defaultValue,
  onChangeFunc,
  onChangeArgs,
}: Props) => {
  const initialState: State = {
    selectedOptions: [],
    modalActive: false,
    isMobile: false,
  };
  const [state, setState] = useState(initialState);
  const selectElement = useRef<HTMLSelectElement>(null);
  useEffect(() => componentDidMount(setState, selectElement.current), []);
  const optionsLength = Math.min(getOptionsLength(value.options), 12);
  const activeClass = state.modalActive ? ' is-active' : '';
  const mobileClass = state.isMobile ? ' ua-mobile' : '';
  return (
    <a className="box">
      <div className={`modal${activeClass}${mobileClass}`}>
        <div
          className="modal-background"
          onMouseDown={() => onClickModal(state, setState)}
        />
        <div className="modal-card">
          <div className="select is-multiple is-fullwidth">
            <select
              multiple
              required={value.required}
              size={optionsLength}
              name={name}
              id={name}
              ref={selectElement}
              defaultValue={defaultValue}
              onChange={e => {
                onChangeSelect(e, state, setState);
                if (onChangeFunc && onChangeArgs)
                  onChangeFunc(e.currentTarget, ...onChangeArgs);
              }}
            >
              {getOptions(
                value.options,
                state,
                setState,
                selectElement.current,
              )}
            </select>
          </div>
          <footer className="modal-card-foot">
            <button
              type="button"
              className="button is-link is-rounded"
              onClick={() => onClickModal(state, setState)}
            >
              Ok
            </button>
          </footer>
        </div>
      </div>
      {state.selectedOptions.length ? (
        <div className="field is-grouped is-grouped-multiline">
          {state.selectedOptions.map(option => (
            <div className="control" key={option.value}>
              {state.isMobile ? (
                <span className="tag is-link is-medium">{option.label}</span>
              ) : (
                <div className="tags has-addons">
                  <span className="tag is-link is-medium">{option.label}</span>
                  <button
                    className="button is-shadowless tag is-delete is-medium"
                    onClick={e => {
                      onClickDelete(
                        e,
                        option,
                        state,
                        setState,
                        selectElement.current,
                      );
                      if (onChangeFunc && onChangeArgs)
                        onChangeFunc(selectElement.current, ...onChangeArgs);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="content has-text-grey-light">Select multiple</div>
      )}
    </a>
  );
};

export default SelectMultiple;
