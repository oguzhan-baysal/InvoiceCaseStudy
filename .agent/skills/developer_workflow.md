---
name: GitHub & Vercel Developer Skill
description: provides advanced capabilities for managing GitHub repositories and Vercel deployments.
---

# GitHub & Vercel Skill

This skill empowers the agent to manage the complete development lifecycle using GitHub CLI (`gh`) and Vercel CLI.

## Capabilities

### 1. GitHub Management (`gh`)
- **Flow:** Create branches, commit changes, and open Pull Requests.
- **Review:** List PRs, check status, and add comments.
- **Issues:** Analyze and respond to repository issues.
- **Safe usage:** Always check if a branch exists before creating one. Use meaningful commit messages.

### 2. Vercel Deployment Management (`vercel`)
- **Monitoring:** Check deployment status and fetch preview URLs.
- **Debugging:** Access and analyze build/runtime logs for failed deployments.
- **Configuration:** Manage environment variables and project settings.

## Core Commands Reference

### GitHub
- `gh pr list` / `gh pr status` / `gh pr view`
- `gh repo view --web` (to show the user the repo)
- `git checkout -b <branch-name>`
- `gh pr create --title "<title>" --body "<body>"`

### Vercel
- `vercel list` (recent deployments)
- `vercel logs <deployment-url>`
- `vercel env pull .env.local`

## Instructions for the Agent
1. When a user asks to "deploy" or "push changes", offer to create a feature branch first.
2. After a `git push`, use `gh pr create` to formalize the change.
3. If a Vercel build fails, automatically offer to run `vercel logs` to diagnose the issue.
