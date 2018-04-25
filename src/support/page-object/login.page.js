'use strict';

/**
 * @classdesc Object that represents Login page
 */
class LoginPage {
  get pageElements() {
    return {
        loginButton: '#login-button',
        loginForm: 'h2',
        loginError: 'div.alert-danger',
        imLoggedInLabel: '#crm',
        logoutButton: 'ul span',
        emailField: '#username',
        passwordField: '#password',
        accessButton: `button[data-test='login']`,
        registerButton: 'button.Auth__first-btn___3f0Am',

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
      .click(this.pageElements.loginButton)
      .waitForVisible(this.pageElements.crm);
  }

  /**
   * @desc Login with wrong credentials
   * @param {Object} data
   * @return {Promise}
   */
  loginWithWrongCredentials(data) {
    return browser
      .fillInForm(this.pageElements, data)
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
    return browser.click(this.pageElements.imLoggedInLabel).waitForVisible(this.pageElements.logoutButton).click(this.pageElements.logoutButton);
  }

  /**
   * @desc Returns true if login form is displayed.
   * @return {Promise}
   */
  isLoginFormDisplayed() {
    return browser.isExisting(this.pageElements.loginForm);
  }

  /**
   * @desc Returns true if login error is displayed.
   * @return {Promise}
   */
  isLoginErrorDisplayed() {
    return browser.isExisting(this.pageElements.loginError);
  }

}

module.exports = new LoginPage();
