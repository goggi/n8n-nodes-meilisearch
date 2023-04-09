# n8n-nodes-meilisearch

This is an n8n community node. It lets you use the meilisearch REST API in your n8n workflows.

[Meilisearch](https://meilisearch.com) 
An open-source, lightning-fast, and hyper-relevant search engine that fits effortlessly into your apps, websites, and workflow.

[meilisearch API Docs](https://docs.meilisearch.com/reference/api/overview.html)

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Usage](#usage) 
[Resources](#resources)  
[Version history](#version-history) 

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

-  

## Credentials

By [providing Meilisearch with a master key at launch](https://docs.meilisearch.com/learn/security/master_api_keys.html#protecting-a-meilisearch-instance), you protect your instance from unauthorized requests. The provided master key must be at least 16 bytes. From then on, you must include the `Authorization` header along with a valid API key to access protected routes (all routes except /health.)

The credentials type provided in this node send an `Authorization` header with the key you provide. e.g. `Authorization: Bearer YOURKEY`

## Compatibility

This is subject to change.

## Usage



## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [n8n-nodes-meilisearch repository](https://github.com/Bwilliamson55/n8n-nodes-meilisearch)

## Version history

- 0.1.0 - Initial release
  - Features:
    
