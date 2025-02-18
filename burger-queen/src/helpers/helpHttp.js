/* eslint-disable prefer-promise-reject-errors */
export const helpHttp = () => {
  const customFetch = (endPoint, options) => {
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || 'GET';

    options.headers = options.headers ? { ...defaultHeaders, ...options.headers } : defaultHeaders;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;
    setTimeout(() => controller.abort(), 20000);

    return fetch(endPoint, options)
      .then(async (res) => (res.ok
        ? res.json()
        : Promise.reject({
          err: true,
          message: (await res.json()).message,
          status: res.status,
          statusText: res.statusText,
        })))
      .catch((err) => err);
  };
  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = 'POST';
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = 'PUT';
    return customFetch(url, options);
  };
  const del = (url, options = {}) => {
    options.method = 'DELETE';
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
