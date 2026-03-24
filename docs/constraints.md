## Constraints

### Data Constraints
- Quick thoughts: max 500 characters
- Prevent adding duplicate books (same title + author)

#### Quick thoughts placeholder example
- "What stood out? Favorite moment, vibe, or quick takeaway..."


### UX Constraints
- Show character counter for quick thoughts input
- Confirm before deleting a book
- Show progress (e.g., “5 / 12 books read”)

- When user reaches the maximum limit (100 books), trigger a prompt instead of disabling the "Add Book" button

#### Limit Reached Prompt
- Title: "Book limit reached"
- Description: "You’ve reached the maximum of 100 books for your list."
- Action: close button to dismiss the prompt

### State & Logic Constraints
- Status can be changed freely (no forced order)
- Goal cannot be lower than number of added books
- Prevent empty submissions

### Performance Constraints
- Support up to 100 books without UI lag

### Accessibility Constraints
- All inputs must have labels
- Support keyboard navigation
- Ensure sufficient color contrast