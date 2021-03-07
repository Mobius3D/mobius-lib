// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

function counter(Model, op, name, callback) {
  return Model.findAndModify(
    { _id: name },
    [],
    op,
    { new: true, upsert: true },
    (err, result) => {
      if (err) return callback(err);
      return callback(null, result.value.count);
    }
  );
}

function counters(Model) {
  return {
    incrementCounter(name, callback) {
      return counter(Model, {
        $inc: { count: 1 },
        $set: { last_modified: Date.now() }
      }, name, callback);
    },
    getCounter(name, callback) {
      return counter(Model, {
        $setOnInsert: { count: 1, last_modified: Date.now() }
      }, name, callback);
    }
  };
}

// To use, const counters = require('./counters')(Model);
module.exports = counters;
