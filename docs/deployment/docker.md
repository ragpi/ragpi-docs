---
sidebar_position: 1
title: Docker
---

# Docker Deployment

Ragpi's Docker-based deployment method provides flexibility in where you can host the application. This guide walks through deploying Ragpi using Docker Compose, which can be used across various hosting environments including:

- Local development environments
- Virtual Private Servers (VPS) from providers like DigitalOcean, Linode, or Hetzner
- Cloud compute instances from AWS EC2, Google Compute Engine, or Azure Virtual Machines
- Dedicated servers or on-premises hardware

The deployment process remains consistent across these environments, making it easy to migrate between platforms as your needs evolve. The only requirements are Docker, Docker Compose, and Git access on your chosen platform.

For production deployments, the bare minimum server requirements are:

- 1 CPU core
- 2GB RAM
- 10GB disk space

These specifications provide enough resources to run all core services comfortably while leaving room for document processing and API operations. Adjust these specifications based on your expected workload and the size of your document collection.

## Docker Compose Deployment

### Prerequisites

- A server with at least 1 CPU core, 2GB RAM, and 10GB disk space
- Docker and Docker Compose installed on the server
- Git installed on the server

### Core Deployment Steps

1. Clone the repository:

```bash
git clone https://github.com/ragpi/ragpi.git
cd ragpi
```

2. Copy the example environment file and open it for editing:

```bash
cp .env.example .env
```

3. Update the `.env` file with your desired configuration. Refer to the [Configuration](/configuration) page to see all available environment variables. At a minimum, you should set the `OPENAI_API_KEY` variable to your OpenAI API key.

```env
# Required unless using a different chat/embedding provider
OPENAI_API_KEY=your_api_key_here

# Optional: Add API authentication
RAGPI_API_KEY=your_secret_api_key
```

4. Start the services using Docker Compose:

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Core Services

The following services will be started:

- **Redis** (port `6379`)
- **PostgreSQL** (port `5432`)
- **API** (port `8000`)
- **Task Worker** (Celery worker, no exposed ports)

:::important
By default, all services are configured to only listen on localhost (127.0.0.1) for security. To expose the API service to external traffic, you can either:

- Add the `DOCKER_API_PORT_MAPPING` environment variable to the `.env` file with the value `0.0.0.0:8000:8000` to expose the API service on port 8000. (Not recommended for production)
- Use a reverse proxy like Nginx, a tunneling service like Cloudflare Tunnel, or a similar method to securely expose the API service. (Recommended for production)
  :::

### Integrations

Ragpi supports various integrations that can be deployed alongside the core services. Each integration requires additional configuration in your `.env` file and uses a specific Docker Compose profile.

#### Common Integration Requirements

For all integrations:

- `RAGPI_BASE_URL` - Already set to the API service URL by default in the Docker Compose configuration
- `RAGPI_API_KEY` - If [API authentication is enabled](/configuration#api-key-configuration), this variable should already be set in the `.env` file and the integrations will use it for authentication

#### Integration-Specific Configuration

##### Discord Integration

Ensure you have created a Discord app and obtained the bot token. See the [Discord Integration](/integrations/discord) page for detailed instructions.

Required environment variables:

- `DISCORD_TOKEN` - Discord bot token for authentication
- `DISCORD_CHANNEL_IDS` - Comma-separated list of Discord channel IDs where the bot will listen

See [Discord Configuration](/integrations/discord#configuration) for additional options.

##### Slack Integration

Ensure you have created a Slack app and obtained the app and bot tokens. See the [Slack Integration](/integrations/slack) page for detailed instructions.

Required environment variables:

- `SLACK_APP_TOKEN` - Slack app token for authentication
- `SLACK_BOT_TOKEN` - Slack bot token for authentication

See [Slack Configuration](/integrations/slack#configuration) for additional options.

#### Deployment Examples

Deploy with a single integration:

```bash
# Discord only
docker compose -f docker-compose.prod.yml --profile discord up -d

# Slack only
docker compose -f docker-compose.prod.yml --profile slack up -d
```

To deploy with multiple integrations, you'll need to specify each profile with its own `--profile` flag:

```bash
# Both Discord and Slack
docker compose -f docker-compose.prod.yml --profile discord --profile slack up -d
```

Alternatively, you can use the `COMPOSE_PROFILES` environment variable with a comma-separated list:

```bash
COMPOSE_PROFILES=discord,slack docker compose -f docker-compose.prod.yml up -d
```

### Stopping Services

To stop services, use the same profile configuration used to start them:

```bash
# Stop core services only
docker compose -f docker-compose.prod.yml down

# Stop with single profile
docker compose -f docker-compose.prod.yml --profile discord down

# Stop with multiple profiles
docker compose -f docker-compose.prod.yml --profile discord --profile slack down
```

## Custom Deployment

For environments requiring custom orchestration or scaling solutions, Ragpi's [Docker images](https://hub.docker.com/u/ragpi) can be deployed independently without Docker Compose. The official Docker images can be orchestrated using Kubernetes, AWS ECS, or other container management systems while maintaining the same environment variable configuration. Reference the [Docker Compose file](https://github.com/ragpi/ragpi/blob/main/docker-compose.prod.yml) for service dependencies and configuration patterns.
