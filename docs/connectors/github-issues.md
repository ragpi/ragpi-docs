---
sidebar_position: 3
title: GitHub Issues
---

import ApiSchema from "@theme/ApiSchema";

# GitHub Issues Connector

The GitHub Issues connector allows you to extract and process issues from a GitHub repository when [creating a source](/api#tag/Sources/operation/create_source_sources_post).

## Features

- Fetches issues and their comments
- Supports filtering by issue state
- Can include/exclude based on labels
- Configurable age limit for issues

## Configuration

<ApiSchema pointer="#/components/schemas/GithubIssuesConfig" />

## Example Payload

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
