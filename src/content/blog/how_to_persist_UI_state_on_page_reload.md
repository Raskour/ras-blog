---
author: Rasmeet Kour
pubDatetime: 2025-05-14T5:15:24Z
title: How to persist UI state on page reload
postSlug: how_to_persist_UI_state_on_page_reload
featured: true
draft: false
tags:
  - react
  - useSearchParams
  - query parameters

description: This article explains how useSearchParams can be used to sync UI with URL.
---

# How to persist UI state on page reload

Recently while building a product listing page in my React app, I ran into a frustrating issue.

I had filters, pagination, and tabs working beautifully using React state. But the moment a user refreshed the page, all their selections — like the chosen category or the current page — were gone. Even worse, they couldn’t share or bookmark the page to return to the same view later.

That’s when I realized I needed to **store some UI state in the URL**.

I had something like this:

```jsx
const [category, setCategory] = useState("All");
```

This worked... until:

- The user refreshed the page.
- Or shared the link with someone else.
- Or used the browser’s back button.

In all those cases, React state reset, and the user had to re-select their filters.

---

## The Solution: Sync State with the URL

To fix this, I used the `useSearchParams` hook from React Router.

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const category = searchParams.get("category") || "All";
```

The `useSearchParams` hook returns an array with two elements:

- The current search parameters
- A function to update the search parameters

The `.get()` method reads the current value of a query parameter — in this case, `category` — directly from the URL.

For example, if the URL is:

```
/products?category=outdoor
```

Then:

```jsx
searchParams.get("category"); // returns "outdoor"
```

This allows you to **access state from the URL**, just like you'd read from React state — but it's now **persistent**, even across page refreshes or direct links.

---

## Updating the URL with `setSearchParams`

When I want to update the query parameters, I use `setSearchParams()`:

```jsx
setSearchParams({ category: "indoor" });
```

It updates the URL to:

```
/products?category=indoor
```

But here’s the best part:

- It doesn’t reload the page.
- It updates the component like React state would.
- If someone refreshes the page, that `category` value is still in the URL.

It's like using `useState`, but with **persistent, shareable state**.

---

## Managing Multiple Query Parameters

Sometimes you’ll want to manage more than one piece of state — like a **category filter** and a **page number** — in the URL at the same time.

Here’s how to update multiple query parameters at once:

```jsx
setSearchParams({
  category: "indoor",
  page: 2,
});
```

This will update the URL to:

```
/products?category=indoor&page=2
```

You can also use the **functional form** when you want to change just one param (like `category`) without losing others (like `page`):

```jsx
setSearchParams(prevParams => {
  const newParams = new URLSearchParams(prevParams);
  newParams.set("category", "indoor");
  return newParams;
});
```

### Why Use `.set()`?

The `.set()` method lets you **update a specific query parameter** while preserving the others. It’s especially useful when:

- You only want to change one parameter
- You need to work from the current state of the URL
- You want to avoid accidentally removing other params

---

## My Real Example: Filter Products by Category

Here’s how I rewrote my component:

```jsx
// Product component
...
const [searchParams, setSearchParams] = useSearchParams();

useEffect(() => {
  async function getPlantData() {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const res = await fetch(\`http://localhost:8004/plants?\${queryString}\`);
      const { paginatedPlants, totalPages } = await res.json();

      setData(paginatedPlants);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  }

  getPlantData();
}, [searchParams]);

...
```

And to handle category selection and page updates:

```jsx
function handleCategory(e) {
  const category = e.target.value;

  setSearchParams(prevParams => {
    const newParams = new URLSearchParams(prevParams);
    newParams.set("category", category);
    newParams.set("page", 1); // reset page to 1 when category changes
    return newParams;
  });
}

function handleNextPage() {
  const currentPage = Number(searchParams.get("page") || 1);

  setSearchParams(prevParams => {
    const newParams = new URLSearchParams(prevParams);
    newParams.set("page", currentPage + 1);
    return newParams;
  });
}
```

---

## What This Did for Me

- When a user selects a category and navigates to a new page, the URL updates with both query params, like:  
  `?category=indoor&page=2`
- The `useEffect` detects changes to either `category` or `page`, and **fetches updated plant data** from the server accordingly.
- If the user **refreshes** the page, both parameters remain in the URL — so the correct filter and pagination state are restored.
- Users can now **copy and share the URL**, and others will see the **exact same filtered view** with the same page.

---

## It’s Great For:

- Filters (like `category`, `price range`)
- Tabs (`?tab=settings`)
- Pagination (`?page=2`)
- Search terms (`?q=plant`)
- Any app where you want to keep state in sync with the URL

---

## Final Thoughts

Before `useSearchParams`, I was relying solely on internal React state — which worked, **until it didn’t**.

This little hook from React Router helped me **bridge the gap between the browser URL and my component logic**, keeping everything in sync and user-friendly.

If you're building anything with filters, pagination, or tabbed views — and you want it to **persist across refreshes** and be **shareable** — I highly recommend giving `useSearchParams` a try.
