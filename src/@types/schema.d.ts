interface StringLookup {
  [key: string]: string;
}

interface Input {
  label: string;
  required: boolean;
}

interface Select extends Input {
  options: {
    [key: string]: string;
  };
}

interface SelectGrouped extends Input {
  options: {
    [key: string]: {
      [key: string]: string;
    };
  };
  submit: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

interface Schema {
  upload: {
    [key: string]: Input;
  };
  input: {
    [key: string]: Input;
  };
  selectOne: {
    [key: string]: Select;
  };
  selectMultiple: {
    [key: string]: Select;
  };
  selectMultipleGrouped: {
    [key: string]: SelectGrouped;
  };
  [key: string]: {
    [key: string]: Input | Select | SelectGrouped;
  };
}

interface SchemaHidden {
  [key: string]: string | string[];
}
