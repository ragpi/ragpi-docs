---
sidebar_position: 6
title: GitHub PDF
---

import ApiSchema from "@theme/ApiSchema";

# GitHub PDF Connector

The GitHub PDF connector allows you to index all PDF files from a GitHub repository, including those in subdirectories. This is useful for indexing technical documentation, datasheets, hardware schematics, and other PDF-based resources. The PDFs must include extractable text. Purely scanned pages without OCR (e.g. images) will not produce any usable text.

## Features

- **Recursive Traversal**: Automatically discovers all PDF files in the entire repository directory structure
- **Text Extraction**: Extracts text content from PDFs using `pypdf` library
- **Path Filtering**: Optional path filter to index only PDFs in specific directories
- **Branch/Tag Support**: Specify a particular branch, tag, or commit ref to index
- **Chunking**: Automatically chunks large PDF documents for optimal retrieval

## Configuration

### Required Parameters

- `type`: Must be `"github_pdf"`
- `repo_owner`: GitHub repository owner/organization name
- `repo_name`: GitHub repository name

### Optional Parameters

- `ref`: Branch, tag, or commit SHA to index (defaults to the repository's default branch)
- `path_filter`: Path prefix to limit indexing to specific directories (e.g., `"docs/"` to only index PDFs in the docs folder)

## Example Usage

### Basic Example - Index All PDFs

```json
{
  "name": "hardware-docs",
  "description": "Hardware schematics and datasheets from our hardware repository",
  "connector": {
    "type": "github_pdf",
    "repo_owner": "your-org",
    "repo_name": "hardware-repo"
  }
}
```

### With Path Filter

Index only PDFs in the `schematics/` directory:

```json
{
  "name": "schematics-only",
  "description": "Hardware schematics from the schematics directory",
  "connector": {
    "type": "github_pdf",
    "repo_owner": "your-org",
    "repo_name": "hardware-repo",
    "path_filter": "schematics/"
  }
}
```

### With Specific Branch

Index PDFs from the `develop` branch:

```json
{
  "name": "dev-hardware-docs",
  "description": "Hardware documentation from the develop branch",
  "connector": {
    "type": "github_pdf",
    "repo_owner": "your-org",
    "repo_name": "hardware-repo",
    "ref": "develop"
  }
}
```

## Requirements

- A GitHub personal access token must be configured in the `GITHUB_TOKEN` environment variable
- The token must have read access to the target repository
- PDFs must contain extractable text (scanned images without OCR will not yield text content)

## How It Works

1. **Discovery**: The connector fetches the complete repository tree recursively from GitHub's API
2. **Filtering**: Identifies all files with `.pdf` extension (case-insensitive)
3. **Path Filtering**: If `path_filter` is specified, only PDFs matching the path prefix are processed
4. **Download**: Each PDF is downloaded via GitHub's blob API
5. **Text Extraction**: Text is extracted from each page of the PDF
6. **Chunking**: The extracted text is split into chunks (default 512 tokens with 50 token overlap)
7. **Indexing**: Each chunk is indexed with embeddings for semantic search

## Limitations

- PDFs must contain extractable text. Scanned images or image-based PDFs without OCR will appear empty
- Very large PDFs may take longer to process
- GitHub API rate limits apply (the connector includes automatic rate limit handling)
- Password-protected or encrypted PDFs are not supported

## Troubleshooting

### No text extracted from PDFs

- Ensure PDFs contain actual text, not just scanned images
- Some PDFs may use non-standard encodings or fonts that make text extraction difficult

### PDFs not being found

- Verify the repository name and owner are correct
- Check that the `ref` (if specified) exists in the repository
- Ensure the `path_filter` (if specified) matches your repository structure
- Verify your GitHub token has read access to the repository
