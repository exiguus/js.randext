/**
 * @fileOverview Array Helper Class.
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.0
 */
class ArrayHelper {
  /**
   * Remove Item from Array
   * @function ArrayHelper.removeItemFromArray
   * @param {array} array to remove a item.
   * @param {string} item to remove.
   * @return {array} the Array with removed item.
   */
  static removeItemFromArray(array, item) {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }

  /**
   * Remove Items from Array
   * @function ArrayHelper.removeItemsFromArray
   * @param {array} array to remove a item.
   * @param {array} items to remove.
   * @return {array} the Array with removed item.
   */
  static removeItemsFromArray(array, items) {
    let newArray = array;
    items.forEach((item) => {
      newArray = ArrayHelper.removeItemFromArray(newArray, item);
    });
    return newArray;
  }
}

export const removeItemFromArray = ArrayHelper.removeItemFromArray;
export const removeItemsFromArray = ArrayHelper.removeItemsFromArray;
export default ArrayHelper;
