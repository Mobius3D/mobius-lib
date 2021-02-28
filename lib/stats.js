// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steel

'use strict';

const oidFromDateTime = require('./oid');
const utils = require('./utils');

// Accumulators
let arrayStats = {};
let counterStats = {};

const DEFAULT_PERIOD = 5 * 60 * 1000;

/**
 *  Hash table derived from schema for Stats model
 *   1. Tells us if a field name is a valid field in the Stats model
 *   2. Tells is if a field in the Stats model is an array or scalar:
 *      arrays accept ObjectId whilst scalars are incremented.
 */
const isKeyArray = {};

// Dummy logger; initialization can set to real, supplied loggers
let log = {
  debug: () => null,
  warn: () => null
};

// Dummy Stats db model; initialization can set to real db model
let Stats;

function currentHour() {
  const now = new Date();
  // Annoying that you cannot (new Date()).setMinutes().setSeconds()....
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
}

function flushStats() {
  if (utils.isEmpty(arrayStats) && utils.isEmpty(counterStats)) {
    log.debug('flushStats: No new stats to update');
    return;
  }

  log.debug('flushStats: Updating stats');

  const ops = {};
  if (!utils.isEmpty(arrayStats)) {
    ops.$addToSet = arrayStats;
    arrayStats = {};
    log.debug(`flushStats: Updating ${ops.$addToSet.length} array-based stats`);
  }

  if (!utils.isEmpty(counterStats)) {
    ops.$inc = counterStats;
    counterStats = {};
    log.debug(`updateStats: Updating ${ops.$inc.length} increment-based stats`);
  }

  if (!Stats) {
    log.warn('updateStats: no-op; no Stats routine provided');
    return;
  }

  Stats.update(
    { _id: oidFromDateTime(currentHour()) },
    ops,
    { upsert: true, setDefaultsOnInsert: true }
  ).exec()
    .then(() => {
      log.debug('updateStats: Stats update succeeded');
      return null;
    })
    .catch((err) => {
      log.warn(`updateStats: Update failed; ${err.message}`);
      return null;
    });
}

function stats(key, val_) {
  if (!key) {
    log.warn('Coding error; stats() passed an empty key name');
    return;
  }

  if (!(key in isKeyArray)) {
    log.warn(`Coding error; stats() passed an unknown key name "${key}"`);
    return;
  }

  // assume missing val_ means increment by +1
  const val = (val_ == null) ? 1 : val_;

  if (isKeyArray[key]) {
    if (typeof val !== 'object') {
      log.warn(`Coding error; stats() a non-object for "${key}"`);
      return;
    }

    if (!(key in arrayStats)) {
      arrayStats[key] = { $each: [val] };
    } else {
      arrayStats[key].$each.push(val);
    }
  } else {
    if (isNaN(val)) { // eslint-disable-line no-restricted-globals
      log.warn(`Coding error; stats() passed a non-numeric value for "${key}"`);
      return;
    }

    if (!(key in counterStats)) {
      counterStats[key] = val;
    } else {
      counterStats[key] += val;
    }
  }
}

function init(opts) {
  if (!opts) {
    return;
  }

  if (opts.log) {
    log = opts.log;
  }

  if (opts.Stats) {
    Stats = opts.Stats;
  }

  const { schema, statKeys } = opts;
  if (Array.isArray(statKeys) && schema) {
    statKeys.forEach((key) => {
      isKeyArray[key] = Array.isArray(schema[key]);
    });
  }

  const period = opts.period || DEFAULT_PERIOD;
  setInterval(flushStats, period);
}

module.exports = {
  init,
  stats,
  flushStats
};
