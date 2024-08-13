class Store {
  constructor() {
    this._ratings = [1, 2, 3, 4, 5];
    this._currentRating = null;
  }

  get ratings() {
    return this._ratings;
  }

  get currentRating() {
    return this._currentRating;
  }

  set currentRating(value) {
    this._currentRating = value;
  }
}

const store = new Store();
export default store;
