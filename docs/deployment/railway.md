---
sidebar_position: 2
title: Railway
---

# Railway Deployment

Ragpi can be deployed on [Railway](https://railway.app/) using the provided deployment template. Railway is a platform that allows you to deploy and manage your applications with ease. You can deploy Ragpi's core services and integrations on Railway by following the instructions below.

## Deploying Core Services

To deploy Ragpi on Railway, click the deploy button below and follow the instructions. You will need to sign up for a Railway account if you don't already have one.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7ihedX?referralCode=Z4YGGz)

You will need to configure the LLM providers you would like to use, i.e the `CHAT_PROVIDER` and `EMBEDDING_PROVIDER` environment variables. You will also need to configure any required variables for the provider you choose, e.g. `OPENAI_API_KEY` if you choose `openai` as your provider. You can find out more about configuring the providers in the [provider documentation](/providers/overview) and the required environment variables for each provider under their respective pages.

If you need to configure additional environment variables not included in the deployment template, you can add them manually in your Railway project canvas after the initial deployment.

After deploying the core services, Railway will generate a public URL for the `ragpi-api` service which you can use to access the API. You can also [enable API authentication](/configuration#api-key-configuration) by setting the `RAGPI_API_KEY` environment variable on the `ragpi-api` service and using it to authenticate requests to the API.

## Deploying Integrations

Each Ragpi integration has its own Railway deployment template. Once you have deployed the core Ragpi services, you can deploy integrations like Slack and Discord by adding a new service to your project canvas. You can do this on your project's **Architecture** page by clicking the **Create** button, selecting the **Template** option, and searching for the integration you want to deploy, e.g., `Ragpi Discord Integration` or `Ragpi Slack Integration`.

After selecting the integration template, you will need to configure the required environment variables for the integration. The `RAGPI_BASE_URL` environment variable should already be set to the URL of the `ragpi-api` service you deployed earlier. If you enabled API authentication, the `RAGPI_API_KEY` environment variable should also be set to the API key you configured for the `ragpi-api` service. You can find the required environment variables for each integration in the [integration's documentation](/integrations).

## Example Project Canvas

![Railway Project Canvas](/img/railway-project-canvas.png)
