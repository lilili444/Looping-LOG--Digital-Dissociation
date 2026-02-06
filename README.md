# Looping Log

**Looping Log** is a net-art installation that visualizes the psychological disintegration of the individual within a performance-driven society. 

Grounded in Ritzer's theory of "McDonaldization," the project critiques how the relentless pursuit of efficiency and calculability transforms human life into a mechanized loop, leading to a state of chronic burnout.

## Concept

The work simulates a ubiquitous digital workspace—resembling standard interfaces like Word or Email—where the user is invited to perform daily labor. However, as the user types, the system intervenes. A "Ghost Text" algorithm injects intrusive, disciplinary language into the screen, symbolizing the internalized social pressure that haunts our subconscious.

Over time, the interface begins to decay. The screen blurs and colors oversaturate, visually simulating the cognitive dissociation experienced during burnout. The website, like the exhausted mind, slowly ceases to function, trapping the user in a haze where the boundary between self and system dissolves.

## How It Works

The project is built with vanilla HTML, CSS, and JavaScript. It consists of several "pages" mimicking different digital environments (Notion, Email, ChatGPT, etc.).

### Key Features

- **Ghost Text Algorithm (`common.js`)**: 
  - The system monitors user input.
  - A rule-based engine matches keywords (e.g., "tired", "rest", "fail") to disciplinary responses (e.g., "Winners push through", "Rest is a luxury").
  - If no keyword is matched, generic "motivational" commands are triggered.
  - These messages are automatically "typed" into the existing text on the page, disrupting the user's original content.

- **Visual Decay**:
  - As the user interacts more with the system (measured by input count), the interface progressively deteriorates.
  - CSS filters (`blur`, `saturate`, `contrast`, `hue-rotate`) are applied dynamically to the body and background.
  - The more you work, the more distorted the world becomes, simulating the visual and cognitive effects of burnout.

- **Disciplinary Language Generation Engine (Rule Engine)**
  - `rules`: Defines mappings from keywords to arrays of disciplinary responses.
  - `processInput()`: Converts user input to lowercase, matches it against predefined keywords, and randomly selects a corresponding response.
  - Implements the automatic semantic-mapping mechanism and randomized response logic.

- **Preset Corpus System (Preset Ghost Messages)**
  - This array serves as the initial “ghost message” corpus.
  - It provides the default text pool used by the system when generating ghost messages.

## Getting Started

No installation or build process is required. This is a static web project.

1. Clone or download the repository.
2. Navigate to the `pages/` directory.
3. Open any of the `.html` files in your web browser (e.g., `1notion.html`, `2email.html`).
4. Type your thoughts into the input field at the bottom and press **Enter** to interact with the system.

## Project Structure

```
.
├── backgrounds/      # Background images for different interfaces
├── pages/            # HTML files representing different digital workspaces
│   ├── 1notion.html
│   ├── 2email.html
│   └── ...
├── common.js         # Core logic (Ghost Text algorithm, visual effects)
├── common.css        # Shared styles
└── README.md
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
