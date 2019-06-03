import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';

import { createDocument, updateDocument } from '../config/graphql/mutations';
import netlifyExports from '../config/netlify/netlify-exports';
import schema, { schemaHidden } from '../config/schema/schema';
import client from '../utils/aws-appsync-client';

interface Values {
  [key: string]: string | string[];
}

interface ProgressCallback {
  loaded: number;
  total: number;
}

interface State {
  loading: boolean;
  admin: boolean;
}

const createDocumentFunc = (values: Values, date: Date, setState: Function) =>
  Auth.currentAuthenticatedUser().then(user => {
    const timestamp = Math.floor(date.getTime() / 1000);
    const variables = {
      ...schemaHidden,
      ...values,
      createdAt: timestamp,
      createdBy: user.attributes.email,
      updatedAt: timestamp,
      updatedBy: user.attributes.email,
      status: 'DRAFT',
    };
    client
      .mutate({ mutation: createDocument, variables })
      .then(() => window.location.assign('/admin'))
      .catch(() => setState((state: State) => ({ ...state, loading: true })));
  });

const updateDocumentFunc = (
  values: Values,
  date: Date,
  setState: Function,
  id: string,
) =>
  Auth.currentAuthenticatedUser().then(user => {
    const timestamp = Math.floor(date.getTime() / 1000);
    const variables = {
      ...schemaHidden,
      ...values,
      id,
      updatedAt: timestamp,
      updatedBy: user.attributes.email,
    };
    client
      .mutate({ mutation: updateDocument, variables })
      .then(() =>
        fetch(netlifyExports.buildHook, { method: 'POST' }).then(() =>
          window.location.assign('/admin'),
        ),
      )
      .catch(() => setState((state: State) => ({ ...state, loading: true })));
  });

const uploadFile = (values: Values, file: File) =>
  Storage.put(`${values.file}`, file, {
    contentType: file.type,
    customPrefix: { public: 'files/' },
    progressCallback({ loaded, total }: ProgressCallback) {
      console.log(`${(loaded / total) * 100}%`);
    },
  });

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  setState: Function,
  data?: Data,
) => {
  e.preventDefault();
  setState((state: State) => ({ ...state, loading: true }));
  let file: File = {
    lastModified: 0,
    name: '',
    size: 0,
    type: '',
    slice: new Blob().slice,
  };
  const values: Values = {};
  const date = new Date();
  const year = date.toISOString().slice(0, 4);
  const month = date.toISOString().slice(5, 7);
  for (const input of Array.from(e.currentTarget.elements)) {
    const {
      name,
      value,
      multiple,
      files,
      selectedOptions,
    } = input as HTMLFormElement;
    if (name && !multiple && !files) values[name] = value;
    if (name && !multiple && files) file = files[0];
    if (name && multiple && selectedOptions) {
      const options = [];
      for (const option of selectedOptions) {
        options.push(option.value);
        if (
          schema.selectMultipleGrouped[name] &&
          schema.selectMultipleGrouped[name].submit
        ) {
          const parents =
            schema.selectMultipleGrouped[name].submit[option.value];
          for (const [parentKey, parentValue] of Object.entries(parents)) {
            const parentValues = new Set([...values[parentKey], parentValue]);
            values[parentKey] = Array.from(parentValues)
              .filter(Boolean)
              .sort();
          }
        }
      }
      const mergedValues = new Set([...values[name], ...options]);
      values[name] = Array.from(mergedValues)
        .filter(Boolean)
        .sort();
    }
  }
  if (file && data) {
    values.file = `${year}/${month}/${file.name}`;
    uploadFile(values, file).then(() =>
      updateDocumentFunc(values, date, setState, data.id),
    );
  } else if (file) {
    values.file = `${year}/${month}/${file.name}`;
    uploadFile(values, file).then(() =>
      createDocumentFunc(values, date, setState),
    );
  } else if (data) {
    values.file = data.file;
    updateDocumentFunc(values, date, setState, data.id);
  }
};

export default handleSubmit;
