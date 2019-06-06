import simplify from '@turf/simplify';
import truncate from '@turf/truncate';

interface State {
  loading: boolean;
}

interface Values {
  [key: string]: any;
}

const simplifyGeoJson = geoJson => {
  const truncatedGeoJson = truncate(geoJson, {
    precision: 5,
    coordinates: 2,
    mutate: true,
  });
  const simplifiedGeoJson = simplify(truncatedGeoJson, {
    tolerance: 1,
    highQuality: true,
    mutate: true,
  });
  return simplifiedGeoJson;
};

const transformGeoJson = (geoJson, transform, transformProps) => {
  if (geoJson.type === 'FeatureCollection') {
    const features = geoJson.features.map(feature => {
      const properties = Object.fromEntries(
        Object.entries(feature.properties)
          .map(([key, value]) => {
            const newKey = transform[key];
            const newValue =
              transformProps[newKey] && transformProps[newKey][value]
                ? transformProps[newKey][value]
                : value;
            if (newKey) return [newKey, newValue];
            return ['', ''];
          })
          .filter(([key, value]) => key && value),
      );
      feature.properties = properties;
      return feature;
    });
    geoJson.features = features;
    return geoJson;
  }
  return geoJson;
};

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
  const transform: Values = {};
  const transformProps: Values = {};
  const promises = [];
  const date = new Date();
  const year = date.toISOString().slice(0, 4);
  const month = date.toISOString().slice(5, 7);
  for (const input of Array.from(e.currentTarget.elements)) {
    const { name, files, value, dataset } = input as HTMLFormElement;
    if (name && files && files[0]) {
      promises.push(
        getFileJson(files[0]).then(geoJson => {
          const simplifiedGeoJson = simplifyGeoJson(geoJson);
          const transformedGeoJson = transformGeoJson(
            simplifiedGeoJson,
            transform[name],
            transformProps[name],
          );
          values[name] = transformedGeoJson;
        }),
      );
      transform[name] = {};
      transformProps[name] = {};
    } else if (name && dataset.parent && !dataset.parentProp) {
      transform[dataset.parent][value] = name;
      transformProps[dataset.parent][name] = {};
    } else if (name && dataset.parent && dataset.parentProp) {
      transformProps[dataset.parent][dataset.parentProp][name] = Number(value);
    }
  }
  Promise.all(promises).then(() => {
    console.log(values);
  });
};

export default handleSubmit;
