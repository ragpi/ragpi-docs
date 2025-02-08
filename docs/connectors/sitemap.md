---
sidebar_position: 2
title: Sitemap
---

import ApiSchema from "@theme/ApiSchema";

# Sitemap Connector

The Sitemap connector allows you to extract and process pages from website sitemaps when [creating a source](/api#tag/Sources/operation/create_source_sources_post).

## Features

- Processes pages listed in XML sitemaps
- Supports regex patterns for URL filtering
- Respects robots.txt directives

## Configuration

<ApiSchema pointer="#/components/schemas/SitemapConfig" />

## Example Payload

```json
{
  "type": "sitemap",
  "sitemap_url": "https://example.com/sitemap.xml",
  "include_pattern": "https://example.com/docs/*",
  "exclude_pattern": "https://example.com/docs/blog/*"
}
```
