# AI-Assisted Development: Essential Checklist

## Core Principle

**"Understand > Accept > Improve"** - Only use code you comprehend. If AI writes something magical, make it unmystical.

---

## 🎯 The 20% That Gives 80% Results

### 1. AI Code Sanity Check

- [ ] **Can I explain it** in one sentence?
- [ ] **Does it solve ONLY** the current problem? (Not over-engineered)
- [ ] **Do you understand every part** of the code? (No "magic" or unclear sections)
- [ ] **Would this pass** a basic code review?

_If any NO → Ask AI to simplify or rewrite in your own words._

### 2. Before Commit (The 3 Must-Do's)

- [ ] **One logical change** per commit
- [ ] **Tested locally** with at least 2 cases (happy path + 1 edge)
- [ ] **Clear commit message**: `type: what changed (why if not obvious)`
  - Types: `feat|fix|docs|style|refactor|test|chore`

### 3. Before Push/PR (Quality Gate)

- [ ] **Feature actually works** (manual smoke test)
- [ ] **No breaking changes** to existing functionality
- [ ] **No obvious bugs** (null checks, error handling present)
- [ ] **Code is readable** (good names, no/commented clever one-liners)

---

## 🚨 The "Oh No" Checklist (Red Flags)

If you see these, stop and fix:

- [ ] **Magic numbers/strings** without explanation
- [ ] **Nested callbacks > 2 levels deep**
- [ ] **Functions > 50 lines**
- [ ] **Copy-pasted code** (even from AI)
- [ ] **No error handling** on external calls
- [ ] **Overly complex regex** without tests

---

## 🤖 AI Persona Prompts

### Persona 1: "Code Assistant" (When Generating New Code)

```
You are a senior developer pairing with a mid-level developer who wants to learn while working.
When writing code:

1. EXPLAIN your approach in simple terms first
2. Write CLEAR, readable code (avoid clever one-liners)
3. Add BRIEF comments for non-obvious parts
4. Suggest alternative approaches and why you chose this one
5. Mention any trade-offs or limitations

Goal: Help me understand, not just get working code.
```

### Persona 2: "Code Reviewer" (When Reviewing Existing Code)

```
You are a constructive code reviewer focused on learning and quality.
Review this code and:

1. Start with ONE positive thing
2. Identify the 1-2 most important issues (safety > performance > style)
3. Explain WHY each issue matters in practical terms
4. Suggest concrete improvements with examples
5. Ask one thought-provoking question about the design

Be specific, kind, and practical. No nitpicking.
```

---

## 📚 Learning Focus Areas

Instead of trying to master everything, focus on understanding:

1. **Data flow** - Where does data come from, where does it go?
2. **Error paths** - What happens when things fail?
3. **API boundaries** - How do components talk to each other?

**Weekly learning goal**: Understand ONE new concept from AI-generated code.

---

## ⚡ Quick Reference

### Daily Workflow:

1. **Write/test small chunk** → Understand it → Commit
2. **Repeat** until feature done
3. **Push to feature branch** (safe anytime)
4. **Create PR** → Do final review → Merge

### When Stuck:

- First: **Try to write it yourself** (even if messy)
- Then: **Ask AI for help** with specific part
- Always: **Understand before using**

### Success Metrics:

- ✅ Can explain every line you commit
- ✅ Code works AND is readable
- ✅ Learned one new thing today

---

_Remember: The goal is progress, not perfection. You're building software AND skills simultaneously._
