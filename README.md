# Beto

> Lightweight, fast and flexible text parser

Meant to make the process of text parsing easy and simple as shit.
Beto will be a standalone package with 0 dependencies.

## Getting Started:

```bash
npm install beto
```

## Quick Start

You can get started without initializing the parser generator by using `betoQuickParse()`

```typescript
const result = betoQuickParse('due 10-09-2005', {
    rules: ['due -> due $date', 'due -> due on $date'],
});
```

> [!NOTE]
> `betoQuickParse()` will compute the rules every time you run it, the recommended approach is to initialize the parser config before you begin parsing text.

## Recommended Usage

```typescript
betoIntialize(
    rules: [
        'due -> due $date',
        'due -> due on $date'
    ]
);

const result = betoParse('due 10-09-2005');
```
