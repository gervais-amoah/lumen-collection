# 🧩 Lumen - AI Shopping Assistant

> Conversational commerce, reinvented. Stop searching, start describing.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://lumen-collection.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

![Lumen Interface](/placeholder-hero-screenshot.png)

## The Problem: Shopping Feels Broken

Ever found yourself endlessly scrolling through hundreds of products, trying different search terms, clicking through filters, and still not finding what you actually want?

**Traditional e-commerce makes you do all the work:**

- Guess the right keywords
- Master complex filter systems
- Navigate overwhelming catalogs alone
- Settle for "close enough" results

It's like being in a boutique where everyone ignores you.

## The Solution: Your Personal AI Clerk

Lumen brings back the human touch of in-store shopping through AI. Instead of searching, you **conversationally describe** what you need:

> "I need a summer dress for a beach wedding"  
> "Something professional but not boring for my presentation"  
> "Comfy shoes I can walk in all day that still look stylish"

Our AI assistant understands your intent, asks clarifying questions, and curates perfect matches from the catalog—just like a real personal stylist.

## 🎥 See the Magic in Action

![Demo Video](/placeholder-demo-video.gif)

_Watch how natural conversation replaces tedious searching_

[**Try Live Demo**](https://lumen-demo.vercel.app) · [**Video Walkthrough**](/placeholder-full-demo.mp4)

## ✨ How It Works

### 1. Describe Naturally

Tell our AI assistant what you're looking for in plain English—no keywords needed.

### 2. Intelligent Conversation

The AI assistant (Gemini here) understands your intent and asks smart follow-up questions to refine your preferences if needed.

### 3. Semantic Search

Cohere embeddings find products that match your _meaning_, not just keywords.

### 4. Personalized Curation

Get a hand-picked selection of the most relevant items, with AI explaining why they fit your needs.

![How It Works Diagram](/placeholder-architecture.png)

## 🛠️ Tech Stack

**Frontend:** Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui · React Bits
**AI & Search:** Google Gemini · Cohere Embeddings · Supabase + pgvector  
**Infrastructure:** Vercel · Serverless Functions  
**Database:** PostgreSQL · Vector Similarity Search

## 🚀 Quick Start

Run Lumen locally in 5 minutes:

```bash
# 1. Clone and install
git clone https://github.com/gervais-amoah/lumen-style.git
cd lumen-style
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Add your API keys:
# GOOGLE_GEMINI_API_KEY=your_key_here
# COHERE_API_KEY=your_key_here
# SUPABASE_URL=your_url_here
# SUPABASE_ANON_KEY=your_key_here

# 3. Set up database (run in Supabase SQL editor)
CREATE EXTENSION IF NOT EXISTS vector;
-- Import schema from /docs/schema.sql

# 4. Start developing
npm run dev
```

Visit `http://localhost:3000` and start chatting with your AI stylist!

## 🛣️ Roadmap

**Near Term (Q2 2026)**

- [ ] Multi-merchant support & inventory sync
- [ ] Advanced style recommendation engine with seasonal trends
- [ ] Outfit building & coordination across categories

**Mid Term (Q3 2026)**

- [ ] AI tool calling (assistant can add to cart, proceed to checkout)
- [ ] Voice interface for hands-free shopping
- [ ] Social sharing of curated collections

**Future Vision**

- [ ] Virtual try-on using user photos
- [ ] AR preview showing how clothing would look on you
- [ ] Personalized style evolution based on user feedback

## 💼 Opportunities

This project demonstrates modern AI/Full-Stack capabilities. Currently exploring new roles in:

- AI Engineering
- Full-Stack Development
- Product Engineering

[Let's connect!](https://www.linkedin.com/in/gervais-amoah/)

## 📄 License

MIT © 2025 Yao Gervais Amoah

---

**Stop searching. Start describing.** ✨
