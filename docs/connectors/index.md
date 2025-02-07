---
sidebar_position: 1
---

# Connectors

Ragpi supports multiple connectors for building knowledge bases from various sources. Each connector is designed to handle specific types of data sources and implements common chunking and processing logic. They can be created using the [`/sources`](../api/#tag/sources/POST/sources) API endpoint.

## Available Connectors

Ragpi currently supports the following connectors:

- [Sitemap Connector](./sitemap) - Extract and process pages from a website using a sitemap
- [GitHub Issues Connector](./github-issues) - Extract and process issues from a GitHub repository
- [GitHub README Connector](./github-readme) - Extract and process content from a GitHub repo README files

:::note GitHub Requirements
All GitHub connectors require a `GITHUB_TOKEN` environment variable with a valid GitHub access token.
:::
