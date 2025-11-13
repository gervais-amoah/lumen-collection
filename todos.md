# AI Shop Assistant MVP - Progress Tracker

## ✅ **DONE**

- [x] Project setup (Next.js + Supabase + Gemini)
- [x] Database schema & products table
- [x] Product embeddings (pre-computed)
- [x] Semantic search function in Supabase
- [x] Vector index created
- [x] Basic API route structure (`/api/converse`)
- [x] Gemini integration for intent analysis (`getSearchIntent`)
- [x] Vector search service (`semanticSearch`)
- [x] Type definitions (Product, CachedResults, etc.)
- [x] Cache system implementation
- [x] Implement `generatePersonalizedReply` function
- [x] Integrate cache in API route
- [x] Add personalization step after search

## 🚨 **BACKEND - IN PROGRESS**

- [ ] Add **system instructions** to Gemini API
- [ ] Make the intent prompt output the category, and use it in filtering (hybrig, vector + metadata search); let's it actually return the filtering _"object"_ too, if there must be any
- [ ] Complete error handling for full workflow
- [ ] Handle rate limit error
- [ ] Limit token or chat messages turn to 10 (maybe generate an uuid on the frontend and send it to backend, or limit should be for all users?)

## 📋 **FRONTEND - TODO**

- [ ] Main layout (65/35 split)
- [ ] Chat panel component
- [ ] Product grid component
- [ ] Product cards with add-to-cart
- [ ] Cart state management
- [ ] Loading states & animations
- [ ] Checkout page (mock)

## 🎯 **NEXT PRIORITY**

1. Complete backend: `generatePersonalizedReply` + cache integration
2. Build frontend layout & chat interface
3. Connect frontend to API
4. Add cart functionality
5. If possible, make "add to cart" and "process to checkout" done through chat too (Agent behavior)

**Current Block**: Backend personalization step
