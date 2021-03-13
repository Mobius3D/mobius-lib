// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { Types: { ObjectId } } = require('mongoose');

const objectIdTimeZero = ObjectId('000000000000000000000000');

/**
 *  Generate a mongodb ObjectId which corresponds to the supplied date & time
 *  E.g., to find docs created on or after July 4, 1976 in Collection,
 *
 *    db.Collection.find({ _id: { $ge: oidFromDateTime('1976/07/04') } });
 */

function oidFromDateTime(timestamp) {
  const ts = (typeof timestamp === 'string') ? new Date(timestamp) : timestamp;
  const hexSeconds = Math.floor(ts / 1000).toString(16);
  return ObjectId(hexSeconds + '0000000000000000'); // eslint-disable-line prefer-template
}

module.exports = {
  objectIdTimeZero,
  oidFromDateTime
};
