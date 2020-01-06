/**
 *
 * @param {object} obj
 * @param {array} path
 */
export const getItem = (obj, path) =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), obj);
