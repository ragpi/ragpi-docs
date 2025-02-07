---
sidebar_position: 3
---

# Connectors

Ragpi supports multiple connectors for building knowledge bases from various sources. Each connector is designed to handle specific types of data sources and implements common chunking and processing logic. They can be created using the `/sources` API endpoint.

## Available Connectors

### Sitemap Connector

The Sitemap connector extracts and processes pages from website sitemaps.

[View Sitemap Configuration](/api/#model/sitemapconfig)

**Features:**

- Processes pages listed in XML sitemaps
- Supports regex patterns for URL filtering
- Respects robots.txt directives
- Converts HTML content to Markdown for processing

**Example Configuration:**

```json
{
  "type": "sitemap",
  "sitemap_url": "https://example.com/sitemap.xml",
  "include_pattern": "https://example.com/docs/*",
  "exclude_pattern": "https://example.com/docs/blog/*"
}
```

### GitHub Issues Connector

The GitHub Issues connector fetches and analyzes issues and comments from GitHub repositories.

[View GitHub Issues Configuration](/api/#model/githubissuesconfig)

**Features:**

- Fetches issues and their comments
- Supports filtering by issue state
- Can include/exclude based on labels
- Configurable age limit for issues

**Example Configuration:**

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

### GitHub README Connector

The GitHub README connector retrieves README files from repositories.

[View GitHub README Configuration](/api/#model/githubreadmeconfig)

**Features:**

- Retrieves README files from repositories
- Can fetch from root and specified subdirectories
- Supports branch/ref selection
- Processes multiple README files as needed

**Example Configuration:**

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

## GitHub Connector Requirements

When using GitHub connectors (Issues or README), you must configure the `GITHUB_TOKEN` environment variable with a valid GitHub access token. The token should have appropriate permissions to access the repositories you want to index.
