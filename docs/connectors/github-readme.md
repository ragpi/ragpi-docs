---
sidebar_position: 4
title: GitHub README
---

import ApiSchema from "@theme/ApiSchema";

# GitHub README Connector

The GitHub README connector allows you to extract and process content from README files in a GitHub repository when [creating a source](/api#tag/Sources/operation/create_source_sources_post).

## Features

- Retrieves README files from repositories
- Can fetch from root and specified subdirectories
- Supports branch/ref selection

## Configuration

<ApiSchema pointer="#/components/schemas/GithubReadmeConfig" />

## Example Payload

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
