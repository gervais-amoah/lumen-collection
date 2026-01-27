# AI-Generated Project Maintenance Checklist

## 🎯 Core Philosophy

**"Understand Before Modifying"** - AI-generated code often works but can be fragile, inconsistent, or have hidden complexity. Your job is to make it robust and maintainable.

---

## 🚨 Initial Project Assessment (First 30 Minutes)

### Codebase Discovery

- [ ] **Run the project** - Does it start? Any immediate crashes?
- [ ] **Check entry points** - Find `main.js`, `index.py`, `App.tsx`, etc.
- [ ] **Scan for AI signatures**:
  - Generic comments like "This function does X"
  - Inconsistent naming patterns
  - Overuse of complex one-liners
  - Missing error handling

### Safety First

- [ ] **Backup current state** - Commit or stash before changes
- [ ] **Identify critical paths** - What absolutely cannot break?
- [ ] **Check for secrets** - No API keys/hardcoded passwords

---

## 🔍 Understanding Phase (Before Any Changes)

### The "3 Questions" for Each File You Touch

1. **What does this file actually do?** (Write a one-sentence summary)
2. **What are its dependencies?** (What breaks if this changes?)
3. **What are the hidden assumptions?** (Look for magic numbers, hardcoded values)

### Quick Understanding Prompts for AI

```
Explain this codebase/file to me like I'm new to the project:
1. What is the overall purpose?
2. What are the key components and how do they interact?
3. Are there any known issues or quirks I should be aware of?
```

---

## 🛠️ Fixing & Refactoring Workflow

### Step 1: Diagnosis (Don't fix yet)

- [ ] **Reproduce the issue** - Can you make it fail consistently?
- [ ] **Isolate the problem** - Which file/function is the culprit?
- [ ] **Understand why it works** (sometimes) - What are the edge cases?

### Step 2: Safe Refactoring Rules

- [ ] **Change one thing at a time**
- [ ] **Write a test first** (if no tests exist, create a simple script)
- [ ] **Keep the interface the same** (change internals, not API)
- [ ] **Verify after each small change**

### Step 3: Common AI-Generated Issues to Fix

Priority order (safety first):

1. **Missing null/undefined checks**
2. **Inconsistent error handling**
3. **Memory/performance issues** (leaks, infinite loops)
4. **Code duplication** (AI loves to repeat patterns)
5. **Overly complex functions** (break them down)

---

## ✨ Adding New Features to AI-Generated Code

### Before Writing New Code

- [ ] **Find similar existing patterns** - Copy the project's style
- [ ] **Check for utility/helper functions** - Don't duplicate
- [ ] **Identify integration points** - Where should this connect?

### Integration Strategy

```
1. Make the new feature self-contained first
2. Test it in isolation
3. Add minimal integration points
4. Test the integration
5. Refactor to fit patterns (optional)
```

### AI Prompt for Context-Aware Features

```
I'm adding [new feature] to this existing codebase.
Based on the current patterns and architecture:
1. Where should this logically live?
2. What existing patterns should I follow?
3. What pitfalls should I avoid?
```

---

## 📋 Maintenance Checklist (Daily Use)

### Before Modifying Any File

- [ ] **Read the whole file** (not just the part you're changing)
- [ ] **Check imports/dependencies**
- [ ] **Note any side effects** (global state, mutations)

### When You Encounter "Weird" AI Code

- [ ] **Add a comment** explaining what it does
- [ ] **Consider adding a test** to lock the behavior
- [ ] **Flag for later refactor** if too complex (don't rewrite now)

### Before Committing Changes

- [ ] **Run existing tests** (if any)
- [ ] **Test your specific change** + related functionality
- [ ] **Check for regressions** - Does something else break?

---

## 🏗️ Architectural Health Check

### Monthly Review (30 minutes)

- [ ] **Look for "code smells"**:
  - Files > 500 lines
  - Functions with 10+ parameters
  - Deep inheritance chains (> 3 levels)
  - Circular dependencies
- [ ] **Check for "AI patterns"**:
  - Inconsistent error handling
  - Mixed naming conventions
  - Duplicated logic with slight variations

### Refactoring Priority Matrix

```
URGENT (Fix Now):
- Security issues
- Crash bugs
- Data corruption risks

IMPORTANT (Plan to fix):
- Code duplication
- Missing tests
- Poor error messages

NICE-TO-HAVE (When time):
- Code style consistency
- Performance optimizations
- Documentation
```

---

## 🤖 AI Personas for Maintenance Work

### Persona 1: "Project Archaeologist"

```
You're helping me understand an existing AI-generated codebase.
Focus on:
1. Reverse-engineering the architecture
2. Identifying patterns (good and bad)
3. Spotting hidden dependencies
4. Explaining WHY things might be done a certain way

Ask me clarifying questions before giving answers.
```

### Persona 2: "Safe Refactorer"

```
You're helping me refactor existing code safely.
Always:
1. Suggest incremental changes
2. Highlight what could break
3. Recommend tests to add first
4. Preserve existing functionality

Never suggest rewriting large portions at once.
```

### Persona 3: "Pattern Matcher"

```
You're helping me add new features that match existing patterns.
Look at the codebase and tell me:
1. How similar features are structured
2. What naming conventions are used
3. Where this new feature should live
4. What existing code I can reuse
```

---

## ⚡ Quick Reference - Maintenance Edition

### When You're Assigned a Bug Fix:

1. **Reproduce → Understand → Fix → Test**
2. **Fix the bug, not the code** (unless clearly related)
3. **Add a test if possible** to prevent regression

### When Adding a New Feature:

1. **Study similar features** first
2. **Build it outside** then integrate
3. **Match existing patterns** (even if imperfect)

### When Everything is "Weird":

1. **Add understanding comments**
2. **Create a "TODO: Refactor" list**
3. **Focus on making it work correctly first**
4. **Improve gradually over time**

---

## 🎯 Success Metrics for Maintenance

- ✅ **No new bugs introduced** while fixing/adding
- ✅ **Code becomes slightly more understandable** with each change
- ✅ **You can explain the system** to someone else
- ✅ **You fixed more than you broke** (net positive)

---

## 🔧 Emergency Toolkit

### When You Break Something:

1. **`git stash`** - Get back to working state
2. **Add console.log/debugger statements**
3. **Simplify** - Remove complexity until it works
4. **Then add back** complexity one piece at a time

### When You Don't Understand:

```
AI Prompt: "I don't understand this block of code. Can you:
1. Explain it line by line
2. Tell me what problem it solves
3. Suggest a simpler alternative
4. Warn me about any gotchas"
```

---

_Remember: You're not just maintaining code; you're taming an AI-generated system. Your goal is to make it predictable, understandable, and reliable—not necessarily perfect._
