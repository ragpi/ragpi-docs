---
sidebar_position: 3
---

# GitHub Issues Connector

The GitHub Issues connector allows you to extract and process issues from a GitHub repository.

[View Full API Reference](/api/#model/githubissuesconfig)

## Features

- Fetches issues and their comments
- Supports filtering by issue state
- Can include/exclude based on labels
- Configurable age limit for issues

## Example Configuration

```json
{
  "type": "github_issues",
  "repo_owner": "example_owner",
  "repo_name": "example_repo",
  "state": "all",
  "include_labels": ["documentation", "bug"],
  "exclude_labels": ["wontfix"],
  "issue_age_limit": 365
}
```

:::note GitHub Requirements
This connector requires a `GITHUB_TOKEN` environment variable with a valid GitHub access token.
:::
