---
sidebar_position: 1
---

# Overview

Ragpi is an API-first, open-source AI assistant that leverages LLMs to search and answer questions using technical sources. It builds knowledge bases from documentation websites, GitHub Issues, and repository README files, storing them in a vector database for efficient retrieval. Using an Agentic RAG approach, it dynamically retrieves relevant documents to answer queries through its REST API.

## Features

- **REST API** - Simple API for interacting with the AI assistant and managing sources
- **Agentic RAG System** - Dynamic document retrieval based on queries
- **Hybrid Search** - Combines semantic and keyword search using Reciprocal Rank Fusion (RRF)
- **Flexible Connectors** - Support for docs, GitHub issues, and READMEs
- **LLM Integration** - Response generation using selected LLM providers
- **Observability** - Basic OpenTelemetry tracing support

## Example Workflow

1. **Set up a Source with a Connector**:

   - Use the [/sources](/api/#tag/sources/POST/sources) endpoint to configure a source with your chosen connector.
   - Each connector type has its own configuration parameters.

   Example payload using the Sitemap connector:

   ```json
   {
     "name": "example-docs",
     "description": "Documentation for example project. It contains information about configuration, usage, and deployment.",
     "connector": {
       "type": "sitemap",
       "sitemap_url": "https://docs.example.com/sitemap.xml"
     }
   }
   ```

2. **Monitor Source Synchronization**:

   - After adding a source, documents will be synced automatically. You can monitor the sync process through the [/tasks](/api/#tag/tasks/GET/tasks/{task_id}) endpoint.

3. **Chat with the AI Assistant**:

   - Use the [/chat](/api/#tag/chat/POST/chat) endpoint to query the AI assistant using the configured sources.
   - If no sources are specified in the payload, all available sources will be used.
   - Example payload:
     ```json
     {
       "sources": ["example-docs"],
       "messages": [
         { "role": "user", "content": "How do I deploy the example project?" }
       ]
     }
     ```
