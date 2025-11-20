# AI Shop Assistant: MVP - Progress Tracker

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
- [ ] Use (Reat Bits)[https://reactbits.dev/get-started/introduction] for animation effects

## 🎯 **NEXT PRIORITY**

1. Complete backend: `generatePersonalizedReply` + cache integration
2. Build frontend layout & chat interface
3. Connect frontend to API
4. Add cart functionality
5. If possible, make "add to cart" and "process to checkout" done through chat too (Agent behavior)

**Current Block**: Backend personalization step

--- gev

Let's me share the details about the fellowship and we will examinate if a simple local demo (video record + github repo link) would be sufficient, or if I should have a live demo. This is serious, so evaluate it correctly and be truthful. Do not just tell me what you think would please me or I would like to hear.
Fellowship description:

```md
## Details

The Builder Fellowship places rising AI talent inside Block’s design and engineering teams to tackle real challenges in the financial system. You’ll build products, prototypes, and AI tools across Square, Cash App, Afterpay, Tidal, Proto, and Bitkey, as well as new initiatives and internal projects. We’re looking for emerging builders and self-taught experimenters who are exploring, making, and pushing boundaries with AI. Excellence and proof of building are what matters — not work experience, résumé, or diploma.

Ten fellows. Six months. Fully paid, remote optional. Potential to convert to full-time.

## Engineering track

We’re looking for product-facing engineers who see AI as part of the stack. If you’re building with new tools, experimenting with new patterns, and rethinking how software gets made, this fellowship is for you.

## How do you select Fellows?

We look for proof you can build. Show us your work — code, prototypes, visuals, experiments, or ideas in motion. A panel of designers, engineers, and creative technologists evaluate the applications for curiosity, craft, and bold experimentation.

Selected candidates will showcase their work and talk with our builders across design, engineering, and product. The process explores craft, creativity, technical fluency, and collaboration, reflecting the way we build at Block.

## What’s next?

Start gathering your proof of work: experiments, builds, prototypes, or creative projects. If you’re curious, inventive, and ready to reimagine how things get made with AI, we want to see what you’ve built.

Show us what you’ve built.
```

---

USER: Hello

ASSISTANT: Hi there! What can I help you find today?

USER: I'm looking for jacket

ASSISTANT: Sure! Are you looking for a specific type of jacket, like a denim jacket, a blazer, or a puffer jacket?

USER: Anything will do.

ASSISTANT: Since anything will do, let's start with a classic that's always a good choice. The Mira Denim Bomber is a versatile layering piece, perfect for cool weather and pairs well with almost anything. Its mid-weight denim and quilted lining make it both stylish and practical.

USER: It's pretty expensive. How something cheaper?

ASSISTANT: I understand! Let's look at some more budget-friendly options. The Zara Tote with Fringe is a stylish and practical choice at $85. It's a large tote made of soft leather, perfect for carrying your essentials in style. It would be a great everyday bag!

USER: That is not a jacket

ASSISTANT: My apologies! You're absolutely right, the Zara Tote with Fringe is a handbag, not a jacket. Let me get back to jacket options for you. The Mira Denim Bomber is a great casual choice at $130, and the Clara Wool Blazer offers a more polished look for $145. Both are fantastic layering pieces!

USER: Are those all the jackets you have?

ASSISTANT: Yes, those are all the jacket options currently available! We have the casual Mira Denim Bomber, the classic Clara Wool Blazer, and the timeless Trench Coat. Would you like to explore any of these further?
