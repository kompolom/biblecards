# AI Agent Workflow and Rules

This file is the central entrypoint for AI agents working with the project.

## 1. Project Context and Stack
- **Architecture**: Feature-Sliced Design (FSD).
- **Stack**: React, TypeScript, Storybook.
- **Context**: Core modules and high-level descriptions are described in `README.md`.

## 2. Agent Guidelines
- Detailed **rules** and **skills** are managed in the `.agents` directory.
- Agents MUST read `.agents/README.md` to get an overview of available resources.
- Agents MUST consult and follow the specific instructions in:
  - Rules: `.agents/rules/`
  - Skills: `.agents/skills/`
- These resources ensure alignment with project standards, architectural patterns (FSD), and coding best practices.

## 3. Scope
- Keep all modifications inside repository tree; do not modify external infrastructure except when required by test setup.

## 4. Permissions
### Allowed
- Execute project code with npm scripts.
- Create and modify files.
- Run tests and type checks.

### Not allowed
- Delete files.
- Read `.env` files.
- Modify environment settings (env files, docker-compose, CI/CD configs). 
- Run deploy or release commands.
- Change database schema or perform destructive data operations (delete/update production data, drop tables).

## 5. Validation
For task completion and CI check procedure, run checks in the following order:
1. `npm run check:ts`
2. `npm test`

If the first check fails, do not proceed to the next until it is resolved.

## 6. Workflow
1. **Input**: Receive issue/task description, target branch, and target module.
2. **Context**: Read `README.md`, project module docs, and `.agents` guidelines.
3. **Implementation**: Propose a patch, create, or update files.
4. **Validation**: Run the validation steps defined in Section 5.

## 7. Communication Format
- Output should be short bullets.
- Required fields for change report:
  - **Summary**: Concise description of changes.
  - **Changed files**: List of files created or modified.
  - **Test commands results**: Outcome of validation scripts.
  - **TODOs or reviewer notes**: Follow-up actions or points for attention.

## 8. Safety and Pre-checks
- If the scope is unclear, request more information instead of guessing.
- Find and fix the root cause of problems rather than applying quick fixes.
