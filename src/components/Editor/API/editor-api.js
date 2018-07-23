import { fetchData } from '../Utils/fetch';

const asynThen = res => {
  if (res.ok) {
    return true;
  } else {
    return false;
  }
};
const crossOriginForm = {
  'Content-type': 'application/x-www-form-urlencoded',
};

export const getSvg = latex => {
  return fetchData(`http://10.9.5.25:3000/svg/${encodeURI(latex)}`, {
    method: 'GET',
  })
    .then(res => (asynThen(res) ? res.text() : ''))
    .then(data => data);
};
export const getImage = (form, API) => {
  const formData = new FormData();
  formData.append('file', form);
  return fetchData(`${API}`, {
    method: 'POST',
    body: formData,
  })
    .then(res => (asynThen(res) ? res.json() : ''))
    .then(data => data);
};

export const getFormula = (svg, API) => {
  return fetchData(`${API}`, {
    headers: {
      ...crossOriginForm,
    },
    method: 'POST',
    body: `fileStr=${svg}`,
  })
    .then(res => (asynThen(res) ? res.json() : ''))
    .then(data => data);
};
