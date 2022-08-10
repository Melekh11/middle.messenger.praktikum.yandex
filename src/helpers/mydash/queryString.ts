function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

type StringIndexed = Record<string, any>;

function objToStr(obj: Record<string, any>, strBefore: string): string {
  let ans = [];
  for (const key in obj) {
    if (isArrayOrObject(obj[key])) {
      if (isArray(obj[key])) {
        const q = arrayToStr(obj[key], strBefore + `[${key}]`);
        ans.push(`${q}`);
      } else {
        const q = objToStr(obj[key], strBefore + `[${key}]`);
        ans.push(`${q}`);
      }
    } else {
      ans.push(`${strBefore}[${key}]=${obj[key]}`);
    }
  }
  return ans.join("&");
}

function arrayToStr(arr: unknown[], strBefore: string): string {
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (isArrayOrObject(arr[i])) {
      if (isArray(arr[i])) {
        const q = arrayToStr(arr[i] as unknown[], strBefore + `[${i}]`);
        ans.push(`[${i}]${q}`);
      } else {
        const q = objToStr(arr[i] as object, strBefore + `[${i}]`);
        ans.push(`[${i}]${q}`);
      }
    } else {
      ans.push(`${strBefore}[${i}]=${arr[i]}`);
    }
  }
  return ans.join("&");
}

function queryStringify(data: StringIndexed): string | never {
  let ans = "";
  for (const key in data) {
    if (isArray(data[key])) {
      ans += `${arrayToStr(data[key], `${key}`)}&`;
    } else if (isPlainObject(data[key])) {
      ans += `${objToStr(data[key], `${key}`)}&`;
    } else {
      ans += `${key}=${data[key]}&`;
    }
  }
  return ans.slice(0, ans.length - 1);
}

export { queryStringify };
