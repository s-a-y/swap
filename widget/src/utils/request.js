const headers = {
  'Content-Type': 'application/json',
};

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = () => {
      resolve(xhr);
    };
    xhr.onerror = () => {
      reject(xhr);
    };
    Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]));
    xhr.send(data);
  }).then((xhr) => {
    let responseData = xhr.responseText;

    if (xhr.responseType === 'json') {
      responseData = JSON.parse(responseData);
    }

    return {
      status: xhr.status,
      data: responseData,
    };
  });
}

export default {
  get(url) {
    return request('GET', url);
  },
};
