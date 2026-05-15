# Rules and skills

## Available Rules

Project-specific coding standards and architectural rules for AI agents are located in the `.agents/rules/` directory.

### Rules Directory

| Rule Name | Description | Path |
| :--- | :--- | :--- |
| `call-site-honesty` | Call-Site Honesty for Logging. | `.agents/rules/call-site-honesty.md` |
| `clean-architecture-ddd` | Separate Domain Logic from Infrastructure. | `.agents/rules/clean-architecture-ddd.md` |
| `command-query-separation` | Command-Query Separation (CQS). | `.agents/rules/command-query-separation.md` |
| `domain-specific-naming` | Use Domain-Specific Names Instead of Generic Module Names. | `.agents/rules/domain-specific-naming.md` |
| `early-return-pattern` | Use Early Returns to Reduce Nesting. | `.agents/rules/early-return-pattern.md` |
| `error-handling` | Typed Error Handling with Logging. | `.agents/rules/error-handling.md` |
| `explicit-control-flow` | Explicit Control Flow and Policy-Mechanism Separation. | `.agents/rules/explicit-control-flow.md` |
| `explicit-data-flow` | Explicit Data Flow. | `.agents/rules/explicit-data-flow.md` |
| `explicit-side-effects` | Explicit Side Effects and Call-Site Transparency. | `.agents/rules/explicit-side-effects.md` |
| `principle-of-least-astonishment` | Functions Must Do Only What Their Name Promises. | `.agents/rules/principle-of-least-astonishment.md` |
| `separation-of-concerns` | Enforce Separation of Concerns Between Layers. | `.agents/rules/separation-of-concerns.md` |

**How to discover and use rules (for AI Agents):**
1. List the contents of `.agents/rules/` to see all available rules.
2. Read and follow the rules defined in the Markdown files. These rules are mandatory for code modifications in this project.

## Skills 

| Skill Name | Description | Path | Activation / Context |
| :--- | :--- | :--- | :--- |
| `fsd-expert` | Feature-Sliced Design (FSD) methodology expert. Helps design frontend architecture. | `.agents/skills/fsd-expert` | Frontend design, architecture planning, FSD layers/slices. |

**How to discover and use skills (for AI Agents):**
1. List the contents of `.agents/skills/` to see all available skills (e.g., `client-web-routing`, `cloudpayments-expert`, etc.).
2. When starting a task related to a specific domain, read the corresponding skill documentation (e.g., `SKILL.md`, `skill.md`, or `skill.json`) inside its folder.
3. Follow the step-by-step checklist, code examples, and troubleshooting guides provided in the skill file.
