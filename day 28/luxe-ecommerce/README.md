# LUMÉ — E-Commerce Capstone (Day 28)

Dark-luxury e-commerce site built with React + Vite + Tailwind + React Router + Context API.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## What's inside

- **Pages**: Home, Products (search/filter/sort/pagination), Product Details, Cart,
  Wishlist, Checkout (protected route), Login, Register
- **Context API**: AuthContext, CartContext, WishlistContext, ToastContext
- **Custom hooks**: `useFetch` (API + loading/error state), `useLocalStorage` (persistence)
- **Data**: FakeStoreAPI (https://fakestoreapi.com)
- **Auth**: demo-only, stored in localStorage (no real backend) — good enough for a
  capstone demo, swap in a real API later if you want
- **Bonus features covered**: dark theme (built-in, no light mode — it's designed dark
  by default), skeleton loaders, toast notifications, pagination, protected routes,
  Context API, custom hooks

## Notes for you

- Everything is commented where the logic isn't obvious.
- Checkout requires login (ProtectedRoute) — try visiting /checkout while logged out.
- Cart/Wishlist/Auth all persist across refreshes via localStorage.
