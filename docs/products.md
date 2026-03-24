# Book Reader App – Claude Instructions

## Project Overview
This is a book tracking application that helps users monitor how many books they read within a year.

Users can:
- Add books with title, author, and quick thoughts (max 500 characters)
- Track reading status: "not started" (default), "in progress", "finished"
- Set a yearly reading goal (number of books)
- View and manage their book list

---

## Core Features

### Home Screen
- Display yearly reading goal
- Allow user to set/update goal (min: 1, max: 100)
- Show progress toward the goal
- Provide button to add a new book

### Book Management
Each book includes:
- Title (required)
- Author (required)
- Review (optional, max 500 characters)
- Status:
  - Default: "not started"
  - Options: "in progress", "finished"

### Book List
- Display all books
- Show title, author, and status
- Allow:
  - Editing book details
  - Updating status
  - Deleting book

---

## Functional Rules
- Users can add between 1 and 100 books
- Review must not exceed 500 characters
- Default status is "not started"
- Goal must stay within 1–100