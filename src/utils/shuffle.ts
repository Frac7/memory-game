interface Array<T> {
  shuffle: () => Array<T>;
}

Array.prototype.shuffle = function () {
  this.sort(() => Math.random() - 0.5);
  return this;
};
