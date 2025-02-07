---
sidebar_position: 2
---

# Sitemap Connector

The Sitemap connector allows you to extract and process pages from website sitemaps.

[View Full API Reference](/api/#model/sitemapconfig)

## Features

- Processes pages listed in XML sitemaps
- Supports regex patterns for URL filtering
- Respects robots.txt directives

## Example Configuration

```json
{
  "type": "sitemap",
  "sitemap_url": "https://example.com/sitemap.xml",
  "include_pattern": "https://example.com/docs/*",
  "exclude_pattern": "https://example.com/docs/blog/*"
}
```
