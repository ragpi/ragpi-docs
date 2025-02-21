---
sidebar_position: 2
---

# Configuration

Ragpi uses the following environment variables to configure its behavior. These settings control everything from API access and provider configurations to database connections and document processing.

## Application Configuration

| Variable                  | Description                           | Default                                                                                                                             | Notes                                                                                                                                                                     |
| ------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROJECT_NAME`            | Name of the project                   | `the current project`                                                                                                               | Used to scope and focus the AI assistant's responses                                                                                                                      |
| `PROJECT_DESCRIPTION`     | Description of the project            | `determined by the available sources`                                                                                               | Defines the project's scope for the AI assistant                                                                                                                          |
| `RAGPI_VERSION`           | API version of Ragpi                  | `v0.2.x`                                                                                                                            | Used in the OpenAPI spec and in `docker-compose.prod.yml` to specify the Ragpi image version                                                                              |
| `API_NAME`                | Name of the API service               | `Ragpi`                                                                                                                             | Used in the OpenAPI spec                                                                                                                                                  |
| `API_SUMMARY`             | Summary of the API service            | `Ragpi is an AI assistant specialized in retrieving and synthesizing technical information to provide relevant answers to queries.` | Used in the OpenAPI spec                                                                                                                                                  |
| `RAGPI_API_KEY`           | API key for authenticated requests    | None                                                                                                                                | If not set, the API will be accessible without authentication. When set, this key must be a self-generated secret and included in the `x-api-key` header of each request. |
| `WORKERS_ENABLED`         | Enable/disable background workers     | `True`                                                                                                                              | When disabled, endpoints requiring Celery workers will return a `503`                                                                                                     |
| `TASK_RETENTION_DAYS`     | Number of days to retain task history | `7`                                                                                                                                 | -                                                                                                                                                                         |
| `LOG_LEVEL`               | Logging level                         | `INFO`                                                                                                                              | Options: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`                                                                                                                  |
| `USER_AGENT`              | User agent string for HTTP requests   | `Ragpi`                                                                                                                             | -                                                                                                                                                                         |
| `MAX_CONCURRENT_REQUESTS` | Maximum number of concurrent requests | `10`                                                                                                                                | -                                                                                                                                                                         |

## Provider Configuration

| Variable                               | Description                                     | Default  | Notes                                                       |
| -------------------------------------- | ----------------------------------------------- | -------- | ----------------------------------------------------------- |
| `CHAT_PROVIDER`                        | Chat service provider                           | `openai` | Options: `openai`,`ollama`,`deepseek`,`openai_compatible`   |
| `EMBEDDING_PROVIDER`                   | Embedding service provider                      | `openai` | Options: `openai`,`ollama`,`openai_compatible`              |
| `OPENAI_API_KEY`                       | API key for OpenAI services                     | None     | Required if using `openai` as chat/embedding provider       |
| `OLLAMA_BASE_URL`                      | Base URL for Ollama provider                    | None     | Required if using `ollama` as chat/embedding provider       |
| `DEEPSEEK_API_KEY`                     | API key for DeepSeek services                   | None     | Required if using `deepseek` as chat provider               |
| `CHAT_OPENAI_COMPATIBLE_BASE_URL`      | Base URL for OpenAI-compatible chat models      | None     | Required if using `openai_compatible` as chat provider      |
| `CHAT_OPENAI_COMPATIBLE_API_KEY`       | API key for OpenAI-compatible chat models       | None     | Required if using `openai_compatible` as chat provider      |
| `EMBEDDING_OPENAI_COMPATIBLE_BASE_URL` | Base URL for OpenAI-compatible embedding models | None     | Required if using `openai_compatible` as embedding provider |
| `EMBEDDING_OPENAI_COMPATIBLE_API_KEY`  | API key for OpenAI-compatible embedding models  | None     | Required if using `openai_compatible` as embedding provider |

## Database Configuration

| Variable                    | Description                                    | Default                             | Notes                                                                                    |
| --------------------------- | ---------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `REDIS_URL`                 | Redis connection URL                           | `redis://localhost:6379`            | **Required**                                                                             |
| `POSTGRES_URL`              | PostgreSQL database URL                        | `postgresql://localhost:5432/ragpi` | **Required if using postgres backend**                                                   |
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

## OpenTelemetry Settings

| Variable                      | Description                      | Default | Notes                                  |
| ----------------------------- | -------------------------------- | ------- | -------------------------------------- |
| `OTEL_ENABLED`                | Enable/disable OpenTelemetry     | `False` | -                                      |
| `OTEL_SERVICE_NAME`           | Service name for OpenTelemetry   | `ragpi` | -                                      |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OpenTelemetry collector endpoint | None    | Required when OpenTelemetry is enabled |

When enabled, Ragpi provides basic tracing capabilities through OpenTelemetry instrumentation using the `http/protobuf` protocol. This includes automatic tracing of FastAPI endpoints and LLM API calls, with spans exported to the endpoint specified in `OTEL_EXPORTER_OTLP_ENDPOINT`.

## Default System Prompt

The default value for `BASE_SYSTEM_PROMPT` is:

```
You are an AI assistant specialized in retrieving and synthesizing technical information to provide relevant answers to queries.
```

## API Key Configuration

If you want to restrict access to the Ragpi API, you can enable API authentication using `RAGPI_API_KEY`. When set, this key must be included in all API requests using the `x-api-key` header.

### Generating an API Key

You can generate a secure API key using the following command in your terminal:

```bash
openssl rand -hex 32
```
