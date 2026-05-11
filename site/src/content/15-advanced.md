# 15. Advanced Production Patterns

## Blue-Green Deployment

- blue = aktif
- green = standby
- deploy ke green
- test
- switch traffic

## Rolling Update

Update node satu per satu agar downtime minimal.

## Zero Downtime Deploy

Gunakan:
- load balancer
- health check
- restart terkontrol
- sticky session bila perlu

## Microservices

Pisahkan service seperti:
- auth
- payment
- notification
- file

## Message Queue Architecture

Pakai untuk:
- email async
- retry webhook
- background job
- report generation

## Infrastructure as Code

Tools:
- Terraform
- Ansible
- Packer

## Secret Management

Jangan hardcode:
- password DB
- API key
- token
- private key

Gunakan environment variable atau secret manager.