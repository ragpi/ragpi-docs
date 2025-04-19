---
sidebar_position: 1
title: Web Widget
---

# Web Widget Integration

Ragpi's Web Widget integration allows you to embed a chat widget on your website, enabling users to ask questions and receive AI-assisted answers directly from your knowledge base. It uses a simple JavaScript script to load the widget, which is protected by google recaptcha v3 to prevent spam and abuse. The widget will connect to the Ragpi API through a lightweight API gateway that will verify the recaptcha token and forward the request to the Ragpi API. This ensures that only valid requests are processed, and it helps to protect your API key from being exposed in the client-side code.

## Setup Guide

### 1. Create a Google reCAPTCHA v3 Key

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create) and log in.
2. Register a new site and ensure to select reCAPTCHA v3 as the type.
3. Add your website domain(s) to the list of allowed domains. This is important to ensure that the reCAPTCHA validation works correctly. If you are testing locally, you can add `localhost` to the list of allowed domains.
4. After creating the key, you will receive a **Site Key** and a **Secret Key**. Save these keys securely, as they will be used for the `RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` environment variables.

### 2. Deploy Ragpi with Recaptcha Gateway

Refer to the [Deployment documentation](/deployment) to choose a deployment method and deploy Ragpi with the Recaptcha Gateway integration.

Ensure that the following environment variables are configured when deploying the Web Widget integration:

```env
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### 3. Embed Web Widget on Your Website

To embed the Web Widget on your website, add the following script to your HTML:

```html
<script
  src="https://cdn.jsdelivr.net/gh/ragpi/ragpi-web-widget@v0.1.1/dist/ragpi-widget.js"
  defer
  data-recaptcha-site-key="RECAPTCHA_SITE_KEY"
  data-ragpi-gateway-url="RECAPTCHA_GATEWAY_URL"
  data-ragpi-sources="SOURCE_1,SOURCE_2"
></script>
```

Replace `RECAPTCHA_SITE_KEY` with your Google reCAPTCHA v3 site key, `RECAPTCHA_GATEWAY_URL` with the URL of your Recaptcha Gateway service you deployed in the previous step, and `SOURCE_1,SOURCE_2` with the sources you want to use for context retrieval. If you want to use all sources, you can omit the `data-ragpi-sources` attribute.

### 4. Test the Web Widget

After embedding the script, visit your website and test the Web Widget. You should see a chat interface where users can ask questions. The widget will use the reCAPTCHA v3 token to validate requests before sending them to the Ragpi API.

## Configuration

### Recaptcha Gateway

| Variable                    | Description                                                         | Default | Notes                                                              |
| --------------------------- | ------------------------------------------------------------------- | ------- | ------------------------------------------------------------------ |
| `RECAPTCHA_SECRET_KEY`      | The secret key for Google reCAPTCHA v3                              | None    | **Required**                                                       |
| `RAGPI_BASE_URL`            | Base URL for Ragpi. All chat requests will be sent to this endpoint | None    | **Required**                                                       |
| `RAGPI_API_KEY`             | API key for authenticating with Ragpi endpoints                     | None    | If provided, sets the `x-api-key` header on requests to Ragpi API. |
| `RECAPTCHA_SCORE_THRESHOLD` | The score threshold for reCAPTCHA validation (0.0 to 1.0)           | 0.5     | Requests with a score below this threshold will be rejected.       |
| `CORS_ORIGINS`              | Comma-separated list of allowed origins for CORS requests           | None    | If not set, will allow all origins.                                |
| `PORT`                      | The port on which the Recaptcha Gateway service will listen         | 8080    | Change this if you want to run the service on a different port.    |

### Web Widget

| Variable                  | Description                                                            | Default | Notes                             |
| ------------------------- | ---------------------------------------------------------------------- | ------- | --------------------------------- |
| `data-recaptcha-site-key` | The site key for Google reCAPTCHA v3                                   | None    | **Required**                      |
| `data-ragpi-gateway-url`  | The URL of the Recaptcha Gateway service                               | None    | **Required**                      |
| `data-ragpi-sources`      | Comma-separated list of sources to pass to Ragpi for context retrieval | None    | If not set, will use all sources. |
| `data-primary-color`      | The primary color for the widget (hex format)                          | #4a5565 | Change this to customize the UI.  |
| `data-secondary-color`    | The secondary color for the widget (hex format)                        | #ffffff | Change this to customize the UI.  |
| `data-logo-url`           | The URL of the logo to display in the widget                           | None    | Change this to customize the UI.  |
