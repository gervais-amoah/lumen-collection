# 🧩 AI Shop Assistant MVP Specification

_For Block Builder Fellowship Submission_

## Your role

You are my coding assistant, with full-stack software development skills. You have a staff level of experience, and very proficient in AI system development too. You will help build the MVP of a web app. Keep your answers concise. If you use an external package, state it so I know I have to install it. For files (or code snippets), indicate the full path to them. Use best practice and production ready structure (even if this is just a MVP, it shall still be clean and professional).

## 1. Project Overview

### Goal

Build a **proof-of-building** MVP demonstrating an AI-powered shopping assistant that guides users through a boutique fashion store using natural conversation, semantic search, and personalized curation.

### Core Experience

- User is welcomed with a short and engaging title and subtitle. A GIF or static image of an “assistant” waiting for the user’s query (main panel, 65% left)
- Chat panel (35% right)
- The main panel will show a product grid, updates dynamically based on the conversation
- AI acts as a personal stylist, narrowing down to 6 → 1 ideal product
- Users can add items to the cart and proceed to mock checkout

### Target Ecosystem Fit

Aligned with **Square Online merchants** selling fashion goods — scalable to thousands of small boutiques.

---

## 2. Tech Stack (Free Tier Only)

| Layer         | Technology                                                     |
| ------------- | -------------------------------------------------------------- |
| Frontend      | Next.js App Router + shadcn + Tailwind CSS                     |
| Hosting       | Vercel (free tier)                                             |
| Backend       | Next.js API Routes (serverless functions)                      |
| Database      | Supabase PostgreSQL + `pgvector` extension                     |
| Auth          | Not required (demo-only)                                       |
| LLM           | Google Gemini 1.5 Flash (free tier: 10 RPM / 250 RPD)          |
| Embeddings    | `sentence-transformers/all-MiniLM-L6-v2` via `transformers.js` |
| Vector Search | Supabase `pgvector` (cosine similarity)                        |
| Assets        | Images store on Supabase                                       |

✅ All tools are free and suitable for demo deployment.
PS: NEVER use`any` in TypeScript!

---

## 3. Data Model

### Product Schema (`products` table in Supabase)

```sql
id TEXT PRIMARY KEY
category TEXT -- 'clothing', 'accessory', 'footwear'
type TEXT -- 'dress', 'handbag', 'shoes', etc.
name TEXT
brand TEXT
price INTEGER -- in cents (e.g., $89 = 8900), but use dollars for MVP simplicity
color TEXT[]
size TEXT[] -- e.g., ['S','M'] or ["6","7","8"]
style TEXT[] -- ['formal', 'casual']
material TEXT
occasion TEXT[] -- optional
description TEXT
image_url TEXT
embedding VECTOR(384) -- generated offline
```

> 💡 Store prices in dollars for MVP simplicity (`REAL` type). Use cents in real apps.

---

## 4. System Architecture

```
[User]
   ↓
[Next.js Frontend @ Vercel]
   ↓
→ Chat UI ↔ POST /api/converse (main entry point)
   ↓
[API Route: /api/converse]
   ├─→ Gemini Flash: Refine intent + generate reply
   ├─→ If actionable query → embed + vector search
   └─→ If results → re-prompt Gemini to personalize response
   ↓
[Supabase: products + pgvector]
← Embedded vectors pre-uploaded
```

All logic flows through **one backend endpoint**: `/api/converse`.

---

## 5. API Contract

### Request (`POST /api/converse`)

```json
{
  "message": "I need a red dress for a wedding",
  "history": [
    { "role": "user", "content": "Looking for something formal" },
    { "role": "assistant", "content": "Any color preference?" }
  ]
}
```

### Response

```json
{
  "assistant_response": "Here’s a beautiful burgundy wrap dress — elegant and popular for weddings.",
  "products": [
    {
      "id": "dress-001",
      "name": "Evelyn Silk Wrap Dress",
      "price": 89,
      "color": ["burgundy", "black"],
      "size": ["S", "M", "L"],
      "style": ["formal", "elegant"],
      "image_url": "/images/dress-001.jpg",
      "description": "A flowing silk wrap dress..."
    }
    // {...}
  ],
  "cache_hit": true
}
```

If no match:

```json
{
  "assistant_response": "Sorry, we don’t have anything like that yet. Want to try another style?",
  "products": []
}
```

---

## 6. Workflow Logic

### Step 1: User Sends Message

- Frontend appends to chat history
- Posts to `/api/converse`

### Step 2: Gemini Intent Refinement

Prompt: Will define it later

Example outputs:

```json
{ "assistant_response": "Any color preference?", "query_text": "" }
```

```json
{
  "assistant_response": "Great choice!",
  "query_text": "red formal dress for wedding"
}
```

### Step 3: Vector Search (if `query_text` exists)

- Normalize `query_text`: lowercase, trim
- Check **in-memory cache** (Vercel serverless memory):
  ```ts
  const cachedProducts = cache.get(normalizedQuery);
  ```
- If hit → return products
- If miss → embed with `transformers.js` → search Supabase

### Step 4: Personalize Final Reply (if products found)

Re-call Gemini:

```text
These are the top matching items:

1. Evelyn Silk Wrap Dress - $89 - burgundy, black - formal
2. Clara Structured Tote - $120 - tan, black - professional

Say something warm and helpful about them. Max 2 sentences.
```

Ensures **AI personality shines** even after search.

### Step 5: Return Response

Send `{ assistant_response, products }` to frontend.

---

## 7. Caching Strategy

| Key                       | Value               | TTL        |
| ------------------------- | ------------------- | ---------- |
| `normalized_query_text`   | `[Product]` array   | 1 hour     |
| Common queries pre-warmed | e.g., `"red dress"` | Persistent |

Use simple in-memory cache in API route:

```ts
const cache = new Map();
// Clear every 24h via scheduled ping or accept cold start
```

Avoids redundant embedding/vector DB calls.

---

## 8. Error & Edge Case Handling

| Scenario                        | Strategy                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| Gemini rate limit hit           | Return graceful message: _"One moment — checking our inventory…"_ → retry after delay |
| No vector results               | Return generic: _"We don’t carry that yet. Try another style?"_                       |
| Ambiguous query                 | Gemini asks clarifying question; no search                                            |
| Invalid image URL               | Fallback to placeholder (`/images/placeholder.jpg`)                                   |
| Cold start latency              | Accept first-slow (~2s); optimize with Vercel Pro plan later                          |
| Max messages reached (e.g., 10) | Show: _"Thanks for exploring! Refresh to start over."_                                |

---

## 9. Frontend Behavior

### Layout

- Split screen: 65% product grid (left), 35% chat panel (right)
- Fixed cart icon (top-right) with badge
- Simple loading animation in chat (bubble) and main panel (GIF on image of "assistant searching") when message is been proceeded

### Interaction Rules

- Click “Add to Cart” → increment badge, show checkmark on card
- Click product → modal with details → “Back to Chat”
- When ≤3 products: apply glow animation to most relevant (`ring-4 ring-blue-400 animate-pulse`)

### Checkout Flow

- Button appears when cart ≥1
- Links to `/checkout` → static page:
  > “Thank you! In a real store, this would process payment via Square.”

---

If you understand your role, answer with a todo list and I will tell you what to do.

# These are for me (Gev)

## 10. Data Setup Plan

### Step 1: Create Dummy Products (25 total)

- 10 clothing (dresses, shirts, jackets)
- 8 accessories (handbags, hats, belts)
- 7 footwear (shoes, boots, sneakers)

---

### Step 2: Generate Embeddings (Google Colab)

Run once:

```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')

for p in products:
  text = f"{p['description']} color: {', '.join(p['color'])}. Style: {', '.join(p['style'])}. Brand: {p.get('brand', '')}"
  p['embedding'] = model.encode(text, normalize_embeddings=True).tolist()
```

Export to `products_with_embeddings.json`.

### Step 3: Upload to Supabase

- Create `products` table
- Insert all rows (including `embedding::vector(384)`)

---

## 11. Testing Plan

### Unit Tests

- [ ] `/api/converse` handles vague query → no search
- [ ] Embedding matches across platforms (Colab vs. `transformers.js`)
- [ ] Cache prevents duplicate searches

### Manual Test Scenarios

| Flow                                      | Expected Outcome                    |
| ----------------------------------------- | ----------------------------------- |
| “I need a dress for a wedding” → “in red” | Results narrow correctly            |
| “What’s your name?”                       | No product update                   |
| Add item → check cart badge               | Badge increments, drawer shows item |
| Network failure                           | Graceful error, retry option        |

### Performance

- [ ] First meaningful paint < 1.5s
- [ ] AI response < 2s (Gemini Flash)
- [ ] Vector search < 300ms (Supabase index)

---

## 12. Deployment Plan

1. Deploy Supabase project (free tier)
2. Push code to GitHub repo
3. Connect to Vercel → auto-deploy
4. Set environment variables:
   - `GEMINI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

Domain: `lumen-style.vercel.app`

---

## 13. Why This Stands Out for Block

- ✅ **Human-first AI**: Not just chat → closes sales like a real associate
- ✅ **Scalable idea**: Plug-in for any Square merchant
- ✅ **Technically sound**: Semantic search + smart caching
- ✅ **Polished UX**: Glow effect, cart, responsive design
- ✅ **Free-tier viable**: No cost to run or demo

> Narrative: _“We’re not building bots. We’re building trust.”_

---

## ✅ Next Steps

With this spec, a developer can build the entire MVP in **under 3 weeks**.

Would you like me to now deliver:

1. The **full Google Colab notebook**?
2. The **complete `/api/converse.ts` file**?
3. Or the **Next.js page structure**?

Just say which one — and I’ll give it to you ready to run.

# How results look like:

## products from semantic search

```js
mockSemanticSearchResult = {
  assistant_response: "Do you see anything you like?",
  query_text: "red dress for wedding",
  products: [
    {
      id: "dress-001",
      category: "clothing",
      type: "dress",
      name: "Evelyn Silk Wrap Dress",
      brand: "Luna & Co.",
      price: 89,
      color: ["burgundy", "navy", "black"],
      size: ["S", "M", "L", "XL"],
      style: ["formal", "elegant", "evening"],
      material: "silk blend",
      occasion: ["wedding", "dinner", "event"],
      description:
        "A flowing silk wrap dress with a flattering V-neckline, perfect for weddings or dinner dates.",
      image_url: "/images/placeholder.jpg",
      similarity: 0.501656651496887,
    },
    // {...},
  ],
  cache_hit: false,
};
```
