# BibiCards

A gamified application designed to help users memorize Bible verses and passages effectively.

## Project Goal
BibiCards provides an interactive and engaging way to commit scripture to memory using various learning modes and scientific memorization techniques.

## Learning Modes
The project implements the following training modes for mastering Bible passages:

### 📚 Memorization Modes
*   **Gradual Hiding**: Read the verse, then progressively hide words (every third, every second, or all but keywords) until the entire text is hidden.
*   **First Letters**: Words are replaced by their first letters only. A highly effective mode for short passages where the user reconstructs the verse from memory using minimal cues.
*   **Memorization by Heart (Typing)**: Type the full verse. The app highlights errors, omissions, or misplacements. A "soft" mode with hints is also available.
*   **Fill in the Blanks**: Missing words are hidden within the text for the user to fill in. Difficulty can be adjusted by hiding specific parts of speech (nouns, verbs, etc.).
*   **Scrambled Fragments**: The verse is broken into phrases or keywords that the user must reassemble in the correct order.
*   **Step-by-Step Cumulative Recall**: Recall the verse line by line. After each successful line, the next one is added until the full passage is completed.
*   **Blind Reading**: The text is completely hidden. The user reveals one line or word at a time by pressing a key—ideal for final verification.

### ⚙️ System Features
*   **Spaced Repetition**: The app schedules reviews at optimal intervals (1 day, 3 days, 1 week, etc.) to ensure long-term retention.
*   **Check-up Mode**: A random quick test from your learned verses to maintain overall knowledge.
*   **Classic Modes**:
    *   **Cards**: Guess the source (book, chapter, verse) from a quote.
    *   **Multiple Choice**: Select the correct source from several options.
    *   **Book Sorting**: Arrange books in their biblical order.
    *   **Matching**: Match multiple quotes with their corresponding sources.

## Development

### Prerequisites
To contribute to the project, ensure you have the following installed:
*   `nodejs`
*   `npm`
*   `git`

### Setup
Install dependencies:
```bash
npm install
```

### Running the Project
Start the development server:
```bash
npm start
```

Launch Storybook for component development:
```bash
npm run storybook
```

### Validation
Before submitting changes, run the following checks:
```bash
npm run check:ts
npm test
```
