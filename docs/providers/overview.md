---
sidebar_position: 1
---

# Overview

Ragpi supports multiple Large Language Model (LLM) providers for chat and embedding generation. Each provider can be configured using specific environment variables.

## Choosing a Provider

You can specify which providers to use via environment variables:

```env
CHAT_PROVIDER = openai | ollama | deepseek | openai_compatible
EMBEDDING_PROVIDER = openai | ollama | openai_compatible
```

Each provider has its own set of configuration options. You can find the configuration options for each provider under their respective pages.

## General Configuration

### Model Configuration

- **Chat Model:**

  - Set default chat model: `DEFAULT_CHAT_MODEL` (e.g., `gpt-4o`)
  - Can be overridden in chat request payload using `model` field

  **Note:** For chat providers, only models that support tool/function callings are supported.

- **Embedding Model:**
  - Configure via `EMBEDDING_MODEL` (e.g., `text-embedding-3-small`)
  - Ensure `EMBEDDING_DIMENSIONS` matches your model's output (e.g., `EMBEDDING_DIMENSIONS=1536`)

### Chat Configuration

- **History Limit:**

  - Maximum number of messages retained in the chat history and sent to the model.
  - Controlled by `CHAT_HISTORY_LIMIT` (default: `20`).

- **Max Chat Iterations:**
  - Maximum steps allowed for generating a response
  - Controlled by `MAX_CHAT_ITERATIONS` (default: `5`).
