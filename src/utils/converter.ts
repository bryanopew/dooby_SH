export const arrayKeysToCamel = arr => {
  const camelArray: any = [];
  arr.map(item => {
    camelArray.push(keysToCamel(item));
  });
  return camelArray;
};

export const arrayKeysToSnake = arr => {
  const snakeArray: any = [];
  arr.map(item => {
    snakeArray.push(keysToSnake(item));
  });
  return snakeArray;
};

export const keysToCamel = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map(v => keysToCamel(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_.camelCase(key)]: keysToCamel(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const keysToSnake = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map(v => keysToSnake(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_.snakeCase(key)]: keysToSnake(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const wasFailed = (value: string) => {
  return `${value.toUpperCase()}_FAIL`;
};
