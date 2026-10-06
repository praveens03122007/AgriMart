# 🌱 AgriMart — Technical Review Documentation

![AgriMart Banner](https://img.shields.io/badge/Govt_Certified-100%25_Genuine-059669?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-d97706?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Demo_Ready-0284c7?style=for-the-badge)

AgriMart is a browser-first agricultural marketplace/advisory demo. It provides a product catalog, crop/soil dosage calculator, simulated disease diagnostics, village-pool discounts, order tracking, subsidy information, and harvest buyback UI.

> **Important architecture note:** the current repository is a frontend/demo application. `server.js` and `server.ps1` only serve static files. There is **no live REST API, authentication service, or database connection in the current code**. The API and database sections below document the proposed contract so later backend work can be reviewed against a stable interface.

---

## 1. Repository Structure

```text
Agrimart/
├── index.html              # Single-page application markup and modal/form UI
├── styles.css              # Responsive visual design system
├── app.js                  # Client state, catalog data, calculations and UI behavior
├── server.js               # Node.js static development server
├── server.ps1              # PowerShell HttpListener equivalent
├── package.json            # Node test command
├── tests/
│   └── app.test.js         # Unit tests for pure business rules
├── README.md               # This technical documentation
└── LICENSE.txt
```

The nested `AgriMart-Files.zip`/portable Git artifacts are distribution/support files and are not required to execute the web demo.

---

## 2. Current Runtime Architecture

```text
Browser
  │
  ├── index.html
  ├── styles.css
  └── app.js
        │
        ├── In-memory state
        │   ├── cart
        │   ├── orders
        │   └── soil inputs
        │
        ├── In-memory product catalog
        ├── Pure business helpers
        │   ├── convertLandToAcres()
        │   ├── calculateOrderTotals()
        │   └── getDiseaseInfo()
        │
        └── DOM rendering / event handlers

Node server.js / PowerShell server.ps1
        │
        └── Static file serving only
```

### State and persistence

`app.js` stores state in a JavaScript object. Refreshing the browser resets the state to the hard-coded demo values. There is currently no:

- SQL/NoSQL database
- REST/GraphQL API
- server-side session
- authentication/authorization
- payment gateway
- real QR verification service
- real AI inference endpoint
- persistent order storage

These boundaries should be preserved when a backend is introduced: UI code should call service APIs rather than directly owning persistence.

---

# 3. Unit Testing

## 3.1 Test strategy

The first testing layer targets **pure business logic** because it is deterministic and does not require a browser:

| Unit | Responsibility | Key cases |
|---|---|---|
| `convertLandToAcres()` | Normalize land units | Acres, Bigha, Hectares, invalid/negative input |
| `calculateOrderTotals()` | Checkout arithmetic | subsidy, village discount, disabled pool, empty cart, invalid item |
| `getDiseaseInfo()` | Diagnostic lookup | known diagnosis, unknown fallback |

The DOM rendering functions remain integration/UI concerns and should be covered later with a browser test runner such as Playwright.

## 3.2 Running the tests

Node.js 18+ is recommended because the suite uses the built-in `node:test` runner.

```bash
npm test
```

Equivalent direct command:

```bash
node --test tests/*.test.js
```

Expected result:

```text
✔ convertLandToAcres keeps acres unchanged
✔ convertLandToAcres converts bigha using the application factor
✔ convertLandToAcres converts hectares to acres
✔ convertLandToAcres rejects invalid area
✔ calculateOrderTotals computes subsidy and village discount
✔ calculateOrderTotals does not apply village discount when disabled
✔ calculateOrderTotals supports an empty cart
✔ calculateOrderTotals rejects malformed cart items
✔ getDiseaseInfo returns the requested diagnosis
✔ getDiseaseInfo falls back to rice blast for an unknown type

10 tests passed
```

## 3.3 Test design conventions

Use **Arrange → Act → Assert**:

```js
test('example', () => {
  // Arrange
  const cart = [{ mrp: 1000, price: 800, qty: 2 }];

  // Act
  const result = calculateOrderTotals(cart, true);

  // Assert
  assert.equal(result.finalPayable, 1312);
});
```

A unit test should:

1. exercise one business rule;
2. avoid network, filesystem, timers, and real DOM dependencies;
3. use deterministic input;
4. assert the observable result;
5. include at least one boundary/invalid case where practical.

## 3.4 Recommended next test layers

### Component/UI tests

Add browser-level tests for:

- adding/removing a product from the cart;
- quantity changes;
- village-pool toggle;
- checkout validation;
- tab switching;
- QR modal open/close;
- language selector;
- calculator form updates.

### API integration tests

Once a backend exists, test:

- request validation;
- HTTP status codes;
- authorization;
- database transaction behavior;
- idempotency of order creation;
- duplicate requests;
- unavailable product/stock conditions.

### End-to-end tests

A minimum smoke flow should be:

```text
Open home
  → Browse products
  → Add certified product
  → Open cart
  → Enable village discount
  → Checkout
  → Verify order appears in Orders & Track
```

---

# 4. Frontend Error Boundary

Because this application uses vanilla JavaScript rather than React/Vue/etc., there is no framework-specific component error boundary. `app.js` therefore implements a **browser-level error boundary**.

## 4.1 Boundary behavior

`installErrorBoundary()` listens for:

```js
window.addEventListener('error', ...);
window.addEventListener('unhandledrejection', ...);
```

Initialization is also guarded:

```js
try {
  // initial render operations
} catch (error) {
  // log diagnostic information and show recovery UI
}
```

The boundary:

1. logs the technical error to the browser console;
2. avoids showing stack traces to the user;
3. renders a recovery banner;
4. offers a page refresh;
5. prevents a silent blank/partially initialized application.

## 4.2 Error handling policy

| Error type | User behavior | Developer behavior |
|---|---|---|
| Missing optional DOM node | Function returns safely where appropriate | Debug during UI review |
| Initialization exception | Recovery banner | Console error with context |
| Runtime exception | Recovery banner | `window.error` console entry |
| Unhandled Promise rejection | Recovery banner | Rejection reason logged |
| HTTP/API failure (future) | Feature-level error state | Log request ID/status |

The boundary must **not** expose:

- stack traces;
- server filesystem paths;
- access tokens;
- database connection strings;
- raw SQL errors;
- personal farmer/customer data.

## 4.3 Future API error boundary

When REST calls are introduced, use a feature-level boundary around each async operation:

```text
UI action
   │
   ▼
validate input
   │
   ▼
API client
   │
   ├── 2xx → update state/UI
   │
   ├── 400 → show validation message
   ├── 401/403 → authentication/permission flow
   ├── 404 → resource-not-found state
   ├── 409 → conflict/retry guidance
   ├── 429 → rate-limit message
   └── 5xx/network → retry/offline state
```

The global browser boundary is the last-resort safety net, not a replacement for normal feature-level error handling.

---

# 5. Current HTTP Surface

The current Node server exposes **static files only**.

| Method | Path | Current status | Purpose |
|---|---|---|---|
| `GET` | `/` | Implemented | Serves `index.html` |
| `GET` | `/index.html` | Implemented | SPA markup |
| `GET` | `/styles.css` | Implemented | Styles |
| `GET` | `/app.js` | Implemented | Client logic |
| `GET` | `/favicon...` | Static asset if present | Browser icon |
| `GET` | `/api/*` | **Not implemented** | Reserved for future backend |

The server returns `404` for missing static assets and a generic `500` response for other filesystem errors.

---

# 6. Proposed REST API Contract

The following endpoints are **planned/documented contracts, not currently implemented endpoints**.

Base URL:

```text
/api/v1
```

JSON content type:

```http
Content-Type: application/json
```

## 6.1 Products

### `GET /api/v1/products`

Returns products available to the catalog.

Query parameters:

```text
category=seeds|fertilizers|pesticides
crop=Rice
certified=true
search=rice
page=1
limit=20
```

Response:

```json
{
  "data": [
    {
      "id": "seed-rice-1",
      "name": "Paddy High-Yield Seeds (PR-126)",
      "category": "seeds",
      "crop": "Rice",
      "price": 650,
      "mrp": 850,
      "unit": "10 kg bag",
      "govtCertified": true,
      "batchCode": "CERT-RICE-2026-01"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

### `GET /api/v1/products/{productId}`

Returns one product, including certification/batch metadata.

---

## 6.2 Crop/soil advisory

### `POST /api/v1/advisories/dosage`

Request:

```json
{
  "crop": "Rice",
  "soil": "Alluvial",
  "landArea": 2,
  "landUnit": "Acres"
}
```

Response:

```json
{
  "crop": "Rice",
  "soil": "Alluvial",
  "normalizedAreaAcres": 2,
  "recommendation": {
    "ureaBags": 5,
    "dapBags": 2,
    "seedKg": 20
  }
}
```

> Advisory values must be reviewed and approved by an agronomy/domain expert before production use. The current UI values are demo logic, not a certified agronomic prescription.

---

## 6.3 Disease diagnostics

### `POST /api/v1/diagnostics`

Request:

```json
{
  "imageUrl": "https://example.invalid/uploads/leaf-123.jpg",
  "crop": "Rice"
}
```

Response:

```json
{
  "diagnosis": {
    "disease": "Rice Leaf Blast",
    "confidence": 0.984,
    "severity": "moderate",
    "recommendedProductId": "pest-fungi-1"
  },
  "model": {
    "name": "agrimart-crop-disease-model",
    "version": "1.0.0"
  }
}
```

Production requirements:

- validate MIME type and file size;
- virus/malware scan uploads;
- never trust client-supplied diagnosis/confidence;
- store model version with each result;
- include a human-review path for low-confidence results.

---

# 7. Orders API

## `POST /api/v1/orders`

Creates an order.

Request:

```json
{
  "items": [
    {
      "productId": "seed-rice-1",
      "quantity": 2
    }
  ],
  "villagePool": true,
  "paymentMethod": "cod"
}
```

Response:

```json
{
  "order": {
    "id": "AM-98401",
    "status": "confirmed",
    "total": 1312,
    "currency": "INR"
  }
}
```

Recommended server-side rules:

- re-read product prices from the database;
- never trust client `price`, `mrp`, subsidy, or total;
- validate stock;
- calculate discounts on the server;
- use a database transaction for order + order-item writes;
- generate order IDs server-side;
- make order creation idempotent using an idempotency key.

### `GET /api/v1/orders`

Returns the authenticated user's orders.

### `GET /api/v1/orders/{orderId}`

Returns order details and current status.

---

# 8. QR/Certification API

### `GET /api/v1/products/{productId}/certificate`

Returns certification information for the product batch.

Example:

```json
{
  "productId": "seed-rice-1",
  "batchCode": "CERT-RICE-2026-01",
  "certificationStatus": "valid",
  "labCode": "LAB-2026-001",
  "validUntil": "2027-06-30"
}
```

The browser should treat certification as server-authoritative. A QR value rendered by the client alone is not proof of authenticity.

---

# 9. Harvest Marketplace API

### `GET /api/v1/market-rates`

Returns current market/MSP reference rates.

### `POST /api/v1/produce-listings`

Request:

```json
{
  "crop": "Basmati Rice",
  "quantityQuintals": 40,
  "expectedHarvestMonth": "2026-11"
}
```

### `GET /api/v1/produce-listings/{listingId}`

Returns listing and contract status.

---

# 10. Proposed Database Schema

The current demo has **no database**. The following relational schema is the recommended baseline for a future backend.

## 10.1 Entity relationship overview

```text
users
  │
  ├──< orders ──< order_items >── products ──< product_batches
  │
  ├──< soil_reports
  │
  ├──< disease_diagnostics
  │
  └──< produce_listings

products ──< product_batches
```

## 10.2 `users`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | User identifier |
| `name` | VARCHAR(120) | NOT NULL | Display name |
| `phone` | VARCHAR(20) | UNIQUE | Login/contact number |
| `village` | VARCHAR(120) | NULL | Village/location label |
| `created_at` | TIMESTAMP | NOT NULL | Account creation time |
| `updated_at` | TIMESTAMP | NOT NULL | Last profile update |

Do not store raw passwords. Use an established identity provider or a secure password hashing scheme if local authentication is required.

## 10.3 `products`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Product ID |
| `sku` | VARCHAR(64) | UNIQUE | Stock keeping unit |
| `name` | VARCHAR(200) | NOT NULL | Product name |
| `category` | VARCHAR(32) | NOT NULL | seeds/fertilizers/pesticides |
| `crop` | VARCHAR(80) | NULL | Target crop |
| `mrp` | DECIMAL(12,2) | NOT NULL | Reference MRP |
| `sale_price` | DECIMAL(12,2) | NOT NULL | Current selling price |
| `unit` | VARCHAR(60) | NOT NULL | Pack/unit description |
| `govt_certified` | BOOLEAN | NOT NULL | Certification flag |
| `description` | TEXT | NULL | Product description |
| `created_at` | TIMESTAMP | NOT NULL | Creation time |
| `updated_at` | TIMESTAMP | NOT NULL | Last update |

## 10.4 `product_batches`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Batch ID |
| `product_id` | UUID | FK → products | Product |
| `batch_code` | VARCHAR(100) | UNIQUE | Certification/batch code |
| `lab_code` | VARCHAR(100) | NULL | Certification lab |
| `certification_status` | VARCHAR(32) | NOT NULL | valid/expired/recalled |
| `valid_until` | DATE | NULL | Certification expiry |
| `created_at` | TIMESTAMP | NOT NULL | Batch record creation |

## 10.5 `orders`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Internal order ID |
| `order_number` | VARCHAR(32) | UNIQUE | Public order number |
| `user_id` | UUID | FK → users | Buyer |
| `status` | VARCHAR(32) | NOT NULL | pending/confirmed/ready/completed/cancelled |
| `payment_method` | VARCHAR(32) | NOT NULL | cod/emi/etc. |
| `subtotal` | DECIMAL(12,2) | NOT NULL | Pre-discount total |
| `subsidy_amount` | DECIMAL(12,2) | NOT NULL | Product subsidy |
| `village_discount` | DECIMAL(12,2) | NOT NULL | Group discount |
| `total` | DECIMAL(12,2) | NOT NULL | Final payable |
| `created_at` | TIMESTAMP | NOT NULL | Creation time |
| `updated_at` | TIMESTAMP | NOT NULL | Last status update |

## 10.6 `order_items`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Line item |
| `order_id` | UUID | FK → orders | Parent order |
| `product_id` | UUID | FK → products | Ordered product |
| `quantity` | INTEGER | > 0 | Quantity |
| `unit_price` | DECIMAL(12,2) | NOT NULL | Price captured at checkout |
| `created_at` | TIMESTAMP | NOT NULL | Creation time |

Historical prices must be stored on `order_items`; do not recompute an old order from today's product price.

## 10.7 `soil_reports`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Report ID |
| `user_id` | UUID | FK → users | Owner |
| `crop` | VARCHAR(80) | NOT NULL | Target crop |
| `soil_type` | VARCHAR(80) | NULL | Soil classification |
| `nitrogen_level` | VARCHAR(32) | NULL | Low/Medium/High |
| `phosphorus_level` | VARCHAR(32) | NULL | Low/Medium/High |
| `potassium_level` | VARCHAR(32) | NULL | Low/Medium/High |
| `source_uri` | TEXT | NULL | Secure report storage reference |
| `created_at` | TIMESTAMP | NOT NULL | Upload/analysis time |

Sensitive uploaded reports should be stored outside the public web root with access control.

## 10.8 `disease_diagnostics`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Diagnosis ID |
| `user_id` | UUID | FK → users | Requesting farmer |
| `crop` | VARCHAR(80) | NOT NULL | Crop |
| `disease` | VARCHAR(160) | NOT NULL | Predicted disease |
| `confidence` | DECIMAL(5,4) | NOT NULL | Model confidence |
| `severity` | VARCHAR(32) | NULL | Severity |
| `model_name` | VARCHAR(120) | NOT NULL | Model identifier |
| `model_version` | VARCHAR(40) | NOT NULL | Model version |
| `image_uri` | TEXT | NULL | Private object-storage reference |
| `created_at` | TIMESTAMP | NOT NULL | Analysis time |

## 10.9 `produce_listings`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Listing ID |
| `user_id` | UUID | FK → users | Seller |
| `crop` | VARCHAR(100) | NOT NULL | Crop/variety |
| `quantity_quintals` | DECIMAL(10,2) | NOT NULL | Expected quantity |
| `expected_harvest_month` | DATE | NOT NULL | Month represented by first day |
| `contract_price` | DECIMAL(12,2) | NULL | Agreed rate |
| `status` | VARCHAR(32) | NOT NULL | listed/contracted/completed/cancelled |
| `created_at` | TIMESTAMP | NOT NULL | Listing creation |

---

# 11. API Error Contract

All future API endpoints should return a consistent error shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Quantity must be greater than zero.",
    "requestId": "req_01J...",
    "details": [
      {
        "field": "items[0].quantity",
        "reason": "must_be_positive"
      }
    ]
  }
}
```

Recommended status mapping:

| HTTP | Meaning |
|---:|---|
| `400` | Malformed request |
| `401` | Authentication required/invalid |
| `403` | Authenticated but not permitted |
| `404` | Resource does not exist |
| `409` | State/stock/idempotency conflict |
| `422` | Semantically invalid input |
| `429` | Rate limit exceeded |
| `500` | Unexpected server error |
| `503` | Dependency/service unavailable |

`requestId` should be included in logs so support/reviewers can correlate a user-visible failure with server logs.

---

# 12. Security Review Checklist

Before converting the demo into a production system:

- [ ] Move all pricing/discount calculations to the trusted backend.
- [ ] Add authentication and role-based authorization.
- [ ] Validate every API request server-side.
- [ ] Use parameterized SQL/ORM queries.
- [ ] Add database transactions for order creation.
- [ ] Add idempotency keys for checkout.
- [ ] Protect uploaded soil reports and leaf images.
- [ ] Rate-limit diagnostics and authentication endpoints.
- [ ] Add structured server logs with request IDs.
- [ ] Do not log passwords, tokens, or sensitive farmer data.
- [ ] Add CSRF protection where cookie authentication is used.
- [ ] Configure HTTPS in deployed environments.
- [ ] Add dependency/security scanning to CI.
- [ ] Replace simulated government certification/subsidy claims with verified integrations before production.

---

# 13. Local Development

### Run the Node static server

```bash
node server.js
```

Open:

```text
http://localhost:8080/
```

### Run tests

```bash
npm test
```

### PowerShell alternative

```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

---

# 14. Review Notes / Known Limitations

1. **Demo data:** products, orders, subsidies, MSP values and disease results are hard-coded.
2. **No backend:** the current server is static-file only.
3. **No persistence:** browser refresh resets application state.
4. **Simulated AI:** disease diagnosis is a predefined sample lookup, not a machine-learning inference service.
5. **Simulated soil parsing:** no PDF/image parser is currently connected.
6. **Simulated certification:** QR values are display data, not a live government verification.
7. **Agronomy disclaimer:** dosage recommendations are demo calculations and require domain validation before real-world use.
8. **Testing scope:** current automated tests cover pure business rules. Browser UI and future API/database behavior require integration/E2E tests.

---

## License

This project is open-source under the MIT License.
