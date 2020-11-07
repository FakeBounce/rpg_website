export const addEmptyString = (oldArray, limit = 0, error = () => {}) => {
  if (limit > 0 && oldArray.length > limit) {
    return error;
  }
  const obj = [...oldArray];
  obj.push("");
  return obj;
};

export const removeIndex = (oldArray, index) => {
  if (oldArray.length === 1) {
    return [];
  } else {
    const obj = [];
    for (let i = 0; i < oldArray.length; i++) {
      if (i !== index) {
        obj.push(oldArray[i]);
      }
    }
    return obj;
  }
};

export const updateIndex = (oldArray, index, value) => {
  const obj = [...oldArray];
  obj[index].name = value;
  return obj;
};
