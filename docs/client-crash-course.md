---
title: "Client Crash Course"
description: Enough TypeScript and React to read and change Pawtograder's frontend, for people who have never written either. About fifteen minutes.
sidebar_position: 4
---

# Client Crash Course

This page exists so that not knowing React isn't a reason to be stuck on [Gradebook Column Groups](./assignments/onboarding-column-groups.md). It covers the TypeScript and React you'll actually meet in `gradebookTable.tsx`, and nothing else. It isn't a React course, and it won't make you good at React. It'll make you able to read that file and change one thing in it, which is what the assignment asks for.

If you've built a GUI in any language, most of this is renaming. There's a translation table at the end for JavaFX specifically, since a lot of you wrote one in CS 3100.

## TypeScript, in one sitting

TypeScript is JavaScript with type annotations. The annotations are erased before anything runs, so they're for you and the compiler, not for the program.

```ts
function groupName(slug: string, fallback: string): string {
  return slug.split("-")[0] || fallback;
}
```

Parameters and return types go after a colon. That's most of it. Six more things show up constantly:

**Optional properties and optional chaining.** A `?` after a property name means it might not be there. A `?.` in an expression means "stop and give me `undefined` if the left side is null."

```ts
col.sort_order ?? 0        // sort_order, unless it's null or undefined, then 0
column?.name               // name, or undefined if column itself is missing
```

`??` is not `||`. `0 || 5` is `5`, because `0` is falsy. `0 ?? 5` is `0`, because `0` is not null. In a gradebook full of zero scores that difference matters, and it's a real source of bugs.

**Generics.** Same idea as Java, same syntax:

```ts
TableController<"gradebook_columns">      // a controller over that table
Map<string, Column[]>                     // keys are strings, values are arrays
```

**Union types.** A value that can be one of several things:

```ts
let verdict: "still-real" | "not-real" | "undecidable";
```

**Interfaces and type aliases.** Both name a shape. You'll mostly read them, not write them:

```ts
type GroupedColumns = Record<string, { groupName: string; columns: Column[] }>;
```

`Record<K, V>` is an object used as a dictionary. That particular line is the shape the gradebook's grouping memo returns, and [deliverable 3](./assignments/onboarding-column-groups.md#what-you-hand-in) is about keeping it while changing where the data comes from.

**Arrow functions.** `(a, b) => a + b` is a function. When the body is an expression, it's returned. When it's a block, you need `return`.

**`as`.** A type assertion, meaning "trust me, it's this." It's an escape hatch and it's how bad data gets into a typed program quietly. Be suspicious of it in code review.

## A component is a function

A React component is a function that returns markup. The markup syntax is called JSX, and it's an expression, not a string:

```tsx
function GroupHeader({ name, count }: { name: string; count: number }) {
  return <th className="group">{name} ({count})</th>;
}
```

Three things to notice. The function takes exactly one argument, an object, and that object is conventionally destructured in the parameter list. Braces inside markup mean "evaluate this expression and render the result." And it's `className`, not `class`, because `class` is a reserved word.

You use it like a tag:

```tsx
<GroupHeader name="Exams" count={4} />
```

Attributes are arguments. Strings can go in quotes; anything else goes in braces. That's all props are: arguments to a function, spelled like HTML.

## State, effects, and memos

These three are the only React features you need for this assignment. They're all functions whose names start with `use`, which React calls *hooks*. The naming convention is load-bearing, since React finds them by name, but you don't need to care why.

**`useState`** is a field that repaints its component when it changes.

```tsx
const [collapsed, setCollapsed] = useState(false);
```

You get the current value and a function to change it. Calling `setCollapsed(true)` schedules a repaint. Assigning to `collapsed` directly does nothing, which is the most common first mistake.

**`useEffect`** runs code after rendering, and is how a component talks to anything outside itself. It takes a function and a dependency array:

```tsx
useEffect(() => {
  const { unsubscribe } = controller.getById(columnId, setColumn);
  return unsubscribe;               // cleanup, when the component goes away
}, [controller, columnId]);         // re-run only if one of these changes
```

The returned function is cleanup. React calls it when the component is removed or before re-running the effect. **If you subscribe to something and don't return an unsubscribe, you've leaked a listener**, and in a table with thousands of cells you'll notice.

The dependency array is how you say when to re-run. An empty array means once. Omitting it means every render, which is almost always a bug.

**`useMemo`** caches a computed value until its dependencies change.

```tsx
const groupedColumns = useMemo(() => buildGroups(columns), [columns]);
```

It exists because rebuilding an expensive value on every render is wasteful, and because a value that's rebuilt gets a new identity every time, which makes everything downstream think it changed. The grouping memo in `gradebookTable.tsx` is worth reading for exactly this reason: its dependency is a `JSON.stringify` of the whole column list, because there was no stable identity to depend on. That's a smell, and it's part of the argument for the assignment.

## Where things live

| Directory | What's in it |
|---|---|
| `app/` | routes. The folder path is the URL. `layout.tsx` wraps everything below it, `page.tsx` is the page itself |
| `components/` | shared UI that isn't tied to one route |
| `hooks/` | the `use*` functions that read from controllers |
| `lib/` | controllers, realtime, and other non-UI machinery. `TableController.ts` is here |
| `utils/supabase/` | the Supabase client and the generated types |

`utils/supabase/SupabaseTypes.d.ts` is generated from the database schema by `npm run client-local`. Never edit it by hand. See [Local Development](./local-dev.md) for where that fits in the migration loop.

## If you wrote a JavaFX app in CS 3100

| JavaFX | Pawtograder |
|---|---|
| `IntegerProperty`, `StringProperty` | a row held by a `TableController` |
| `label.textProperty().bind(...)` | `useState` plus a `useEffect` that subscribes |
| a ViewModel class | a hook |
| `ObservableList` and `setItems()` | `controller.list(callback)` |
| the scene graph cleaning up after a widget | nothing. You return the unsubscribe yourself |
| `FXCollections.observableArrayList(extractor)` | per-row and per-cell listeners, so one cell can repaint alone |

The last two rows are the real differences. Everything above them is the same idea with different spelling.

## What not to learn right now

You don't need the render cycle, reconciliation, `useCallback`, `useRef`, context, server components, or Suspense to do this assignment. They're all in the codebase and they all matter eventually. Reading about them now costs you an evening and won't change your migration.

You also don't need to write a component from scratch. Deliverable 3 changes where an existing function gets its input while keeping its output the same shape.

## Next

Read [`groupedColumns`](https://github.com/pawtograder/platform/blob/main/app/course/%5Bcourse_id%5D/manage/gradebook/gradebookTable.tsx#L2556-L2615) with this page open. It's about sixty lines, and once you strip the `useMemo` wrapper off it, it's plain JavaScript: split a string, walk a list, compare each item to the one before it.

Then read `hooks/useGradebook.tsx`, which is where the table gets its data. `useGradebookColumn` is twelve lines and is the `useState` plus `useEffect` pattern above, unmodified.

If something here is wrong or missing, that's a ticket, and this page is in the same repository as the rest of the course site.
