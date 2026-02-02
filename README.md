# Conversational Upselling Agent 🛍️🤖

<img width="1754" height="1113" alt="Screenshot 2026-02-02 012032" src="https://github.com/user-attachments/assets/225194e0-7b1d-4755-a928-ac7b6795e008" />

An AI-powered shopping assistant that turns static “Related Products” sections into **timely, contextual recommendations delivered through conversation**.

Instead of showing random product grids, this agent acts like a helpful stylist — suggesting complementary items at the right moment, with clear explanations of *why* they work together.

---

## ✨ What It Does

- Helps users find products through natural language search  
- Waits until an item is added to the cart  
- Suggests complementary products using relational product data  
- Explains recommendations in a friendly, stylist-like tone  
- Continues suggesting items until a “complete look” is formed or the user stops  

The focus is on **timing, context, and explanation**, not just recommendations.

---

## 🧠 How It Works

Each product contains structured relationship data:

```json
{
  "related_items": {
    "similar": ["uuid-1", "uuid-2"],
    "clothing": ["uuid-3"],
    "accessories": ["uuid-4"]
  }
}
```
---

**Flow:**

1. User searches conversationally
2. Agent finds a product via Algolia
3. User adds item to cart
4. Agent confirms and suggests a complementary category
5. If accepted, the agent fetches that item and continues
6. Stops when the user declines or a full outfit is formed

The agent currently infers progress from the conversation rather than reading the real cart state.

---

## 🛠 Tech Stack

* **Frontend:** Next.js + TypeScript
* **Chat UI:** Algolia InstantSearch Chat widget
* **Search & Agent Logic:** Algolia Agent Studio
* **Database:** Supabase (PostgreSQL)
* **Deployment:** Vercel

---

## ⚠️ Prototype Limitations

* Small catalog (~30 products)
* No scalability or load testing
* Relationships are manually curated
* No real cart-state awareness yet
* Demo may occasionally fail due to API usage limits

This project is a **design and interaction prototype**, not a production system.

---

## 🚀 Future Improvements

* Real-time cart awareness
* Larger product catalog
* Automated relationship generation
* Semantic / occasion-based search
* More advanced outfit reasoning

---

## 📺 Demo

**Live:** [https://lumen-collection.vercel.app/](https://lumen-collection.vercel.app/)  
**Video Walkthrough:** [https://youtu.be/hjU9DyoVsSc](https://youtu.be/hjU9DyoVsSc)

---

Built for the **Algolia Agent Studio Challenge** — exploring how conversational interfaces can make online shopping feel more like getting advice from a stylist than browsing a catalog.
