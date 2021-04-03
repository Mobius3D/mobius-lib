// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { currentHour, objectIdTimeZero, oidFromDateTime } = require('./oid');
const utils = require('./utils');

// Accumulators
let arrayStats = {};
let counterStats = {};
let globalCounterStats = {};

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

function flushStats() {
  if (utils.isEmpty(arrayStats) && utils.isEmpty(counterStats)) {
    log.debug('flushStats: No new stats to update');
    return;
  }

  log.debug('flushStats: Updating stats');

  const ops = {};
  const globalOps = {};
  let haveOps = false;
  let haveGlobalOps = false;

  if (!utils.isEmpty(arrayStats)) {
    haveOps = true;
    ops.$addToSet = arrayStats;
    arrayStats = {};
    log.debug(`flushStats: Updating ${Object.keys(ops.$addToSet).length} array-based stats`);
  }

  if (!utils.isEmpty(counterStats)) {
    haveOps = true;
    ops.$inc = counterStats;
    counterStats = {};
    log.debug(`updateStats: Updating ${Object.keys(ops.$inc).length} increment-based stats`);
  }

  if (!utils.isEmpty(globalCounterStats)) {
    haveGlobalOps = true;
    globalOps.$inc = globalCounterStats;
    globalCounterStats = {};
    log.debug(`updateStats: Updating ${Object.keys(globalOps.$inc).length} increment-based global stats`);
  }

  if (!Stats) {
    log.warn('updateStats: no-op; no Stats routine provided');
    return;
  }

  const promises = [];
  if (haveOps) {
    promises.push(Stats.updateOne(
      { _id: oidFromDateTime(currentHour()) },
      ops,
      { upsert: true, setDefaultsOnInsert: true }
    ).exec());
  }

  if (haveGlobalOps) {
    promises.push(Stats.updateOne(
      { _id: objectIdTimeZero },
      globalOps,
      { upsert: true, setDefaultsOnInsert: true }
    ).exec());
  }

  if (promises.length === 0) {
    return;
  }

  Promise.allSettled(promises)
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
  const val = val_ ?? 1;

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

    if (!(key in globalCounterStats)) {
      counterStats[key] = 1;
    } else {
      counterStats[key] += 1;
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

    if (!(key in globalCounterStats)) {
      globalCounterStats[key] = val;
    } else {
      globalCounterStats[key] += val;
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
