Feature: Checkout Process

  As a user
  I want to be able to complete a checkout process
  So that I can purchase items from the inventory

Background:
    Given I am on the login page
    When I log in with valid credentials
    Then the inventory page should be displayed
 
  @happy-path @smoke @sortProducts
  Scenario: Successful checkout with two items sorted by lowest price
    When I sort products by "lowest price"
    Then the products should be sorted by price ascending
 
    When I add 2 items to the cart
    Then the cart badge should show 2 items
 
    When I go to the shopping cart
    Then the cart page should be displayed
    And the cart should contain the items I added
    And the cart should have 2 items
 
    When I proceed to checkout
    Then the checkout information page should be displayed
 
    When I fill in the checkout information
    And I continue to the checkout overview
    Then the checkout overview page should be displayed
    And the overview should contain the items I selected
    And the total price should be correctly calculated
 
    When I finish the checkout
    Then the checkout complete page should be displayed
    And my order should be confirmed
    And the shopping cart should be reset to empty
 
  @happy-path_3_items
  Scenario: Successful checkout with three items
    When I sort products by "highest price"
    And I add 3 items to the cart
    Then the cart badge should show 3 items
 
    When I go to the shopping cart
    Then the cart should have 3 items
    And the cart should contain the items I added
 
    When I proceed to checkout
    And I fill in the checkout information
    And I continue to the checkout overview
    Then the overview should contain the items I selected
    And the total price should be correctly calculated
 
    When I finish the checkout
    Then the checkout complete page should be displayed
    And my order should be confirmed
    And the shopping cart should be reset to empty