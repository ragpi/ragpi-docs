---
sidebar_position: 2
---

# Getting Started

This is a quick guide to get you started with Ragpi locally. To deploy Ragpi to a production environment, refer to the [Deployment Documentation](/deployment) to learn more about different deployment options. If you would like to contribute to Ragpi, refer to the [Contributing Guidelines](https://github.com/ragpi/ragpi/blob/main/CONTRIBUTING.md) for detailed instructions on setting up your development environment.

## Prerequisites

- Docker and Docker Compose installed
- Git installed
- An OpenAI API key

## Deploying Ragpi Locally

1. Clone the repository and navigate to the directory:

```bash
git clone https://github.com/ragpi/ragpi.git
cd ragpi
```

2. Copy the example environment file and open it for editing:

```bash
cp .env.example .env
```

3. Configure the essential environment variables in `.env`:

```env
# Add your OpenAI API key
OPENAI_API_KEY=your_api_key_here

# Optional: Add your GtiHub Token if using a GitHub connector
GITHUB_TOKEN=your_github_token

# Optional: Add API authentication
RAGPI_API_KEY=your_secret_api_key
```

:::info
If you would like to enable API authentication, set the `RAGPI_API_KEY` environment variable to a [self-generated key](/configuration#generating-an-api-key). Include this key in the `x-api-key` header for all requests.
:::

4. Start Ragpi using Docker Compose:

```bash
docker compose -f docker-compose.prod.yml up -d
```

Your Ragpi instance is now running at `http://localhost:8000`! You can verify it's working by visiting the OpenAPI documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

## Adding Your First Source

Let's add a documentation website as our first source. We'll use the Sitemap connector to automatically process all pages from a sitemap. You can replace the parameters in the example below with your own values.

1. Create a source using the `/sources` endpoint:

```bash
curl -X POST http://localhost:8000/sources \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secret_api_key" \
  -d '{
    "name": "example-docs",
    "description": "Documentation for example project",
    "connector": {
      "type": "sitemap",
      "sitemap_url": "https://docs.example.com/sitemap.xml"
    }
  }'
```

2. Note the `task_id` in the response. You can monitor the synchronization progress:

```bash
curl http://localhost:8000/tasks/{task_id} \
  -H "x-api-key: your_secret_api_key"
```

## Making Your First Query

Once your source has finished synchronizing, you can start asking questions! Let's try a simple query:

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secret_api_key" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "What are the deployment options for this project?"
      }
    ]
  }'
```

The response will include Ragpi's answer, synthesized from the relevant documentation it found. Since no sources are specified, Ragpi will query all available sources. If you want to limit the search to a specific source, you can include the `sources` field in the request body.

## Next Steps

- **Explore available connectors**: [Connectors Guide](/connectors)
- **Customize your configuration**: [Configuration Guide](/configuration)
- **Check the API reference**: [API Reference](/api)
- **Set up the Discord integration**: [Discord Integration Guide](/integrations/discord)
- **Deploy Ragpi in production**: [Deployment Options](/deployment)
