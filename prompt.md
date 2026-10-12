# Khata — Digital Credit Ledger App (Mobile)

Build a mobile-first React Native (Expo) app called **Khata** for small shop owners (Nepal, currency "Rs.") to track what customers owe them (udhar/credit), record payments, and see reports. Clean, modern, fast, one-handed use. Primary brand color: purple `#5f33e1`; success green `#16a34a`; destructive red `#dc2626`. Rounded cards (rounded-2xl), generous spacing, light theme (dark mode supported).

## Tech stack
- Expo (managed) + Expo Router (file-based routing, routes in `src/app/`)
- NativeWind (Tailwind) + gluestack-ui components
- react-hook-form + zod (forms/validation), TanStack Query (server state), axios (REST API), expo-secure-store (auth token)
- TypeScript throughout

## Screens & navigation
Auth stack: **Welcome/Landing → Login → Signup**. App tabs (after login): **Home, Customers, Transaction (center action), Reports, Profile**.

### 1. Auth
- Login (email/phone + password), Signup (shop name, owner name, phone, email, password). Inline validation errors, loading state on buttons, token stored securely; auto-login on app start.

### 2. Home (dashboard)
- Greeting with shop name.
- Summary cards: **Total receivable (total due)**, **Collected today**, **Credit given today**, **Active customers**.
- Recent transactions list (customer avatar, name, credit/payment badge, amount, date).
- Prominent "+ New transaction" button.

### 3. Customers
- Paginated list with search (name/phone), pull-to-refresh, infinite scroll. Each row: avatar/initials, name, phone, current **credit balance** (red if owing, green if clear).
- **Create / Edit customer** form: name, phone, address, credit limit, photo (optional). Active/inactive toggle.
- **Customer detail**: header with avatar, contact info, balance vs credit limit (progress bar), actions (Add credit, Collect payment, Edit, Call), and a transaction history timeline (credits and payments with dates).

### 4. New Transaction (bottom sheet, multi-step wizard)
A bottom action sheet with a thin 3-segment progress bar and a back button (hidden once the transaction is saved or has failed):
1. **Select customer** — searchable list, tap to select.
2. **Select type** — two large cards: **Credit (give udhar)** or **Payment (collect money)**.
3. **Details**
   - **Credit form:** add line items (item name, quantity, unit price) one at a time via a small draft form; added items list shows qty × price and line total with delete; running total; "Save Credit" button. Validation: at least 1 item, max 50, qty > 0, price > 0 (max 2 decimals).
   - **Payment form:** customer header (avatar, name, current due), **Amount** (decimal keypad, > 0, max 2 decimals), **Payment method** select (Cash, Bank Transfer, eSewa, Khalti), optional **Remark** (max 100 chars, multiline; Return key and tap-outside dismiss the keyboard), "Save Payment" button. Show inline errors; block submit until valid.
   - After save: full-sheet **success state** (big green check, "Credit added / Payment received", amount and customer name, Close button) or **error state** (red icon, message, Close). Invalidate the customers query so balances refresh.

### 5. Reports
- Date range filter (Today / 7 days / 30 days / custom).
- Totals: credit given, payments collected, net outstanding; top debtors list; simple bar/line chart of credit vs payments over time.
- Export/share summary (optional).

### 6. Profile
- Shop details, edit profile, change password, language (English/Nepali), logout.

## Data models
- `Customer`: id, name, phone, address, creditLimit, creditBalance, isActive, image, shopOwnerId, createdAt, updatedAt
- `Credit`: id, customerId, description, totalAmount, entryDate, items[{ itemName, quantity, unitPrice }]
- `Payment`: id, customerId, amount, paymentMethod (cash | bankTransfer | esewa | khalti), remark, entryDate
- Paginated list response: `{ success, data[], meta: { page, perpage, total, totalPages } }`

## REST API (Bearer token auth)
- `POST /auth/login`, `POST /auth/signup`
- `GET /customer?page=&perpage=&search=`, `POST /customer`, `GET/PUT /customer/:id`
- `POST /customer/:id/credit` body `{ description, items: [{ itemName, quantity, unitPrice }] }`
- `POST /customer/:id/payment` body `{ amount, paymentMethod, remark }`
- `GET /customer/:id/transactions`, `GET /reports/summary?from=&to=`

## UX requirements
- Loading skeletons, empty states with illustrations/CTA, pull-to-refresh, optimistic cache invalidation after mutations.
- All money shown as `Rs. 1,234.50`. Forms use numeric keypads, show errors under fields, and never allow double-submit (disable button while pending).
- Keyboard-safe layouts and bottom sheets; safe-area aware; works on iOS and Android.
- Accessible touch targets (min 44px), clear contrast, haptic feedback on key actions.
