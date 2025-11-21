# ✨ Lumen - The Shop that understands you

> Conversational commerce, reinvented. Stop searching, start describing.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://lumen-collection.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

<img width="1440" height="800" alt="Screenshot 2025-11-21 024855" src="https://github.com/user-attachments/assets/50d6a20a-ce0b-4be5-b303-68cf32ea8fd4" />


TL;DR: Lumen is an AI-powered conversational shopping assistant built with Next.js 15, Gemini for intent detection, and Cohere embeddings for semantic product search. Runs fully serverless on Vercel.

This repo is a functional prototype meant as both a demo and a reference implementation for AI-driven conversational commerce.

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

The assistant detects your intent, asks clarifying questions only when needed, and curates product matches.

## 🎥 See the Magic in Action

![Demo GIF](https://github.com/user-attachments/assets/021a9a9c-f14d-4ced-b0c4-e8389f3214c5)


https://github.com/user-attachments/assets/7fa5e69e-eddd-47ef-8558-20dca8dc6da1

_Watch how natural conversation replaces tedious searching_

[**Try Live Demo**](https://lumen-collection.vercel.app/) 

<!--- YouTube Video Walk-through:  · [**Video Walkthrough**](/placeholder-full-demo.mp4) -->

## ⚠️ About This Project

Lumen is an MVP prototype built to demonstrate modern AI capabilities in a shopping context.  
It is **not a full e-commerce application** — there is no real checkout flow, inventory system, or production-grade merchant tooling.

The goal of this project is to showcase:

- AI intent detection
- Conversational UX design
- Semantic product search with vector embeddings
- Full-stack integration across AI models, database, and UI

Use this as a reference architecture or a technical demonstration, not as a drop-in production solution.

## ✨ How It Works

### 1. Describe Naturally

Tell our AI assistant what you're looking for in plain English—no keywords needed.

### 2. Intelligent Conversation

The AI assistant (powered by Google Gemini) understands your intent and asks smart follow-up questions to refine your preferences if needed.

### 3. Semantic Search

Cohere embeddings find products that match your _meaning_, not just keywords.

### 4. Personalized Curation

Get a hand-picked selection of the most relevant items, with AI explaining why they fit your needs.

<!--- Diagram: ![How It Works Diagram](/placeholder-architecture.png) -->

## 🛠️ Tech Stack

**Frontend:** Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui · React Bits  
**AI & Search:** Google Gemini (`gemini-2.5-flash-lite`) · Cohere Embeddings (`embed-v4.0`) · Supabase + pgvector  
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

- [x] Conversational intent detection
- [x] Semantic product search
- [x] Recommendation explanation
- [ ] Advanced style recommendation engine with seasonal trends
- [ ] AI tool calling (assistant can add to cart, proceed to checkout)
- [ ] Voice interface for hands-free shopping
- [ ] Virtual try-on using user photos

## 🤝 Contributing

PRs and suggestions are welcome! See /docs/contributing.md for guidelines.

## 💼 Opportunities

This project demonstrates modern AI/Full-Stack capabilities. Currently exploring new roles in:

- AI Engineering
- Full-Stack Development
- Product Engineering

[Let's connect!](https://www.linkedin.com/in/gervais-amoah/)

## 📄 License

MIT © 2025 Yao Gervais Amoah
