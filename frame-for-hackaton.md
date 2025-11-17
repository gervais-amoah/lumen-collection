# 🧠 1. Hackathon-Ready Project Description

_(Use this in your submission form)_

### **Project Title**

**Lumen: AI Agentic Shopping Assistant for Boutique Fashion Retailers**

### **Problem**

Small boutique owners struggle online with:

- low product discovery quality
- no personalization
- limited upsell capability
- high customer bounce rates
- no AI-driven curation

Customers often leave because they can’t quickly find “the right item.”

---

### **Solution**

**Lumen** is an **agentic AI product discovery assistant** that autonomously:

1. Understands the user's intent
2. Plans next steps
3. Calls retrieval tools (vector search)
4. Curates product results
5. Engages in natural conversation
6. Guides users until they find the perfect item
   _Optiona:_
7. Add the desired product to the cart and proceed to checkout

Lumen brings _enterprise-grade AI curation_ to thousands of boutique stores.

---

### **Why Agentic AI?**

Instead of being a glorified chatbot, Lumen works as an **autonomous task-oriented agent**:

- It **interprets intent**, decides whether to clarify, search, or refine
- It uses “skills” (embedding search, filtering, scoring)
- It orchestrates a multi-step workflow to generate precise curated suggestions
- It updates the UI dynamically as part of its autonomous loop

---

### **Key Capabilities**

✔ Real-time conversational product search
✔ Multi-step reasoning and curation
✔ Embedding-based vector retrieval with pgvector
✔ Autonomous refinement & clarification
✔ Full styling flow (dress + accessories + shoes)
✔ Mini-cart + checkout simulation
✔ Tailwind + shadcn + animations for UX polish

---

### **Tech Stack**

- Next.js App Router
- Supabase (Postgres + pgvector)
- Vercel
- sentence-transformers embeddings
- Gemini Flash
- Zustand for frontend state
- Tailwind + shadcn + React Bits animations
- IBM watsonx Orchestrate framing

---

# ⚙️ 2. Mapping Your System to watsonx Agentic Concepts

IBM watsonx Orchestrate uses:

- **Skills** → tools the agent can execute
- **Flows** → multi-step automation pipelines
- **Plans** → the reasoning/decision steps linking skills
- **Agent** → orchestrator making decisions based on user intent

Here is how your system maps exactly:

---

### **Agent: Lumen Stylist Agent**

- Processes natural language
- Infers user intent
- Decides next action (search, clarify, refine)
- Manages contextual memory (chat history)

This is the **primary orchestrator**.

---

### **Skills (Tools the Agent Calls)**

| Skill                                    | What It Does                                                  |
| ---------------------------------------- | ------------------------------------------------------------- |
| **Vector Search Skill**                  | Calls pgvector to retrieve semantically similar products      |
| **Attribute Extraction Skill**           | Extracts attributes (color, type, price range) from user text |
| **Product Matching Skill**               | Filters/reranks retrieved products                            |
| **Personalized Style Commentary Skill**  | Writes 1–2 sentences describing the top matches               |
| **Outfit Assembly Skill** (optional)     | Generates 3-piece outfits for special events                  |
| **Budget Optimization Skill** (optional) | Filters + ranks items under a price threshold                 |

These map DIRECTLY to watsonx “skills”.

---

### **Flows (Multi-Step Sequences)**

Example: **Find a product for an event**

1. Understand intent
2. Extract attributes
3. Run vector search
4. Filter by style/price/occasion
5. Curate top 6
6. Generate stylist summary
7. Update product grid

That is an end-to-end **Orchestrate Flow**.

---

### **Plan Execution**

Your system already performs deliberative planning:

- No clear intent → ask clarifying question
- Sufficient intent → run multi-skill product search
- Ambiguous → refine attributes
- Too few results → broaden search
- Too many results → ask for constraints

This is textbook agent planning.

---

# 📝 3. One-Page Pitch (for the judges)

Use this directly:

---

## **Lumen: Agentic AI Shopping Assistant for Boutique Retailers**

### **Overview**

Lumen is an AI Stylist Agent designed for small fashion retailers. It understands customer intentions, plans actions, calls specialized tools, and autonomously guides shoppers to the perfect item. Built with an agentic architecture aligned with IBM watsonx Orchestrate, Lumen provides personalized styling recommendations that boost conversions and reduce bounce.

---

## **Why It Matters**

Small boutique owners lack AI tools that big brands have. Searching their catalogs is slow. Customers often leave without finding the right item. Lumen brings enterprise-grade AI discovery to every small retailer — accessible, fast, and deeply personalized.

---

## **How It Works (Agentic Flow)**

1. Customer chats naturally (e.g., “I need a red dress for a wedding”).
2. Lumen analyzes intent and builds a plan.
3. It calls its **Vector Search Skill** to find relevant products.
4. It uses **Curation Skills** to filter, refine, and rerank.
5. It calls its **Styling Skill** to generate warm human-like fashion guidance.
6. The UI updates the product grid in real time.
7. Customer narrows down, adds to cart, and proceeds to checkout simulation.

---

## **Skills Implemented**

- 🔍 Vector Search Skill
- 🧵 Attribute Extraction Skill
- 🎨 Style & Occasion Matching Skill
- 💬 Personalized Recommendation Skill
- 🛍️ Accessory Matching Skill (optional)
- 💵 Budget Optimization Skill (optional)

---

## **Technology**

Next.js + Supabase + pgvector + Gemini Flash + Tailwind + Zustand.

---

## **Impact**

Lumen democratizes intelligent product discovery. Boutique owners can finally offer curated shopping experiences that feel personal, high-end, and delightful — powered by agentic AI.

---

# 🎬 4. Demo Script (2 minutes)

### Slide 1 → Problem

“Boutique stores rely on basic search and filters. Customers leave because they can't find the right style quickly.”

### Slide 2 → Solution

“Meet Lumen — an AI Stylist Agent that autonomously guides customers to the perfect outfit.”

### Live Demo

1. Type: _“I need something elegant for a wedding.”_
2. Lumen asks clarifying question → “Any color preference?”
3. User: “Red or burgundy.”
4. Products instantly update.
5. User: _“Budget under $100”_ → filtering flow
6. Add to cart → Checkout
7. Done.

### Close

“This is enterprise-grade agentic shopping — for every boutique in the world.”

---

# 🚀 5. Optional Enhancements to Score Even Higher

The strongest improvements (most agentic):

### ⭐ 1. Multi-Agent Pipeline (Stylist Agent + Search Agent + Curation Agent)

Treat each as a watsonx Skill.
Huge points.

### ⭐ 2. Upload-a-product feature

Boutique owners upload product images → AI generates:

- name
- description
- tags
- vector embedding

This is a killer Orchestrate Skill.

### ⭐ 3. Full Outfit Generator Flow

For events: wedding, formal dinner, job interview.

### ⭐ 4. Real-time price constraint optimization

AI automatically re-ranks by price.
