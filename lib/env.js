// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const mine = {
  isProd: () => process.env.NODE_ENV === 'production'
};

module.exports = {
  name: mine.isProd() ? 'production' : 'dev',
  isProd: mine.isProd
};
