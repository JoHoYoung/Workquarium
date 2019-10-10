const PromiseBase = (isArray) => {
  return f => (...options) => new Promise((resolve, reject) => {
    f(...options, (error, ...res) => {
      if (error) return reject(error);
      if (isArray) {
        resolve(res);
      } else {
        resolve(res[0]);
      }
    });
  });
};
/**
 * @returns Array
 */
const toPromiseArray = PromiseBase(true);
const toPromise = PromiseBase(false);

module.exports = {
  toPromise,
  toPromiseArray,
}