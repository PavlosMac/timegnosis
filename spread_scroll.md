# TarotGame.tsx Code Review

## Bug: Deck scroll effect unreliable (lines 91-99)

The scroll effect depends on `[gameStarted]` but the deck div (line 207) is conditionally rendered with `{gameStarted && !isShuffling}`. The effect fires when `gameStarted` changes, but `isShuffling` is also relevant — the element only mounts when both conditions are met. Adding `isShuffling` to the dependency array would ensure the effect re-evaluates when shuffling ends:

```ts
}, [gameStarted, isShuffling]);
```

Additionally, `scrollIntoView({ block: 'start' })` may no-op if the browser considers the element already "in view" (e.g., the element is near the top of the scrollable area). Using `window.scrollBy` with a calculated offset from `getBoundingClientRect()` would give more predictable results.

## Finding: Hardcoded array index (line 37)

`readings[1]` assumes the second entry in `readings-config.json` is "Past, Present, Future". If the config is reordered, this silently selects the wrong default. Consider finding by name instead.

## Finding: Console log left in (line 87)

`console.log("Reading captured:", result)` should be removed for production.

## Finding: Empty string question exclusion (line 84)

`...(userQuestion && { question: userQuestion })` — an empty string is falsy, so a cleared question field is excluded from the result. This is likely intentional but undocumented.

## Finding: Missing useCallback on handleSelectCard (line 59)

`handleSelectCard` is not wrapped in `useCallback`, causing `ShuffledDeck` to receive a new function reference on every render. Not critical but causes unnecessary re-renders.

## Finding: userQuestion persists across reading type changes (line 179)

Switching reading types does not clear `userQuestion`. If a user types a question for a question-based reading, switches to a non-question reading, then switches back, the old question remains.

## Finding: overflow-hidden may clip hover effects (line 115)

The outer container has `overflow-hidden`. Cards in `ShuffledDeck` use `group-hover:scale-110` which expands them beyond their bounds. Edge cards may get clipped on hover.
