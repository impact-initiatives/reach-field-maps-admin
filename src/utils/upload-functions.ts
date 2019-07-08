import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import simplify from '@turf/simplify';
import truncate from '@turf/truncate';

interface State {
  loading: boolean;
}

interface Values {
  [key: string]: any;
}

interface ProgressCallback {
  loaded: number;
  total: number;
}

const storeGeoJson = (geoJson, name) => {
  Storage.put(`${name}.json`, JSON.stringify(geoJson), {
    contentType: 'application/json',
    customPrefix: { public: `files/${window.location.hash.substring(1)}/` },
    progressCallback({ loaded, total }: ProgressCallback) {
      console.log(`${(loaded / total) * 100}%`);
    },
  });
};

const simplifyGeoJson = geoJson => {
  const simplifiedGeoJson = simplify(geoJson, {
    tolerance: 0.00001,
    highQuality: true,
  });
  const truncatedGeoJson = truncate(simplifiedGeoJson, {
    precision: 5,
    coordinates: 2,
  });
  return truncatedGeoJson;
};

const transformGeoJson = (geoJson, transform, transformProps) => {
  if (geoJson.type === 'FeatureCollection') {
    const modifiedGeoJson = { type: geoJson.type, features: geoJson.features };
    const features = modifiedGeoJson.features.map(feature => {
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
    modifiedGeoJson.features = features;
    return modifiedGeoJson;
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
          const transformedGeoJson = transformGeoJson(
            geoJson,
            transform[name],
            transformProps[name],
          );
          const simplifiedGeoJson = simplifyGeoJson(transformedGeoJson);
          storeGeoJson(simplifiedGeoJson, name);
          values[name] = simplifiedGeoJson;
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
