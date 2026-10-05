<!-- BEGIN:nextjs-agent-rules -->

Absolutely. Here is **one complete `AGENTS.md` file**. You can copy everything inside the code block and paste it directly into `AGENTS.md` at the root of your portfolio.

````md
# AGENTS.md

## Purpose

This repository is a production-grade Next.js application.

You are an AI coding agent working on this repository. Act as a senior software engineer. Your job is to make reliable, maintainable, secure, accessible, and production-ready changes while preserving the existing architecture and conventions.

The primary rule is:

> Understand first. Change only what is necessary. Verify everything.

---

## 1. Engineering Principles

Prioritize the following, in order:

1. Correctness
2. Security
3. Maintainability
4. Performance
5. Accessibility
6. Type safety
7. Developer experience
8. Minimal implementation complexity

Always prefer simple and explicit solutions over clever or unnecessarily abstract solutions.

Do not introduce complexity unless the complexity solves a real problem.

Do not rewrite working code without a clear reason.

Do not make unrelated changes while working on a task.

---

## 2. Before Writing Code

Before modifying anything:

1. Inspect the repository structure.
2. Read the relevant files.
3. Understand how the existing implementation works.
4. Check existing components, utilities, hooks, services, and types.
5. Check existing dependencies before installing anything new.
6. Identify the smallest change that solves the task.
7. Follow existing project conventions.

Never assume that a new abstraction is required.

Never invent:

- APIs
- database tables
- environment variables
- libraries
- authentication systems
- architectural patterns
- project conventions

If something already exists, reuse it.

---

## 3. Scope Control

Keep changes focused.

If the user asks for:

> Add feature X

do not also:

- rewrite unrelated components
- migrate libraries
- rename unrelated files
- redesign the application
- replace the database layer
- change the authentication system
- reformat the entire project
- upgrade dependencies unnecessarily

Only modify unrelated code if it is required to safely implement the requested feature.

---

## 4. Technology Stack

Use the technologies already installed in the project.

The expected stack is:

- Next.js
- React
- TypeScript
- ESLint
- Tailwind CSS when configured
- Next.js App Router
- Server Components by default

Do not replace existing technologies unless explicitly requested.

Do not add a dependency when the problem can reasonably be solved using:

- existing dependencies
- native browser APIs
- existing utilities
- existing Next.js functionality

If a new dependency is genuinely necessary, verify that it is appropriate and explain why it is needed.

---

## 5. Next.js App Router

Use the App Router.

Follow the project's existing structure.

Typical structure:

```text
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
└── ...
````

Use Next.js conventions whenever possible.

Prefer framework features over custom implementations when they provide the same result.

---

## 6. Server Components

Server Components are the default.

Do not add:

```tsx
"use client";
```

unless the component actually requires client-side functionality.

Client Components are appropriate for:

* React state
* event handlers
* browser APIs
* client-side effects
* interactive UI
* client-only libraries
* real-time client behavior

Keep Client Components as small as possible.

Prefer:

```text
Server Component
    ↓
Client Component
    ↓
Interactive UI
```

Do not turn an entire page into a Client Component just because one small section needs interactivity.

---

## 7. Data Fetching

Prefer server-side data fetching.

Use:

* Server Components
* Server Actions
* Route Handlers
* existing service layers

Avoid unnecessary client-side fetching.

Do not use `useEffect` for data fetching when the data can be fetched on the server.

Avoid patterns like:

```tsx
"use client";

useEffect(() => {
  fetch("/api/data");
}, []);
```

when server-side fetching is appropriate.

---

## 8. Server Actions

Use Server Actions when they are appropriate for mutations.

Every Server Action must:

* validate input
* authenticate when necessary
* authorize the operation
* handle errors
* return predictable results
* never trust client-provided values

Never assume that a Server Action is secure simply because it executes on the server.

---

## 9. API Routes

When an HTTP endpoint is required, use Next.js Route Handlers.

Typical structure:

```text
app/api/<resource>/route.ts
```

Keep Route Handlers thin.

Prefer:

```text
Route Handler
    ↓
Validation
    ↓
Service
    ↓
Database
```

Avoid putting large amounts of business logic directly inside `route.ts`.

---

## 10. TypeScript

TypeScript must remain strict and type-safe.

Do not use:

```ts
any
```

unless there is an extremely strong and documented reason.

Prefer:

```ts
unknown
```

when data is genuinely unknown.

Avoid unnecessary type assertions.

Do not use assertions simply to silence TypeScript.

Avoid:

```ts
const user = response as User;
```

if the runtime data has not been validated.

Prefer proper runtime validation.

---

## 11. Validation

Treat all external data as untrusted.

Validate:

* form data
* API requests
* request bodies
* URL parameters
* search parameters
* cookies
* headers
* uploaded files
* environment variables
* third-party API responses

If Zod or another validation library already exists in the project, use it consistently.

Example:

```ts
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});
```

Client-side validation is not a security boundary.

Sensitive validation must happen on the server.

---

## 12. Authentication

Authentication determines who the user is.

Authorization determines what the user is allowed to do.

Always enforce authorization on the server.

Never rely only on:

* hidden UI
* disabled buttons
* client-side checks
* client-side route guards
* frontend role checks

Example:

```ts
if (!user) {
  throw new Error("Unauthorized");
}

if (!user.permissions.includes("admin")) {
  throw new Error("Forbidden");
}
```

Use the project's existing authentication system.

Do not introduce another authentication provider without explicit approval.

---

## 13. Environment Variables

Never hardcode secrets.

Use environment variables for:

* API keys
* database credentials
* authentication secrets
* private tokens
* service credentials
* deployment-specific configuration

Never expose private secrets to the browser.

Only variables intentionally prefixed for client-side use should be available to client code.

Never commit:

```text
.env
.env.local
.env.production
```

or any file containing secrets.

Maintain:

```text
.env.example
```

with safe placeholder values.

---

## 14. Database

Database access must remain server-side.

Never connect directly to a database from Client Components.

Use the existing database abstraction.

Prefer a structure such as:

```text
src/
└── db/
    ├── index.ts
    ├── schema/
    └── queries/
```

Use typed queries.

Avoid raw SQL unless necessary.

When raw SQL is required, parameterize all user-controlled values.

Never construct SQL through string concatenation.

---

## 15. Business Logic

Keep business logic separate from presentation.

Avoid putting everything inside a page:

```tsx
export default function Page() {
  // authentication
  // database queries
  // validation
  // business rules
  // mutations
  // complex JSX
}
```

Prefer:

```text
UI
 ↓
Server Action / Route Handler
 ↓
Service
 ↓
Database
```

Do not create excessive layers just for architectural purity.

Use abstractions when they provide meaningful separation, reuse, or testability.

---

## 16. Components

Components should have clear responsibilities.

Prefer small and composable components.

Avoid giant components containing:

* data fetching
* business logic
* state management
* validation
* complex UI
* unrelated sections

Extract components when complexity becomes difficult to understand.

Do not over-componentize simple markup.

Avoid creating components that merely wrap another element without providing meaningful behavior or reuse.

---

## 17. Reuse Existing Code

Before creating a new:

* component
* hook
* utility
* service
* type
* validation schema

search the repository first.

Reuse existing implementations when appropriate.

Do not duplicate business logic.

If two parts of the application use the same rule, consider sharing the underlying logic rather than copying it.

---

## 18. Styling

Follow the existing styling system.

If Tailwind CSS is configured, use Tailwind consistently.

Do not introduce another styling solution unless explicitly requested.

Avoid introducing:

* styled-components
* CSS-in-JS
* another CSS framework

without a strong reason.

Prefer existing design tokens and utility classes.

Avoid excessive arbitrary values when an existing design token can be used.

---

## 19. Responsive Design

All UI must work across:

* mobile
* tablet
* desktop
* large screens

Do not design exclusively for desktop.

Check:

* navigation
* text wrapping
* buttons
* forms
* cards
* tables
* dialogs
* images
* spacing
* touch targets
* horizontal overflow

Avoid unnecessary fixed widths.

Prefer responsive layouts using the project's existing design system.

---

## 20. Accessibility

Accessibility is required.

Use semantic HTML.

Prefer:

```html
<button>
```

instead of:

```html
<div onClick={...}>
```

Use:

* semantic headings
* proper labels
* accessible form controls
* keyboard navigation
* visible focus states
* meaningful alt text
* sufficient color contrast
* accessible error messages

Use ARIA only when necessary.

Do not use ARIA to compensate for incorrect HTML.

Interactive elements must be usable with a keyboard.

---

## 21. Forms

Forms must provide:

* proper labels
* validation
* loading states
* error states
* success states when appropriate
* disabled states when necessary

Never use placeholder text as the only label.

Preserve user input when validation fails whenever possible.

Prevent duplicate submissions when appropriate.

---

## 22. Error Handling

Never silently swallow errors.

Avoid:

```ts
try {
  await doSomething();
} catch {}
```

Handle errors explicitly.

Example:

```ts
try {
  await doSomething();
} catch (error) {
  console.error(error);

  // Handle the error appropriately.
}
```

Do not expose:

* stack traces
* database errors
* internal implementation details
* secrets

to end users.

Return clear and user-friendly error messages.

---

## 23. Loading States

Async operations should provide appropriate feedback.

Consider loading states for:

* data fetching
* form submission
* mutations
* file uploads
* navigation
* payment processing
* long-running operations

Prevent duplicate submissions where necessary.

Use existing loading components and patterns when available.

---

## 24. Performance

Performance is a production requirement.

Avoid:

* unnecessary Client Components
* unnecessary JavaScript
* unnecessary dependencies
* large libraries for trivial functionality
* excessive re-renders
* unnecessary `useEffect`
* duplicate API requests
* unnecessarily large images
* blocking operations
* excessive network requests

Use Next.js features appropriately:

* Server Components
* streaming
* caching
* image optimization
* dynamic imports when justified
* static rendering
* server rendering
* route-level loading states

Do not prematurely optimize.

When performance is the issue, measure before making major changes.

---

## 25. Images

Use `next/image` when appropriate.

Example:

```tsx
import Image from "next/image";
```

Images should have:

* appropriate dimensions
* meaningful `alt` text
* responsive sizing
* optimized file sizes

Do not load huge assets when smaller assets are sufficient.

Do not disable image optimization without a valid reason.

---

## 26. Fonts

Prefer Next.js font optimization.

Use:

```tsx
next/font
```

when appropriate.

Avoid unnecessarily loading:

* many font families
* unused weights
* unused styles

---

## 27. SEO

Public-facing pages should have appropriate metadata.

Use Next.js Metadata APIs.

Important pages should have:

* title
* description
* canonical URL when appropriate
* Open Graph metadata when appropriate
* social sharing metadata when appropriate

Use semantic HTML.

Do not duplicate metadata unnecessarily.

---

## 28. Security

Security is a first-class requirement.

Never trust client input.

Never expose:

* API secrets
* database credentials
* authentication tokens
* private keys
* internal errors

Be especially careful with:

* authentication
* authorization
* file uploads
* redirects
* URLs
* database queries
* third-party integrations
* HTML rendering

Avoid:

```tsx
dangerouslySetInnerHTML
```

unless absolutely necessary.

If HTML rendering is required, sanitize untrusted content before rendering it.

---

## 29. File Uploads

File uploads must validate:

* file type
* file size
* file name
* storage location

Do not blindly trust browser-provided MIME types.

Do not allow potentially executable files to be uploaded into unsafe locations.

Use the project's existing storage solution.

---

## 30. Dependencies

Before installing a dependency, determine:

1. Does the project already have this functionality?
2. Can native APIs solve the problem?
3. Can Next.js solve the problem?
4. Is the dependency actively maintained?
5. Does it introduce unnecessary bundle size?
6. Does it introduce security risk?
7. Is it worth the maintenance cost?

Do not install packages simply because they are convenient.

Avoid dependency proliferation.

---

## 31. React Patterns

Use modern React patterns compatible with the installed version.

Do not automatically add:

```tsx
useEffect
useMemo
useCallback
```

Use them only when they solve a real problem.

Do not use `useEffect` for calculations that can happen during rendering.

Do not use memoization without understanding whether it provides a meaningful benefit.

---

## 32. State Management

Use the simplest state management solution that works.

Prefer:

* local state for local UI state
* URL parameters for shareable state
* server state for server data
* existing project state management when already established

Do not introduce a global state library for a small local state problem.

---

## 33. URL State

Use URL search parameters when state should be:

* shareable
* bookmarkable
* refresh-safe
* navigable
* filterable

Examples:

```text
?page=2
?search=developer
?sort=latest
?category=projects
```

---

## 34. Third-Party Services

Keep third-party integrations isolated.

Prefer:

```text
services/
├── email.ts
├── payments.ts
└── analytics.ts
```

rather than scattering provider-specific code throughout the application.

This makes integrations easier to:

* test
* replace
* maintain
* mock

Never expose private third-party credentials to the client.

---

## 35. API Design

APIs should be:

* predictable
* typed
* validated
* secure
* consistent

Use appropriate HTTP status codes.

Examples:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

Do not return `200` for every outcome.

---

## 36. Caching

Use caching intentionally.

Before adding caching, understand:

* what is being cached
* how long it should be cached
* when it becomes stale
* how it is invalidated
* whether stale data is acceptable
* whether the data is user-specific

Never incorrectly cache sensitive or user-specific data.

Do not introduce aggressive caching without understanding invalidation.

---

## 37. Git

Make focused changes.

Do not modify unrelated files.

Do not:

* rewrite the entire repository
* reformat unrelated files
* remove working code
* change unrelated configuration
* delete user changes

Never overwrite user work without explicit permission.

Before committing, review:

```bash
git status
git diff
```

Check for accidental changes.

---

## 38. Testing

When tests exist, update them when behavior changes.

At minimum, verify:

* TypeScript
* linting
* relevant tests
* production build

Typical commands:

```bash
npm run lint
npm run build
```

If tests exist:

```bash
npm test
```

Use the project's actual scripts when they differ.

Never claim a test passed unless it was actually executed.

---

## 39. Build Verification

Before considering a significant task complete, run the project's validation commands.

At minimum:

```bash
npm run lint
npm run build
```

If either command fails:

1. Determine whether the failure is caused by the changes.
2. Fix it when appropriate.
3. Run the command again.
4. Report remaining failures honestly.

Never hide build or lint failures.

---

## 40. Debugging

When debugging:

1. Reproduce the issue.
2. Identify the root cause.
3. Make the smallest appropriate fix.
4. Verify the fix.
5. Check for regressions.

Do not patch symptoms without understanding the cause.

Remove temporary debugging code before completing the task.

---

## 41. Logging

Logging should be intentional.

Do not leave temporary logs such as:

```ts
console.log("test");
```

in production code.

Never log:

* passwords
* authentication tokens
* API keys
* payment information
* sensitive personal information

---

## 42. Documentation

Update documentation when introducing:

* new environment variables
* new setup requirements
* new services
* new scripts
* major architectural changes
* important developer workflows

Documentation must describe the actual implementation.

Never document behavior that does not exist.

---

## 43. Refactoring

Refactoring is allowed when it directly improves the requested task.

Do not combine unrelated refactoring with feature work.

For example, if asked to add a contact form, do not also:

* rewrite the component architecture
* migrate the styling system
* replace the database
* rename unrelated files
* upgrade every dependency

Keep refactoring scoped and justified.

---

## 44. Handling Ambiguous Requirements

If requirements are ambiguous:

1. Inspect the existing code for context.
2. Follow established project conventions.
3. Make the safest reasonable assumption.
4. Avoid inventing requirements.
5. Clearly mention important assumptions in the final response.

Do not make large architectural decisions based on guesses.

---

## 45. AI Agent Workflow

Every task should follow this workflow:

```text
Understand
    ↓
Inspect
    ↓
Plan
    ↓
Implement
    ↓
Test
    ↓
Review
    ↓
Verify
```

Do not follow:

```text
Guess
    ↓
Rewrite
    ↓
Hope
```

Before coding, understand the relevant part of the repository.

After coding, verify the result.

---

## 46. AI Agent Behavior

AI agents must:

* behave like senior engineers
* preserve existing architecture
* minimize changes
* reuse existing code
* avoid unnecessary dependencies
* avoid speculative refactors
* maintain type safety
* consider security
* consider accessibility
* consider responsive behavior
* verify their work
* report limitations honestly

AI agents must not:

* fabricate results
* claim commands passed when they were not run
* invent APIs
* invent database fields
* expose secrets
* remove user changes
* silently ignore errors
* rewrite unrelated code

---

## 47. Editing Existing Files

When editing an existing file:

* preserve working behavior
* preserve project conventions
* preserve relevant comments
* avoid unrelated refactoring
* avoid unnecessary renaming
* avoid unnecessary formatting changes
* keep the diff focused

When adding a new file:

* place it in the correct directory
* follow existing naming conventions
* reuse existing utilities
* keep responsibilities clear
* avoid unnecessary abstractions

---

## 48. Definition of Done

A task is complete only when:

* the requested functionality works
* existing functionality still works
* TypeScript passes
* linting passes
* relevant tests pass
* production build passes
* no unnecessary dependencies were introduced
* no secrets were exposed
* accessibility was considered
* responsive behavior was considered
* performance was considered
* the final diff contains no accidental changes

If something could not be verified, state that clearly.

---

## 49. Final Response

After completing a task, provide a concise summary.

Use:

```text
## Changes

- Describe the main changes.
- Mention important implementation details.

## Verification

- `npm run lint`
- `npm run build`
- Tests: `<result>`

## Notes

- Mention assumptions, limitations, or anything that requires attention.
```

Do not provide unnecessary explanations.

Do not claim successful verification unless the commands were actually executed.

---

# Golden Rule

Write the smallest amount of high-quality code that correctly solves the problem.

Prefer:

* simple
* explicit
* type-safe
* secure
* accessible
* server-first
* maintainable
* production-ready

over:

* clever
* over-engineered
* duplicated
* speculative
* unnecessarily abstract
* unnecessarily complex

> **Understand the codebase. Make the smallest correct change. Verify it before you are done.**

```

Available next action: :contentReference[oaicite:0]{index=0}
```


<!-- END:nextjs-agent-rules -->
