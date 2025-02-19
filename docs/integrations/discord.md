---
sidebar_position: 1
title: Discord
---

# Discord Integration

Ragpi's Discord integration allows you to easily connect your technical documentation and knowledge base with your Discord community. By deploying a Discord bot powered by Ragpi, users can ask questions and receive AI-assisted answers directly within Discord channels.

## Setup Guide

### 1. Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in.
2. Click **New Application**, enter a name, and click **Create**.

### 2. Configure the Bot

1. Navigate to the **Bot** tab.
2. Under **Privileged Gateway Intents**, enable **Message Content Intent** and click **Save Changes**.
3. Under **Build-A-Bot**, click **Reset Token** to generate a new token.
   - **Important:** Save this token securely, as it will be used for the `DISCORD_TOKEN` environment variable.

### 3. Set Up Installation

1. Go to the **Installation** tab.
2. Under **Installation Contexts**, deselect **User Install**.
3. Under **Default Install Settings**, add the **bot** scope and click **Save Changes**.
4. Copy the **Install Link**, paste it into your browser, and follow the steps to add the bot to your server.

### 4. Configure Your Server

1. In Discord, create a new channel or use an existing one. I recommend creating a dedicated [Forum Channel](https://support.discord.com/hc/en-us/articles/6208479917079-Forum-Channels-FAQ) for the bot. To set up a forum channel, you will need to [Enable Community](https://support.discord.com/hc/en-us/articles/360047132851-Enabling-Your-Community-Server) in your server if you haven't already.
2. Right-click on the channel and select **Copy Server ID** to obtain the channel ID.
3. If you want the bot to operate in multiple channels, separate the channel IDs with commas in the `DISCORD_CHANNEL_IDS` environment variable.

### 5. Deploy Ragpi with Discord Integration

Refer to the [Deployment documentation](/deploymentl) for instructions on deploying Ragpi with the Discord integration.
Ensure that your `.env` file includes:

```env
DISCORD_TOKEN=your-bot-token
DISCORD_CHANNEL_IDS=your-channel-id(s)
```

:::important
By default, the bot will reply to all messages in the configured channels. If you want to restrict the bot to only respond to messages that mention it, set the `DISCORD_REQUIRE_MENTION` environment variable to `true`.
:::

## Configuration

| Variable                  | Description                                                            | Default | Notes                                                                                |
| ------------------------- | ---------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `DISCORD_TOKEN`           | The discord bot token for authenticating with Discord                  | None    | **Required**                                                                         |
| `DISCORD_CHANNEL_IDS`     | Comma-separated list of Discord channel IDs to listen on               | None    | **Required**                                                                         |
| `RAGPI_BASE_URL`          | Base URL for Ragpi. All chat requests will be sent to this endpoint    | None    | **Required**                                                                         |
| `RAGPI_API_KEY`           | API key for authenticating with Ragpi endpoints                        | None    | If provided, sets the `x-api-key` header on requests to Ragpi API.                   |
| `RAGPI_SOURCES`           | Comma-separated list of sources to pass to Ragpi for context retrieval | None    | If not set, will use all sources.                                                    |
| `DISCORD_REQUIRE_MENTION` | Whether the bot requires a direct mention to respond                   | `false` | Accepts `true`, `True`, or `TRUE` for enabled; anything else is treated as disabled. |
