const getReduxComponentRef = (ref, methodName) => {
  if (!ref) {
    return;
  }
  let element = ref;
  let watchDog = 10;
  while (element._reactInternalFiber && watchDog > 0) {
    if (element[methodName]) {
      return element;
    }
    element = element._reactInternalFiber.child && element._reactInternalFiber.child.stateNode;
    watchDog--;
  }
  return;
};

class EnhancedArray {
  _array = {};
  _currentIndex = 0;

  constructor(values) {
    if (values) {
      values.forEach(value => {
        this.push(value);
      });
    }
  }

  push = value => {
    this._array[this._currentIndex] = value;
    this._currentIndex += 1;
  };
  remove = index => {
    delete this._array[index];
  };
  removeByNormalizedIndex = normalizedIndex => {
    const index = Object.keys(this._array)[normalizedIndex];
    this.remove(index);
  };
  set = (index, value) => {
    this._array[index] = value;
  };
  get = index => this._array[index];
  toArray = () => {
    const ret = Object.values(this._array);
    return ret;
  };
  getByNormalizedIndex = index => this.toArray()[index];
  clone = () => {
    const clonedArray = new EnhancedArray();
    clonedArray._array = { ...this._array };
    clonedArray._currentIndex = this._currentIndex;
    return clonedArray;
  };
  getLength = () => Object.keys(this._array).length;
  searchIndex = callback => {
    for (const key in this._array) {
      if (this._array.hasOwnProperty(key)) {
        if (callback(this._array[key])) {
          return key;
        }
      }
    }
    return null;
  };
}

export { getReduxComponentRef, EnhancedArray };
