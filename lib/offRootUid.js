// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

function moveOffRootUid() {
  if (process.env.SUDO_UID) {
    const uid = parseInt(process.env.SUDO_UID, 10);
    if (uid !== 0) {
      process.setuid(uid);
      return uid;
    }
  }

  return process.getuid();
}

module.exports = moveOffRootUid;
