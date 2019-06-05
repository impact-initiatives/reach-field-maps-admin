interface State {
  loading: boolean;
}

interface Values {
  [key: string]: any;
}

const getFileJson = (file: Blob): Promise<any> =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(JSON.parse(e.target.result));
    reader.readAsText(file);
  });

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  setState: Function,
) => {
  e.preventDefault();
  setState((state: State) => ({ ...state, loading: false }));
  const values: Values = {};
  const promises = [];
  const date = new Date();
  const year = date.toISOString().slice(0, 4);
  const month = date.toISOString().slice(5, 7);
  for (const input of Array.from(e.currentTarget.elements)) {
    const { name, files } = input as HTMLFormElement;
    if (name && files && files[0]) {
      promises.push(
        getFileJson(files[0]).then(geoJson => {
          values[name] = geoJson;
        }),
      );
    } else if (name) {
      console.log(name);
    }
  }
  Promise.all(promises).then(() => {
    console.log(values);
  });
};

export default handleSubmit;
