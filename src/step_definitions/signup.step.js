const { defineSupportCode } = require('cucumber');
require('src/support/business-object/signup.bo'); // require without variable assigned

defineSupportCode(function ({ When, Then, Given }) {

    Given(/^I am a visitor$/, function () {

        return browser
            .url('/');
    });

    When(/^I signup/, function () {
        const data = require('src/support/data/signup.data');

        browser.signup(data);
        return browser.login(data);
    });


    Then(/^I should be a customer$/, function () {

        return browser.seeCRM();

    });

    When(/^I login with wrong credentials$/, function () {
        const data = require('src/support/data/wrong-login.data');

        return browser.loginWithWrongCredentials(data);
    });

    Then(/^I should see login error$/, function () {
        return browser.seeLoginError();
    });

    Then(/^I logout$/, function () {
        return browser.forceLogout();
    });
});
