enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

function queryStringify(data: string[]) {
  let ans = "?";
  for (let key in data) {
    ans += `${key}=${data[key]}&`;
  }
  ans = ans.substring(0, ans.length - 1);
  return ans;
}

class HTTPTransport {
  get(url, options = {}) {
    return this.request(url, { ...options, method: METHODS.GET });
  }

  post(url, options = {}) {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put(url, options = {}) {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete(url, options = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request(url, options) {
    let { data, method, headers } = options;

    if (method === METHODS.GET) {
      url += queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

function fetchWithRetry(url, options) {
  let counter = options["retries"];

  let onError = function () {
    if (counter > 0) {
      options["retries"] = counter - 1;
      delete options["method"];
      return fetchWithRetry(url, options);
    } else {
      throw new Error("...");
    }
  };

  let transport = new HTTPTransport();
  delete options["retries"];
  options["method"] = METHODS.GET;
  return transport
    .get(url, options)
    .then((res) => {
      return res;
    })
    .catch(onError);
}
