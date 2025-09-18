---
title: "Cloudflare's Bold Documentation: Just Let the AI Do It"
published: 2025-09-12
description: "Cloudflare's migration docs casually suggest letting an LLM handle your entire project migration. And you know what? It actually works."
image: 'https://slink.alyx.pink/image/e39c3fff-c8f1-4c35-8df3-cd0faa7ee7e5.jpg'
tags: ["cloudflare", "ai", "migration", "documentation", "llm", "automation"]
category: 'Development'
draft: false
---

*Picture from [Sharad Bhat](https://unsplash.com/fr/@sharadmbhat?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/fr/photos/un-grand-nuage-orange-dans-un-ciel-sombre-_Z0JGI6FGlA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)*

I stumbled across something fascinating in Cloudflare's documentation recently—something that made me do a double-take and then immediately try it out.

Hidden in their migration guides is this wonderfully matter-of-fact suggestion: "or if you want to just do the migration automatically by your LLM, feed it this file and let it happen."

Not buried in a footnote. Not hedged with disclaimers. Just a casual "hey, your AI can probably handle this entire migration for you."

## The Documentation Revolution

This is remarkable for a few reasons. First, it's Cloudflare—a major infrastructure company—officially endorsing AI automation for non-trivial technical tasks. Second, they're not just mentioning it as a possibility; they're providing structured documentation specifically designed to be consumed by LLMs.

Most documentation is written for humans, with context and explanations that help us understand the "why" behind each step. But when you're feeding instructions to an AI, you want something different: precise, structured information that can be parsed and executed systematically.

Cloudflare seems to have cracked this code. Their migration files are clean, comprehensive, and apparently LLM-friendly enough that they can confidently tell developers to "just let it happen."

## The One-Shot Migration

I tested this approach, and it worked exactly as advertised. Fed the migration guide to an AI assistant, pointed it at my project, and watched it methodically work through the entire migration process.

No back-and-forth debugging sessions. No missed steps. No "oh wait, I forgot to update that config file" moments. Just a systematic, thorough migration that actually worked on the first try.

This isn't some toy example either—we're talking about migrating real projects with real complexity, dependencies, and edge cases.

## The AI-Optimized Structure

What makes this documentation so effective becomes clear when you look at how it's structured. Here's a section that perfectly demonstrates the AI-friendly approach:

```
### 3. Determine Project Type

**First, check for Pages Functions:**

- Look for a `functions/` directory with .js/.ts files
- If found, you **must** add `wrangler pages functions build` to your build process (see step 6)

**Then, run your build command and check the output directory:**

- **If _worker.js exists**: You have a Workers script project
  - Add `"main": "./path/to/_worker.js"`
  - Add binding to assets: `"assets": {"directory": "path", "binding": "ASSETS"}`
- **If no _worker.js**: You have an assets-only project
  - Just use `"assets": {"directory": "path"}` without main field

### 6. Pages Functions Migration (if applicable)

**ONLY if you have a `functions/` directory with .js/.ts files:**

- **Always add** the Pages Functions build command to your build process
```

Notice the clear conditional logic, the explicit use of "**must**" and "**ONLY if**", and the decision trees. This isn't documentation—it's a structured algorithm that an AI can follow step-by-step without ambiguity.

## What This Means for Documentation

Cloudflare's approach hints at something bigger: the future of technical documentation might be dual-purpose. Written for humans to understand, but structured for machines to execute.

This could fundamentally change how we approach complex technical processes. Instead of hoping developers follow 47 steps correctly, why not provide instructions that an AI can execute flawlessly?

The implications go beyond migrations. Think about deployment guides, security audits, refactoring tasks, or any process that involves systematic changes across a codebase.

## The Trust Factor

What strikes me most is the confidence behind that casual suggestion. Cloudflare didn't arrive at "just let the AI do it" overnight. They've clearly tested this extensively and found it reliable enough to recommend to their users.

That level of trust in AI automation for production systems feels like a significant shift. We're moving from "AI might help with some tasks" to "AI can handle entire categories of work better than humans."

## Looking Forward

This feels like one of those moments where the future quietly announces itself. Not with fanfare or keynotes, but with a single line in technical documentation that changes how we think about automation.

Other companies will likely follow suit. The pattern is too useful to ignore: provide structured, AI-consumable documentation alongside human-readable guides.

The question isn't whether this approach will spread—it's how quickly, and what other technical processes will benefit from this dual-purpose documentation strategy.

Cloudflare just showed us what confident AI integration looks like: practical, tested, and casually revolutionary.
