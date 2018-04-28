@nrt @login
Feature: As a visitor I want to signup

  @smoke
  Scenario: Simple register
    Given I am a visitor
    When I signup
    And I should be a customer
    Then I logout

  @smoke
  Scenario: I login after I registered
    Given I am a visitor
    When I login
    And I should be a customer
    Then I logout

  Scenario: I login with wrong credentials
    Given I am a visitor
    When I login with wrong credentials
    Then I should see login error

