/* globals
  casper
  config
*/
/* eslint-disable require-jsdoc,  no-unused-vars, no-var */
function printTestInfo(string) {
  casper.echo('INFO: ' + string, 'INFO');
}

function printTestInfos(string) {
  casper.echo(string);
}

function getTestCaptureName(id, timestamp) {
  var unixtime = timestamp === undefined ? '' : new Date().getTime();
  return config.capture.path +
    id +
    unixtime +
    config.capture.fileEnding;
}

function getObjectCount(obj) {
  var count = 0;
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      ++count;
    }
  }
  return count;
}

function getRandomSlicedArray(array, maxLength) {
  maxLength = maxLength || 12;
  var length = array.length;
  var index = Math.floor(Math.random() * length);
  var indexStart = index;
  var indexEnd = (index + maxLength - 1 >= length) ?
    length : index + maxLength;
  return array.slice(indexStart, indexEnd);
}

function getWithCorrectType(from, to) {
  var type = typeof from;
  switch (type) {
    case 'boolean':
      to = (to === 'true') ? true : false;
      break;
    case 'number':
      to = parseInt(to);
      break;
    case 'object':
      to = sortObject(JSON.parse(to));
      break;
    default:
      to = '' + to;
  }
  return to;
}

function sortObject(obj) {
  return Object.keys(obj).sort().reduce(function(result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}
