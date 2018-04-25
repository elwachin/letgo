@nrt @login
Feature: As a visitor I want to signup

  @smoke
  Scenario: Simple register
    Given I am a visitor
    When I signup
    Then I should be a customer
    Then I logout

