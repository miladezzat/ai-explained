---
title: Git worktrees for parallel coding agents
slug: git-worktrees
description: Why parallel AI coding agents need separate checkouts, how git worktree gives each one its own files and branch, and how Claude Code sets them up for you.
date: 2026-11-22
series: ai-explained
youtube: BnCpdMMONuM
facebook: https://facebook.com/reel/1755258065532281
instagram: https://www.instagram.com/p/DgCXEl0oIOn/
tags: git, ai agents, coding agents, developer tools, ai engineering
---
Two coding agents, one folder. What could go wrong? **Everything.** Give each one a git worktree.

## The problem with one checkout

When two agents work in the same checkout, they edit the same files, switch branches under each other, and break each other's builds. Their work can only be untangled by hand.

## What a worktree is

The Git manual puts it simply: "A git repository can support multiple working trees, allowing you to check out more than one branch at a time."

A repository has one main worktree and any number of linked ones. Each linked worktree shares the repository, "sharing everything except per-worktree files such as `HEAD`, `index`, etc." So commits and branches are shared, but each folder has its own files and its own checked-out branch.

```bash
git worktree add ../app-auth -b auth
```

That creates a new folder, `../app-auth`, on a new branch called `auth`.

One rule to know: Git refuses to check out the same branch in two worktrees at once. `add` "refuses to create a new worktree when <commit-ish> is a branch name and is already checked out by another worktree", unless you force it.

## One agent per worktree

Now agent one can build a feature in its worktree while agent two fixes a bug in another, and neither touches the other's files.

Claude Code does this for you. As its docs say, "Pass `--worktree` or `-w` with a name to create an isolated worktree and start Claude in it":

```bash
claude --worktree feature-auth
```

The worktree is created under `.claude/worktrees/feature-auth/` on a new branch named `worktree-feature-auth`. When you exit, "Claude checks the worktree for work that removal would delete." An unnamed worktree with no changes is cleaned up automatically; otherwise you're asked whether to keep it.

## Setting each one up

- **Install dependencies.** "A worktree is a fresh checkout, so initialize your development environment there."
- **Copy local config.** Gitignored files like `.env` aren't in the new checkout. List them in a `.worktreeinclude` file and Claude Code copies them into every new worktree.
- **Subagents too.** "Subagents can run in their own worktrees so parallel edits don't conflict."

## Housekeeping

- `git worktree list` shows every worktree, main one first.
- `git worktree remove <path>` deletes a worktree, but "Only clean worktrees (no untracked files and no modification in tracked files) can be removed" unless you force it.
- `git worktree prune` cleans up metadata for worktrees whose folders you deleted by hand.

One thing worktrees don't do (general practice): they isolate files, not decisions. You still review and merge each agent's branch.

> One agent, one worktree.

## Sources

- [Git manual: git-worktree](https://www.kernel.org/pub/software/scm/git/docs/git-worktree.html)
- [Claude Code docs: Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees)
