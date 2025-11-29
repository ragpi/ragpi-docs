---
sidebar_position: 7
title: REST API
---

import ApiSchema from "@theme/ApiSchema";

# REST API Connector

The REST API connector allows you to fetch and index JSON data from arbitrary cloud endpoints using `GET` or `POST` requests.

## Features

- Support for `GET` and `POST` HTTP methods
- Optional custom headers (authentication, content-type, etc.)
- Optional request `body` for `POST` requests
- JSON path navigation to extract nested data
- Configurable field mapping for title, content, endpoint timeout, and URL
- Automatic chunking of large documents
- Metadata preservation from API responses

## Configuration

### Basic Example (GET Request)

```json
{
  "name": "my-api-data",
  "description": "Data from my REST API",
  "connector": {
    "type": "rest_api",
    "url": "https://api.example.com/documents",
    "method": "GET"
  }
}
```

### Advanced Example (POST with Headers)

```json
{
  "name": "authenticated-api",
  "description": "Protected API endpoint",
  "connector": {
    "type": "rest_api",
    "url": "https://api.example.com/search",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer your-token-here",
      "Content-Type": "application/json"
    },
    "body": {
      "query": "documentation",
      "limit": "100"
    }
  }
}
```

### Example with JSON Path Navigation

If your API returns nested data:

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "id": "1",
        "title": "Document 1",
        "body": "Content here..."
      }
    ]
  }
}
```

Use the `json_path` parameter to navigate to the items array:

```json
{
  "name": "nested-api-data",
  "description": "API with nested response",
  "connector": {
    "type": "rest_api",
    "url": "https://api.example.com/data",
    "method": "GET",
    "json_path": "data.items",
    "title_field": "title",
    "content_field": "body"
  }
}
```

### Example with Custom Field Mapping

If your API uses different field names:

```json
{
  "name": "custom-fields",
  "description": "API with custom field names",
  "connector": {
    "type": "rest_api",
    "url": "https://api.example.com/articles",
    "method": "GET",
    "title_field": "headline",
    "content_field": "text",
    "url_field": "permalink"
  }
}
```

### Example with Custom Timeout for Slow APIs

If your API takes a long time to respond (e.g., processing large datasets):

```json
{
  "name": "slow-api",
  "description": "API that takes several minutes to respond",
  "connector": {
    "type": "rest_api",
    "url": "https://api.example.com/large-dataset",
    "method": "GET",
    "timeout": 600
  }
}
```

Note: The `timeout` is specified in seconds. The default is 300 seconds (5 minutes), but you can increase it for very slow endpoints.

## Configuration Parameters

| Parameter       | Type    | Required | Default   | Description                                                                    |
| --------------- | ------- | -------- | --------- | ------------------------------------------------------------------------------ |
| `type`          | string  | Yes      | -         | Must be "rest_api"                                                             |
| `url`           | string  | Yes      | -         | The API endpoint URL (must start with http:// or https://)                     |
| `method`        | string  | No       | "GET"     | HTTP method ("GET" or "POST")                                                  |
| `headers`       | object  | No       | null      | Custom HTTP headers as key-value pairs                                         |
| `body`          | object  | No       | null      | Request body for POST requests (JSON)                                          |
| `json_path`     | string  | No       | null      | Dot-separated path to navigate nested JSON (e.g., "data.items")                |
| `title_field`   | string  | No       | "title"   | Field name to use as document title                                            |
| `content_field` | string  | No       | "content" | Field name to use as document content                                          |
| `url_field`     | string  | No       | null      | Field name to use as document URL (if not provided, uses API endpoint URL)     |
| `timeout`       | integer | No       | 300       | Request timeout in seconds (useful for slow APIs that take minutes to respond) |

## Expected API Response Format

### Array of Objects

```json
[
  {
    "title": "Document 1",
    "content": "This is the content..."
  },
  {
    "title": "Document 2",
    "content": "More content here..."
  }
]
```

### Single Object

```json
{
  "title": "Single Document",
  "content": "This is the content..."
}
```

### Nested Data

```json
{
  "data": {
    "items": [
      {
        "title": "Document 1",
        "content": "Content..."
      }
    ]
  }
}
```

## Behavior

### Content Extraction

- If the `content_field` is missing, the entire object is serialized as JSON
- Non-string content fields are automatically serialized to JSON
- Missing title fields default to "Document \{index\}"

### Document Chunking

Large documents are automatically chunked according to the configured `CHUNK_SIZE` and `CHUNK_OVERLAP` settings. Chunks are created respecting natural boundaries:

1. Paragraph breaks (`\n\n`)
2. Line breaks (`\n`)
3. Sentence breaks (`. `)
4. Clause breaks (`, `)
5. Word breaks (` `)
6. Character breaks

### Metadata Preservation

All fields except `title_field`, `content_field`, and `url_field` are preserved as metadata in the `RestApiDocument` model for potential future use.

## Error Handling

The connector will raise a `ConnectorException` in the following cases:

- URL doesn't start with `http://` or `https://`
- Request body is provided for GET requests
- HTTP request fails (network error, timeout, 4xx/5xx status)
- Response is not valid JSON
- `json_path` cannot be navigated in the response
- Unexpected errors during fetching or processing
