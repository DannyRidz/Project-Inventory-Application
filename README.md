# Video Game Inventory

An inventory management application for an imaginary video games store.

## Features

- List all categories on the homepage.
- View all games in a category.
- View a game's details.
- Create, edit, and delete categories.
- Create, edit, and delete games.

## Database plan

### categories

- id: unique identifier for each category.
- name: required and unique category name.
- description: optional category description.

### games

- id: unique identifier for each game.
- title: required game title.
- description: optional game description.
- price: required price, zero or greater.
- stock_quantity: required whole-number quantity, zero or greater.
- category_id: required reference to an existing category.

## Relationships and deletion rules

- One category can contain many games.
- Each game belongs to exactly one category.
- A category cannot be deleted while it contains games.
- Games must be moved or deleted before their category can be deleted.
