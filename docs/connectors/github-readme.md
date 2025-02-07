---
sidebar_position: 4
---

# GitHub README Connector

The GitHub README connector allows you to extract and process content from README files in a GitHub repository.

[View Full API Reference](/api/#model/githubreadmeconfig)

## Features

- Retrieves README files from repositories
- Can fetch from root and specified subdirectories
- Supports branch/ref selection

## Example Configuration

```json
{
  "type": "github_readme",
  "repo_owner": "example_owner",
  "repo_name": "example_repo",
  "include_root": true,
  "sub_dirs": ["docs", "examples"],
  "ref": "main"
}
```

:::note GitHub Requirements
This connector requires a `GITHUB_TOKEN` environment variable with a valid GitHub access token.
:::
