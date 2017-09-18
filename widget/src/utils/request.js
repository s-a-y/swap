import HttpError from './http-error';

const headers = {
  'Content-Type': 'application/json',
};

function parseResponse(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    return text;
  }
}

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = () => {
      if (xhr.status > 199 && xhr.status < 300) {
        resolve(xhr);
      } else {
        reject(xhr);
      }
    };
    xhr.onerror = () => {
      reject(xhr);
    };
    Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]));
    xhr.send(data);
  }).then(
    (xhr) => {
      const responseData = parseResponse(xhr.responseText);

      // TODO: Think about status code
      if (Object.prototype.hasOwnProperty.call(responseData, 'errors')) {
        throw new HttpError(xhr.status, responseData);
      }

      return {
        status: xhr.status,
        data: responseData,
      };
    },
    (xhr) => {
      throw new HttpError(xhr.status);
    },
  );
}

export default {
  get(url) {
    return request('GET', url);
  },
};
