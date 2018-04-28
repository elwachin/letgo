'use strict';

class Signup {
  /**
   * @desc Inject dependencies.
   * @param {LoginPage} loginPage
   */
  constructor(signupPage) {
    this.signupPage = signupPage;
  }

  /**
   * @desc Signup with credentials
   * @param {Object} data
   * @return {Promise}
   */
  signup(data) {
    return this.signupPage.signup(data);
  }

    /**
     * @desc Login with credentials
     * @param {Object} data
     * @return {Promise}
     */
    login (data) {
        return this.signupPage.login(data)
    }

  /**
   * @desc If customer is logged in, force logout. Otherwise, do nothing.
   * @returns {Promise}
   */
  forceLogout() {
    return this.signupPage.imLoggedIn()
      .then(loggedIn => {
        if (loggedIn) {
          return this.logout();
        } else {
          return Promise.resolve(false);
        }
      });
  }

  /**
   * @desc log out action
   * @returns {Promise}
   */
  logout() {
    return this.signupPage.logout();
  }

  loginWithWrongCredentials(data) {
    return this.signupPage.loginWithWrongCredentials(data);
  }

  /**
   * @desc Assert that the user icon in header is visible.
   * @returns {Promise}
   */
  loggedInLogo() {
    return this.signupPage.imLoggedIn().should.eventually.be.true;
  }

  /**
   * @desc Assert that the login error is visible.
   * @returns {Promise}
   */
  seeLoginError() {
    return this.signupPage.isLoginErrorDisplayed().should.eventually.be.true;
  }
}

const signup = new Signup(require('../../../../engineerTest/src/support/page-object/signup.page'));

/**
 * @alias Signup.signup
 * @memberOf browser
 * @method login
 */
browser.addCommand('signup', (data) => {
  logger.info(`Create new account email="{data.emailField}" password="{data.passwordField}"`, {
    file: __filename,
    method: 'browser.signup',
  });
  return signup.signup(data);
});

/**
 * @alias Signup.signup
 * @memberOf browser
 * @method login
 */
browser.addCommand('loginWithWrongCredentials', (data) => {
    logger.info(`login with wrong credentials`, {
        file: __filename,
        method: 'browser.loginWithWrongCredentials',
    })
    return signup.loginWithWrongCredentials(data)
})

/**
 * @alias Signup.login
 * @memberOf browser
 * @method login
 */
browser.addCommand('login', (data) => {
    logger.info(`Login  email="{data.emailField}" password="{data.passwordField}"`, {
        file: __filename,
        method: 'browser.login',
    })
    return signup.login(data)
})

/**
 * @alias Login.loggedIn
 * @memberOf browser
 * @method login
 */
browser.addCommand('loggedInLogo', () => {
  logger.info(`Check if the user icon (top right) exists in the dom`, {
    file: __filename,
    method: 'browser.loggedInLogo',
  });
  return signup.loggedInLogo();
});

/**
 * @alias Login.seeLoginError
 * @memberOf browser
 * @method loginError
 */
browser.addCommand('seeLoginError', () => {
  logger.info(`check if the error shows in the login page`, {
    file: __filename,
    method: 'browser.seeLoginError',
  });
  return signup.seeLoginError();
});

/**
 * @alias Signup.logout
 * @memberOf browser
 * @method logout
 */
browser.addCommand('forceLogout', () => {
  logger.info(`logout the user from the app`, {
    file: __filename,
    method: 'browser.forceLogout',
  });
  return signup.forceLogout();
});

module.exports = signup;
