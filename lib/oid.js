// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { Types: { ObjectId } } = require('mongoose');

const objectIdTimeZero = ObjectId('000000000000000000000000');

function currentHour() {
  const now = new Date();
  // Annoying that you cannot (new Date()).setMinutes().setSeconds()....
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
}

/**
 *  Generate a mongodb ObjectId which corresponds to the supplied date & time
 *  E.g., to find docs created on or after July 4, 1976 in Collection,
 *
 *    db.Collection.find({ _id: { $ge: oidFromDateTime('1976/07/04') } });
 */

function oidFromDateTime(timestamp) {
  const ts = (typeof timestamp === 'string') ? new Date(timestamp) : (timestamp ?? currentHour());
  const hexSeconds = Math.floor(ts / 1000).toString(16).padEnd(24, '0');
  return ObjectId(hexSeconds);
}

function dateTimeFromOid(objectId) {
  const oid = (typeof objectId === 'string') ? objectId : objectId.toHexString();
  return new Date(parseInt(oid.substring(0, 8), 16) * 1000);
}

function containsOid(list, oid) {
  return list.some((id) => id.equals(oid));
}

function ensure(oid) {
  return (typeof oid === 'string') ? ObjectId(oid) : oid;
}

module.exports = {
  containsOid,
  currentHour,
  dateTimeFromOid,
  ensure,
  objectIdTimeZero,
  oidFromDateTime
};
