---
sidebar_position: 2
---

# LLM Providers

Ragpi supports multiple Large Language Model (LLM) providers for chat and embedding generation. These providers can be configured using environment variables.

## Supported Providers

### OpenAI (Default)

- **Supports**: Chat and Embedding
- **Configuration**:
  - **Required Environment Variable:**
    - `OPENAI_API_KEY`
  - **Provider Value:** `openai` (default)

---

### Ollama

- **Supports**: Chat and Embedding
- **Configuration**:
  - **Required Environment Variable:**
    - `OLLAMA_BASE_URL`
  - **Provider Value:** `ollama`

---

### Deepseek

- **Supports**: Chat Only
- **Configuration**:
  - **Required Environment Variable:**
    - `DEEPSEEK_API_KEY`
  - **Provider Value:** `deepseek`

---

### OpenAI Compatible Providers

- **Supports**: Chat and Embedding
- **Chat Configuration:**
  - **Required Environment Variables:**
    - `CHAT_OPENAI_COMPATIBLE_API_KEY`
    - `CHAT_OPENAI_COMPATIBLE_BASE_URL`
- **Embedding Configuration:**
  - **Required Environment Variables:**
    - `EMBEDDING_OPENAI_COMPATIBLE_API_KEY`
    - `EMBEDDING_OPENAI_COMPATIBLE_BASE_URL`
- **Provider Value:** `openai_compatible`

---

## Configuring Providers

You can specify which providers to use via environment variables. The following variables determine which provider will be used for each functionality:

```env
CHAT_PROVIDER=openai | ollama | deepseek | openai_compatible

EMBEDDING_PROVIDER=openai | ollama | openai_compatible
```

## Model and Chat Settings

In addition to choosing an LLM provider, Ragpi allows you to configure the underlying model and chat settings that directly impact how interactions and embeddings are generated.

### Model Selection

Ragpi supports configuring different models for chat responses and embeddings.

- **Chat Model:**

  - Configure the default model used for generating chat responses using the `DEFAULT_CHAT_MODEL` environment variable.
  - Example: `gpt-4o-mini`
  - Can be overridden by specifying the `model` field in the chat request payload.

- **Embedding Model:**
  - Set the embedding model with the `EMBEDDING_MODEL` environment variable.
  - Example: `text-embedding-3-small`
  - **Note:** Ensure that `EMBEDDING_DIMENSIONS` is correctly set to match the output dimensions of your chosen embedding model.
  - Example: `EMBEDDING_DIMENSIONS=1536`

### Chat Settings

Ragpi provides customization options for managing conversations and response generation behavior.

- **History Limit:**

  - Maximum number of messages retained in the chat history and sent to the model.
  - Controlled by `CHAT_HISTORY_LIMIT` (default: `20`).

- **Max Chat Iterations:**
  - Limits the number of attempts to retrieve sources and generate a response.
  - Controlled by `MAX_CHAT_ITERATIONS` (default: `5`).
