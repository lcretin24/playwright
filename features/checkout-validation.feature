@checkout @validation
Feature: Checkout Information Validation

Background: 
    Given I am on the login page
    When I log in with valid credentials
    Then the inventory page should be displayed

@checkout @validation
Scenario Outline: All checkout fields are required
    When I add 2 items to the cart
    And I go to the shopping cart
    And I proceed to checkout
    Then the checkout information page should be displayed
 
    When I submit checkout information with first name "<firstName>", last name "<lastName>" and zip "<zip>"
    Then I should see an error message "<errorMessage>"
 
    Examples:
      | firstName | lastName | zip   | errorMessage                       |
      |           | Doe      | 75001 | Error: First Name is required      |
      | John      |          | 75001 | Error: Last Name is required       |
      | John      | Doe      |       | Error: Postal Code is required     |
 
 