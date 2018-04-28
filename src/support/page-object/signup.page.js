'use strict';

/**
 * @classdesc Object that represents Login page
 */
class SignupPage {
  get pageElements() {
    return {
        submitButton: 'button[data-test=login-email-submit]',
        loginButton: 'button[data-test=login-email]',
        loginForm: 'h2',
        loginError: 'div.Auth__snackbar___1KTq4',
        imLoggedInLabel: 'div.avatar',
        logoutButton: 'span[data-test=\'menu-logout\']',
        emailField: 'input[data-test=login-input-email]',
        passwordField: 'input[data-test=login-input-password]',
        accessButton: `button[data-test='login']`,
        registerButton: 'button.Auth__first-btn___3f0Am',
        name: 'input[name=name]',
        logoutConfirmation: 'section',
        logoutButtonConf: 'button[data-test=logout-confirm]',

      };

  }

  /**
   * @desc signup
   * @param {Object} data
   * @return {Promise}
   */
  signup(data) {
    return browser.click(this.pageElements.accessButton)
        .click(this.pageElements.registerButton)
      .fillInForm(this.pageElements, data)
        .click(this.pageElements.submitButton)
        .waitForVisible(this.pageElements.imLoggedInLabel);
  }

    /**
     * @desc Login
     * @param {Object} data
     * @return {Promise}
     */
    login (data) {
        return browser.click(this.pageElements.accessButton)
            .click(this.pageElements.loginButton)
            .fillInForm(this.pageElements, data).click(this.pageElements.submitButton)
            .waitForVisible(this.pageElements.imLoggedInLabel)
  }
  /**
   * @desc Login with wrong credentials
   * @param {Object} data
   * @return {Promise}
   */
  loginWithWrongCredentials(data) {
      return browser.click(this.pageElements.loginButton)
          .fillInForm(this.pageElements, data).click(this.pageElements.submitButton)
      .click(this.pageElements.loginButton).waitForVisible(this.pageElements.loginError);
  }

  /**
   * @desc Returns if the user is a visitor.
   * @returns {Promise}
   */
  imLoggedIn() {
    return browser.isVisible(this.pageElements.imLoggedInLabel);
  }

  /**
   * @desc logout the user
   * @returns {Promise}
   */
  logout() {
    browser.click(this.pageElements.imLoggedInLabel).waitForVisible(this.pageElements.logoutButton).click(this.pageElements.logoutButton);
    return browser.waitForVisible(this.pageElements.logoutConfirmation).click(this.pageElements.logoutButtonConf);
  }

  /**
   * @desc Returns true if login error is displayed.
   * @return {Promise}
   */
  isLoginErrorDisplayed() {
    return browser.isExisting(this.pageElements.loginError);
  }

}

module.exports = new SignupPage();
