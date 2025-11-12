---
title: "Workunit: The missing context layer for working with AI"
published: 2025-10-24
description: "Ever lose your train of thought when an LLM hits its context limit? Or struggled to share your work between Claude, GPT, and Gemini? I built Workunit to solve this."
image: 'https://slink.alyx.pink/image/3a3982cd-661e-4a6b-96e8-f459c17b0bdb.png'
tags: ["ai", "productivity", "tools", "workunit", "context", "llm"]
category: 'AI'
draft: false
lang: "en"
---

Hey everyone,

I've been building with AI for a while now, and I kept running into the same frustrating problem: no matter how powerful these models get—Claude, GPT, Gemini—they all eventually lose track of what you're doing. You know the drill: you're deep into building a feature, the context window fills up, the conversation compresses, and suddenly the LLM forgets the plan it carefully crafted an hour ago.

But here's what really bugged me: you can't easily move work between different models. Say you want Claude's planning brilliance but GPT's design chops? Good luck manually copying context between chats. Want two models working on the same codebase? You're basically maintaining two separate conversations that have no idea what the other is doing.

So I built [Workunit](https://workunit.app) to fix this.

![Screenshot of Workunit homepage](https://slink.alyx.pink/image/2d01d86b-32f5-4eb4-934b-68ae0607f626.png)

## The Problem: Context Fragmentation

Here's what I was dealing with:

**Context windows are still too small.** Even the best models compress your conversation after a while. That detailed architecture plan you made at the start? Reduced to a summary. Those important decisions about why you chose approach A over B? Gone. The model starts improvising based on incomplete memory.

**No context sharing between models.** Each AI lives in its own bubble. You can't start planning with Claude, move to Gemini for implementation, then ask GPT to review the code—at least not without manually copying a ton of context every single time.

**Teams can't collaborate with AI.** When you're working with others, everyone's having separate conversations with their preferred models. There's no shared understanding, no single source of truth. Your coworker using GPT has no idea what you just asked Claude to do.

## What is Workunit?

Think of Workunit as a context and memory layer that sits between you and any AI model. It's also a project management tool, but the real magic is how it lets you share context across different models seamlessly.

Here's how it works: instead of just chatting with an AI, you create a **Workunit**. Each workunit contains:

- **The problem you're solving** - clearly defined
- **Success criteria** - what "done" looks like
- **AI context** - a persistent knowledge base where models can dump what they've learned
- **Tasks** - specific work items with their own focused context

Once you've created a workunit, any AI with access to the MCP (Model Context Protocol) integration can read and update it. That means Claude, GPT, Gemini, or whatever new model comes out next month—they all see the same information.

![Screenshot of Workunit dashboard showing a list of workunits with their status, tasks count, and recent activity](https://slink.alyx.pink/image/00c12661-4b0b-4a74-b9ca-660bbcaf7b5f.png)

## Assets: Building your context graph

Here's where Workunit gets really interesting. Beyond just tracking tasks, you can define **Assets**—the building blocks of your project's context. Think of them as the things your AI needs to understand before it starts working.

There are four types of assets:

- **Knowledge** - Your documentation, coding standards, API docs, architecture decisions
- **People** - Team members, stakeholders, even your AI assistants
- **Product** - The actual things you're building (apps, features, platforms)
- **System** - Technical infrastructure (databases, APIs, deployment pipelines)

When you link assets to a workunit, you're creating what I call a "context graph." Now when an AI looks at your workunit, it automatically knows which systems are involved, what documentation to reference, who's working on what, and which products are affected.

And here's the cool part: LLMs can manage these assets themselves through the MCP tools. They can create new assets as they discover them, search for existing ones, and update them when information changes. So if you're working with Claude and mention "we're using PostgreSQL with this specific schema," Claude can create a System asset for it. Later, when GPT needs that context, it can search for and find that PostgreSQL asset without you having to explain it again.

No more "hey Claude, remember we're using PostgreSQL with that specific schema I told you about 50 messages ago?" The context is right there, persistent and accessible.

The best part? Start small. I usually begin with 5-10 core assets—my main database, API documentation, coding guidelines, team members. As projects grow, the asset library grows with them. It's documentation that actually stays useful instead of going stale in some wiki nobody reads.

![Screenshot showing the assets page with different asset types](https://slink.alyx.pink/image/af3e385f-f9e0-4cac-b69c-f281e8ad287d.png)

## How I actually use it

Let me show you a real example. Say I'm building a new authentication system:

1. I start by planning with Claude: "Let's add a 'Won't Do' task status"
2. Claude uses the Workunit MCP to create the structure, defines the problem, sets success criteria, breaks it into tasks
3. I get a URL like `https://workunit.app/workunits/abc123`
4. Later, I can tell GPT: "Take a look at this workunit `https://workunit.app/workunits/abc123` and focus on the database schema task" - with the task URL
5. GPT sees all the context, implements that specific piece, and updates the task status
6. My teammate can comment on tasks, see progress, and even jump in with their own preferred AI

![Screenshot of a workunit detail page showing the problem statement, success criteria, AI context section, and list of tasks with their statuses (todo, in progress, done)](https://slink.alyx.pink/image/cadb23fc-47a2-4eda-aec6-6f5e2fc06daa.png)

The killer feature? I can tell any model to "update task status as you work" and I get a real-time view of what's in progress, what's done, and what's blocked. No more wondering if the AI actually completed something or just said it did.

## Setting up the MCP integration

Getting your AI tools connected to Workunit is straightforward. The Model Context Protocol (MCP) is what makes all this magic happen—it's the bridge that lets AI assistants access Workunit directly from your development environment.

The beauty of using MCP is that Workunit works with **any LLM that supports the Model Context Protocol**. Claude, GPT, Gemini, or whatever comes next—if it supports MCP, it can connect to Workunit. That means you're future-proof as the AI landscape evolves.

Here are setup examples for the most commonly documented tools:

### For Claude Code
Just run this in your terminal:
```bash
claude mcp add --transport http workunit https://workunit.app/mcp
```

Then open Claude Code and ask about available Workunit tools to verify it's working.

### For Gemini CLI
Add the integration with:
```bash
gemini mcp add --transport http workunit https://workunit.app/mcp
```

Once connected, your AI assistant can:
- Create and modify workunits
- Generate and assign tasks
- Link assets to your work
- Access and update context across conversations

The setup process is similar for any MCP-compatible tool—just point it to `https://workunit.app/mcp` and you're good to go. It takes maybe two minutes, and then you've got persistent context across all your AI interactions. Worth it.

For more details and troubleshooting, check out the [MCP integration guide](https://workunit.app/guides/mcp-integration).

## Beyond solo work

Workunit isn't just for working with multiple AI models—though that's incredibly powerful. It's also built for teams:

- **Comments on tasks** - your team can discuss specific work items
- **Check-ins** - gather status updates from everyone in your organization
- **Shared understanding** - humans and AI working from the same source of truth

It's designed for small teams and solo builders who want AI assistance without enterprise complexity. You know, those of us who don't need fancy Gantt charts but do need to actually ship things.

## Why this matters

The AI landscape is moving fast. New models launch every month, each with different strengths. Workunit means you're not locked into one model's ecosystem—you can use the best tool for each job.

More importantly, it solves the memory problem. Context doesn't disappear when a conversation gets long. The AI can always reference back to what you've built together, decisions you've made, and patterns you've established.

And when your team grows? The context layer grows with you. Everyone works from the same foundation instead of scattered conversations across different tools.

## Try it out

Workunit is live in beta right now, completely free while I refine things. I'm looking for feedback from builders who are tired of fighting context windows and want to use multiple AI models effectively.

If you've ever lost a great plan halfway through a conversation, or wished you could seamlessly move work between different models, [give Workunit a shot](https://workunit.app). I'd love to hear what you think.
