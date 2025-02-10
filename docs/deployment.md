---
sidebar_position: 3
---

# Deployment

Ragpi's Docker-based deployment method provides flexibility in where you can host the application. This guide walks through deploying Ragpi using Docker Compose, which can be used across various hosting environments including:

- Local development environments
- Virtual Private Servers (VPS) from providers like DigitalOcean, Linode, or Vultr
- Cloud compute instances from AWS EC2, Google Compute Engine, or Azure Virtual Machines
- Self-hosted servers or bare metal installations

The deployment process remains consistent across these environments, making it easy to migrate between platforms as your needs evolve. The only requirements are Docker, Docker Compose, and Git access on your chosen platform.

For production deployments, the bare minimum server requirements are:

- 1 CPU core
- 2GB RAM
- 10GB disk space

These specifications provide enough resources to run all core services comfortably while leaving room for document processing and API operations. Adjust these specifications based on your expected workload and the size of your document collection.

## Docker Compose Deployment

### Prerequisites

- Docker and Docker Compose installed
- Git installed
- A server or VPS with at least 1 CPU core, 2GB RAM, and 10GB disk space

### Deployment Steps

1. Clone the repository:

```bash
git clone https://github.com/ragpi/ragpi.git
cd ragpi
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Configure the `.env` file with your settings. Refer to the [Configuration](/configuration) page for details on each environment variable.

4. Start the core services using Docker Compose:

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Services Started

The following services will be started:

Core Services:

- **Redis** (port `6379`)
- **PostgreSQL** (port `5432`)
- **API** (port `8000`)
- **Task Worker** (Celery worker, no exposed ports)

:::important
By default, all services are configured to only listen on localhost (127.0.0.1) for security. To expose the API service to external traffic, you can either:

- Add the `DOCKER_API_PORT_MAPPING` environment variable to the `.env` file with the value `0.0.0.0:8000:8000` to expose the API service on port 8000. (Not recommended for production)
- Use a reverse proxy like Nginx, a tunneling service like Cloudflare Tunnel, or a similar method to securely expose the API service. (Recommended for production)
  :::

### Discord Integration (Optional)

To deploy with Discord integration, follow the main deployment steps 1-3 above, with these additional configurations:

1. When configuring your `.env` file, include these additional Discord-specific variables:

   - `DISCORD_TOKEN` - The discord bot token for authenticating with Discord.
   - `DISCORD_CHANNEL_IDS` - A comma-separated list of Discord channel IDs where the bot will listen to.
   - `RAGPI_API_KEY` - (Required only if API authentication is enabled) Set this to one of the values defined in the API_KEYS environment variable of your API service.

   See [Discord Configuration](/configuration#discord-configuration) for a complete list of available options.

   **Note:** The `RAGPI_BASE_URL` environment variable is already set to the API service URL by default.

2. For step 4, instead of the standard startup command, use the `discord` profile:

```bash
docker compose -f docker-compose.prod.yml --profile discord up -d
```

The Discord bot service will connect to your API service automatically using the configuration specified in the Docker Compose file.

### Stopping Services

To stop the core services, run:

```bash
docker compose -f docker-compose.prod.yml down
```

To stop the services with Discord integration, run:

```bash
docker compose -f docker-compose.prod.yml --profile discord down
```

## Custom Deployment

Ragpi supports deployment on Kubernetes or other container orchestration platforms using the [ragpi/ragpi](https://hub.docker.com/r/ragpi/ragpi) and [ragpi/ragpi-discord](https://hub.docker.com/r/ragpi/ragpi-discord) Docker images. Configure components independently based on your infrastructure needs. The API image contains both the API service and worker components, which can be controlled via environment variables.

For reference on how to configure the services, see the service definitions in [`docker-compose.prod.yml`](https://github.com/ragpi/ragpi/blob/main/docker-compose.prod.yml) in the repository root.
