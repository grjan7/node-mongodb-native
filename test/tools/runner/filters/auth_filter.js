'use strict';

/**
 * Filter for authorization enabled or disabled on the server
 *
 * example:
 * metadata: {
 *    requires: {
 *      auth: 'enabled' | 'disabled'
 *    }
 * }
 */
class AuthFilter {
  constructor() {
    this.isAuthEnabled = process.env.AUTH === 'auth';
  }

  filter(test) {
    if (!test.metadata) return true;
    if (!test.metadata.requires) return true;
    const auth = test.metadata.requires.auth;

    if (auth === 'enabled') {
      return this.isAuthEnabled;
    } else if (auth === 'disabled') {
      return !this.isAuthEnabled;
    }

    // defaults to 'disabled' because it's gotta default to something.
    return false;
  }
}

module.exports = AuthFilter;