'use strict';

class Login {
  /**
   * @desc Inject dependencies.
   * @param {LoginPage} loginPage
   */
  constructor(loginPage) {
    this.loginPage = loginPage;
  }

  /**
   * @desc Login customer with credentials
   * @param {Object} data
   * @return {Promise}
   */
  login(data) {
    return this.loginPage.login(data);
  }

  /**
   * @desc If customer is logged in, force logout. Otherwise, do nothing.
   * @returns {Promise}
   */
  forceLogout() {
    return this.loginPage.imLoggedIn()
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
    return this.loginPage.logout();
  }

  loginWithWrongCredentials(data) {
    return this.loginPage.loginWithWrongCredentials(data);
  }

  /**
   * @desc Assert that the user icon in header is visible.
   * @returns {Promise}
   */
  seeCRM() {
    return this.loginPage.isCRM().should.eventually.be.true;
  }

  /**
   * @desc Assert that the login error is visible.
   * @returns {Promise}
   */
  seeLoginError() {
    return this.loginPage.isLoginErrorDisplayed().should.eventually.be.true;
  }

  /**
   * @desc Assert that the login form is visible.
   * @returns {Promise}
   */
  seeLoginForm() {
    return this.loginPage.isLoginFormDisplayed().should.eventually.be.true;
  }
}

const login = new Login(require('../../../../engineerTest/src/support/page-object/login.page'));

/**
 * @alias Login.login
 * @memberOf browser
 * @method login
 */
browser.addCommand('login', (data) => {
  logger.info(`Login customer with credentials email="{data.emailField}" password="{data.passwordField}"`, {
    file: __filename,
    method: 'browser.login',
  });
  return login.login(data);
});

/**
 * @alias Login.seeCRM
 * @memberOf browser
 * @method login
 */
browser.addCommand('seeCRM', () => {
  logger.info(`Check if the user icon (top right) exists in the dom`, {
    file: __filename,
    method: 'browser.seeCRM',
  });
  return login.seeCRM();
});

/**
 * @alias Login.seeLoginForm
 * @memberOf browser
 * @method login
 */
browser.addCommand('seeLoginForm', () => {
  logger.info(`Check if the login form exists in the dom`, {
    file: __filename,
    method: 'browser.seeLoginForm',
  });
  return login.seeLoginForm();
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
  return login.seeLoginError();
});

/**
 * @alias Login.logout
 * @memberOf browser
 * @method logout
 */
browser.addCommand('forceLogout', () => {
  logger.info(`logout the user from the app`, {
    file: __filename,
    method: 'browser.forceLogout',
  });
  return login.forceLogout();
});

/**
 * @alias Login.logout
 * @memberOf browser
 * @method logout
 */
browser.addCommand('loginWithWrongCredentials', () => {
  logger.info(`logout the user from the app`, {
    file: __filename,
    method: 'browser.loginWithWrongCredentials',
  });
  return login.loginWithWrongCredentials();
});



module.exports = login;
