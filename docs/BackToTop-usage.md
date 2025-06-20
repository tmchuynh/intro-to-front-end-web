# BackToTop Component Usage

The `BackToTop` component provides a convenient way to add "Back to Table of Contents" links throughout your MDX documents.

## Basic Usage

```jsx
import BackToTop from "@/components/BackToTop";

<BackToTop />
```

## Custom TOC ID

If your table of contents has a different ID:

```jsx
<BackToTop tocId="my-custom-toc-id" />
```

## Custom Styling

```jsx
<BackToTop className="border-t pt-4" />
```

## Examples in MDX

```mdx
import BackToTop from "@/components/BackToTop";

# My Document

<h2 id="table-of-contents">Table of Contents</h2>

- [Section 1](#section-1)
- [Section 2](#section-2)

## Section 1

Content here...

<BackToTop />

## Section 2

More content...

<BackToTop className="border-t border-gray-200 pt-4" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tocId` | `string` | `"table-of-contents"` | The ID of the table of contents element to scroll to |
| `className` | `string` | `""` | Additional CSS classes for custom styling |
