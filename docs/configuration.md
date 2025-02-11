---
sidebar_position: 2
---

# Configuration

Ragpi uses the following environment variables to configure its behavior. These settings control everything from API access and provider configurations to database connections and document processing.

## Application Configuration

| Variable                  | Description                                   | Default                                                                                                                             | Notes                                                                                                                                                                                    |
| ------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RAGPI_VERSION`           | API version of Ragpi                          | `Latest available version`                                                                                                          | Used in the OpenAPI spec and in `docker-compose.prod.yml` to specify the Ragpi image version                                                                                             |
| `API_NAME`                | Name of the API service                       | `Ragpi`                                                                                                                             | Used in the OpenAPI spec                                                                                                                                                                 |
| `API_SUMMARY`             | Summary of the API service                    | `Ragpi is an AI assistant specialized in retrieving and synthesizing technical information to provide relevant answers to queries.` | Used in the OpenAPI spec                                                                                                                                                                 |
| `API_KEYS`                | List of API keys for access (comma-separated) | None                                                                                                                                | If not set, the API will be accessible without authentication. To enable API key authentication, set this to a comma-separated list of self-generated API keys (e.g., `key1,key2,key3`). |
| `WORKERS_ENABLED`         | Enable/disable background workers             | `True`                                                                                                                              | When disabled, endpoints requiring Celery workers will return a `503`                                                                                                                    |
| `TASK_RETENTION_DAYS`     | Number of days to retain task history         | `7`                                                                                                                                 | -                                                                                                                                                                                        |
| `LOG_LEVEL`               | Logging level                                 | `INFO`                                                                                                                              | Options: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`                                                                                                                                 |
| `USER_AGENT`              | User agent string for HTTP requests           | `Ragpi`                                                                                                                             | -                                                                                                                                                                                        |
| `MAX_CONCURRENT_REQUESTS` | Maximum number of concurrent requests         | `10`                                                                                                                                | -                                                                                                                                                                                        |

## Provider Configuration

| Variable                               | Description                                             | Default  | Notes                                |
| -------------------------------------- | ------------------------------------------------------- | -------- | ------------------------------------ |
| `CHAT_PROVIDER`                        | Chat service provider. Options: `openai`, `ollama`      | `openai` | -                                    |
| `EMBEDDING_PROVIDER`                   | Embedding service provider. Options: `openai`, `ollama` | `openai` | -                                    |
| `OPENAI_API_KEY`                       | API key for OpenAI services                             | None     | Required if using OpenAI as provider |
| `OLLAMA_BASE_URL`                      | Base URL for Ollama provider                            | None     | Required if using Ollama as provider |
| `DEEPSEEK_API_KEY`                     | API key for DeepSeek services                           | None     | Optional                             |
| `CHAT_OPENAI_COMPATIBLE_BASE_URL`      | Base URL for OpenAI-compatible chat models              | None     | Optional                             |
| `CHAT_OPENAI_COMPATIBLE_API_KEY`       | API key for OpenAI-compatible chat models               | None     | Optional                             |
| `EMBEDDING_OPENAI_COMPATIBLE_BASE_URL` | Base URL for OpenAI-compatible embedding models         | None     | Optional                             |
| `EMBEDDING_OPENAI_COMPATIBLE_API_KEY`  | API key for OpenAI-compatible embedding models          | None     | Optional                             |

## Database Configuration

| Variable                    | Description                                    | Default                             | Notes                                                                                    |
| --------------------------- | ---------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `REDIS_URL`                 | Redis connection URL                           | `redis://localhost:6379`            | **Required**                                                                             |
| `POSTGRES_URL`              | PostgreSQL database URL                        | `postgresql://localhost:5432/ragpi` | Required if using postgres backend                                                       |
| `DOCUMENT_STORE_BACKEND`    | Document store backend (`postgres`, `redis`)   | `postgres`                          | -                                                                                        |
| `DOCUMENT_STORE_NAMESPACE`  | Namespace for document storage                 | `document_store`                    | When using `postgres`, this is the table name; when using `redis`, it is the key prefix. |
| `SOURCE_METADATA_BACKEND`   | Metadata storage backend (`postgres`, `redis`) | `postgres`                          | -                                                                                        |
| `SOURCE_METADATA_NAMESPACE` | Namespace for metadata storage                 | `source_metadata`                   | When using `postgres`, this is the table name; when using `redis`, it is the key prefix. |

## Chat Settings

| Variable              | Description                                                                    | Default     |
| --------------------- | ------------------------------------------------------------------------------ | ----------- |
| `BASE_SYSTEM_PROMPT`  | Default system prompt for the AI assistant                                     | _See below_ |
| `CHAT_HISTORY_LIMIT`  | Maximum number of messages retained in the chat history and sent to the model. | `20`        |
| `MAX_CHAT_ITERATIONS` | Maximum steps allowed for generating a response                                | `5`         |
| `RETRIEVAL_TOP_K`     | Number of top retrieval results                                                | `10`        |

## Model Settings

| Variable               | Description                         | Default                  | Notes                                                          |
| ---------------------- | ----------------------------------- | ------------------------ | -------------------------------------------------------------- |
| `DEFAULT_CHAT_MODEL`   | Default model for chat interactions | `gpt-4o`                 | Only models that support tool/function callings are supported. |
| `EMBEDDING_MODEL`      | Model used for embeddings           | `text-embedding-3-small` | -                                                              |
| `EMBEDDING_DIMENSIONS` | Dimensions for embedding vectors    | `1536`                   | Must match dimensions of selected embedding model              |

## Document Processing

| Variable                   | Description                                         | Default                                |
| -------------------------- | --------------------------------------------------- | -------------------------------------- |
| `DOCUMENT_UUID_NAMESPACE`  | UUID namespace for document IDs                     | `ee747eb2-fd0f-4650-9785-a2e9ae036ff2` |
| `CHUNK_SIZE`               | Size of document chunks for processing (in tokens)  | `512`                                  |
| `CHUNK_OVERLAP`            | Overlap size between document chunks (in tokens)    | `50`                                   |
| `DOCUMENT_SYNC_BATCH_SIZE` | Number of documents processed per batch during sync | `500`                                  |

## GitHub

| Variable             | Description                             | Default      |
| -------------------- | --------------------------------------- | ------------ |
| `GITHUB_TOKEN`       | GitHub token for accessing repositories | None         |
| `GITHUB_API_VERSION` | GitHub API version                      | `2022-11-28` |

## Discord Configuration

| Variable                  | Description                                                            | Default | Notes                                                                                |
| ------------------------- | ---------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `DISCORD_TOKEN`           | The discord bot token for authenticating with Discord                  | None    | **Required**                                                                         |
| `DISCORD_CHANNEL_IDS`     | Comma-separated list of Discord channel IDs to listen on               | None    | **Required**                                                                         |
| `RAGPI_BASE_URL`          | Base URL for Ragpi. All chat requests will be sent to this endpoint    | None    | **Required**                                                                         |
| `RAGPI_API_KEY`           | API key for authenticating with Ragpi endpoints                        | None    | If provided, sets the `x-api-key` header on requests to Ragpi.                       |
| `DISCORD_SOURCES`         | Comma-separated list of sources to pass to Ragpi for context retrieval | None    | If not set, will use all sources.                                                    |
| `DISCORD_CHAT_MODEL`      | Name of the chat model to use                                          | None    | If not set, Ragpi's default model will be used.                                      |
| `DISCORD_REQUIRE_MENTION` | Whether the bot requires a direct mention to respond                   | `true`  | Accepts `true`, `True`, or `TRUE` for enabled; anything else is treated as disabled. |

## OpenTelemetry Settings

| Variable            | Description                    | Default |
| ------------------- | ------------------------------ | ------- |
| `OTEL_ENABLED`      | Enable/disable OpenTelemetry   | `False` |
| `OTEL_SERVICE_NAME` | Service name for OpenTelemetry | `ragpi` |

When enabled, Ragpi provides basic tracing capabilities through OpenTelemetry instrumentation. This includes automatic tracing of FastAPI endpoints and OpenAI/Ollama API calls, with spans exported to the endpoint specified in `OTEL_EXPORTER_OTLP_ENDPOINT`.

## Default System Prompt

The default value for `BASE_SYSTEM_PROMPT` is:

```
You are an AI assistant specialized in retrieving and synthesizing technical information to provide relevant answers to queries.
```
