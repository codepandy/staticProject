export const fetchData = (url, option = {}) => {
  const options = {
    method: 'GET',
    ...option,
  };
  return fetch(url, options);
};
