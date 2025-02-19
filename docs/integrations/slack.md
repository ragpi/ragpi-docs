---
sidebar_position: 2
title: Slack
---

# Slack Integration

Ragpi's Slack integration allows you to easily connect your technical documentation and knowledge base with your Slack workspace. By deploying a Slack bot powered by Ragpi, users can ask questions and receive AI-assisted answers directly within Slack channels.

## Setup Guide

### 1. Create a Slack App

1. Go to the [Slack Apps](https://api.slack.com/apps) page and log in.
2. Click **Create New App**, then **From a Manifest**, then select your workspace and click **Next**.
3. Under the **JSON** tab, paste the following:

```json
{
  "display_information": {
    "name": "Ragpi Bot",
    "description": "A helpful AI Assistant",
    "background_color": "#000000"
  },
  "features": {
    "bot_user": {
      "display_name": "Ragpi Bot",
      "always_online": true
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": ["channels:history", "groups:history", "chat:write"]
    }
  },
  "settings": {
    "event_subscriptions": {
      "bot_events": ["message.channels", "message.groups"]
    },
    "interactivity": {
      "is_enabled": true
    },
    "org_deploy_enabled": false,
    "socket_mode_enabled": true,
    "token_rotation_enabled": false
  }
}
```

4. Click **Create**.

### 2. Configure the Bot

1. On the **Basic Information** page, under **App-Level Tokens**, click **Generate Token and Scopes** and create a new token with the **connections:write** scope.
   - **Important:** Save this token securely, as it will be used later for the `SLACK_APP_TOKEN` environment variable.
2. Next, navigate to the **OAuth & Permissions** page and under **OAuth Tokens**, click **Install to [YourWorkspace]** and authorize the app.
   - **Important:** Save the **Bot User OAuth Token** for the `SLACK_BOT_TOKEN` environment variable.

### 3. Deploy Ragpi with Slack Integration

Refer to the [Deployment documentation](/deployment) for instructions on deploying Ragpi with the Slack integration.
Ensure that your `.env` file includes:

```env
SLACK_APP_TOKEN=your-app-token
SLACK_BOT_TOKEN=your-bot-token
```

### 4. Using the bot

After configuring the bot and deploying Ragpi, the bot will be available in your Slack workspace. You can invite it to the channels you want it to respond in by mentioning it in the desired channel. When asked a question, the bot will respond in a thread to keep conversations organized.

## Configuration

| Variable          | Description                                                            | Default | Notes                                                              |
| ----------------- | ---------------------------------------------------------------------- | ------- | ------------------------------------------------------------------ |
| `SLACK_BOT_TOKEN` | The slack bot token for authenticating with Slack                      | None    | **Required**                                                       |
| `SLACK_APP_TOKEN` | The slack app token for authenticating with Slack                      | None    | **Required**                                                       |
| `RAGPI_BASE_URL`  | Base URL for Ragpi. All chat requests will be sent to this endpoint    | None    | **Required**                                                       |
| `RAGPI_API_KEY`   | API key for authenticating with Ragpi endpoints                        | None    | If provided, sets the `x-api-key` header on requests to Ragpi API. |
| `RAGPI_SOURCES`   | Comma-separated list of sources to pass to Ragpi for context retrieval | None    | If not set, will use all sources.                                  |
