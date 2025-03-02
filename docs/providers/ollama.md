---
sidebar_position: 3
---

# Ollama

## Provider Selection

```env
CHAT_PROVIDER=ollama
EMBEDDING_PROVIDER=ollama
```

## Required Environment Variables

```env
OLLAMA_BASE_URL=your_base_url_here
```

:::note
If you are running Ragpi using Docker and want to connect to an Ollama instance running on the host machine, you can use `host.docker.internal` as the hostname, e.g. `OLLAMA_BASE_URL=http://host.docker.internal:11434/v1`.
:::
