---
title: "Create a Mastodon Instance with Fly.io"
published: 2023-07-05
description: "A comprehensive guide to creating a personal Mastodon instance using Fly.io, Cloudflare, and SendGrid."
image: 'https://slink.alyx.pink/image/a259499b-6460-4b7a-a0c0-0fe9545fa3df.jpg'
tags: ["mastodon", "fly-io", "cloudflare", "docker", "self-hosting"]
category: 'Tutorial'
draft: false
lang: "en"
---

*Photo by [frame harirak](https://unsplash.com/@framemily?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)*

## Introduction

I wanted to create my own Mastodon instance for a few days and I went ahead during the night.

It went pretty smoothly, outside of some unrelated issues I had:

- The Fly.io CLI version I was using had some weird issues where it was losing the connection to their machines
- The name I used caused troubles with the DB because it was starting with digits (`3615-computer`).

Other than that, it took me about an hour in total from buying the domain to having a Mastodon instance up and running.

Here are the services I'm using to run my instance:

- **Web hosting**: fly.io (~7$/month)
- **DNS**: Cloudflare (Free)
- **Media storage**: Cloudflare R2 (~2$/month)
- **Mailing**: SendGrid (Free, 100 emails/day)

This guide will consider that you want to use the same stack.

Don't worry about messing something up: you should not have any issues deleting and recreating multiple times every resource we are using. The web hosting machines, the DNS records, the R2 bucket, etc… Take your time, and when you feel like everything is working, start using the instance and see how it goes.

## Requirements

You will need to install:

- [docker](https://docs.docker.com/get-docker/)
- [flyctl](https://fly.io/docs/hands-on/install-flyctl/)

## Setup media storage with Cloudflare R2

1. Go to Cloudflare dashboard (https://dash.cloudflare.com/)
2. Click on "Create bucket"
3. Enter a name for your bucket. It must be unique and you won't be able to rename it later
4. Once created, go to "Settings" and copy your "S3 API" URL, we will use it later
5. Create your API keys:
   - In the sidebar, "R2" > "Overview" > "Manage R2 API Tokens" > "Create API token"
   - Name your token however your want
   - Select "Permissions" > "Edit"
   - Don't set any TTL
   - Click "Create API token"
6. Copy your "Access Key ID" and "Secret Access Key" for later

You are done with R2.

## Setup emails with SendGrid

### Authenticate your domain

1. Go to your [SendGrid dashboard](https://app.sendgrid.com)
2. Go to "Settings" > ["Send Authentication"](https://app.sendgrid.com/settings/sender_auth)
3. Authenticate your domain

### Create an API key

1. To create your API key, go to "Settings" > ["API Keys"](https://app.sendgrid.com/settings/api_keys)
2. "Create API key"
3. Set a name, and select "Restricted Access"
4. Select "Mail Send" > "Mail Send" and enable this setting
5. Click on "Create and View"
6. Copy your secret key, you can't see it ever again

### Disable tracking

Don't forget to disable tracking by going to [app.sendgrid.com/settings/tracking](https://app.sendgrid.com/settings/tracking).

### Set the env vars and secrets on Fly.io

Use your secret key:

```sh
fly secrets set SMTP_LOGIN=apikey SMTP_PASSWORD=your_secret_key
```

In your `fly.toml` file:

```toml
## Sending email via SMTP also requires secrets
## named SMTP_LOGIN and SMTP_PASSWORD
SMTP_SERVER = "smtp.sendgrid.net"
SMTP_PORT = "587"
SMTP_ENABLE_STARTTLS = "always"
SMTP_FROM_ADDRESS = "noreply@example.com" # Set your from email
```

## Deploy Mastodon using Fly.io

To deploy Mastodon with Fly.io, I've used the work of [@tmm1](https://github.com/tmm1): [flyapp-mastodon](https://github.com/tmm1/flyapp-mastodon).

It gives you a lot of sane defaults, a guide to explain what to do, when, and why, and also a guide to scale your instance further if needed.

Edit your `fly.toml` following the guide on the repository.

Some notes:

- I suggest creating a fly.io organization inside your account and setting the `--org` parameter for the commands that require it (`apps create` and `pg create`). It makes it easier to manage your billing and projects. Otherwise, everything will get mixed up in your default `personal` space.
- Don't forget to update the location of your services (`sjc` in this example) to the one you want to use ([complete list](https://fly.io/docs/reference/regions/)).
- You won't need to attach an IPv4 as Cloudflare will proxy everything for you, exposing your instance with IPv4 and IPv6.
- Some commands are in the wrong order like the `fly scale memory 1024` can't be run just after `fly apps create xxx`. No worries, here's an order that I think is better and easier to follow:

```sh
# Create your organization
flyctl orgs create my-org

# Create the machine for the mastodon app
fly apps create --org my-org mastodon-example

# Set required secrets
export SECRET_KEY_BASE=$(docker run --rm -it tootsuite/mastodon:latest bin/rake secret)
export OTP_SECRET=$(docker run --rm -it tootsuite/mastodon:latest bin/rake secret)
fly secrets set OTP_SECRET=$OTP_SECRET SECRET_KEY_BASE=$SECRET_KEY_BASE
docker run --rm -e OTP_SECRET=$OTP_SECRET -e SECRET_KEY_BASE=$SECRET_KEY_BASE -it tootsuite/mastodon:latest bin/rake mastodon:webpush:generate_vapid_key | sed 's/\r//' | fly secrets import
fly secrets set AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=yyy
fly secrets set SMTP_LOGIN=<public token> SMTP_PASSWORD=<secret token>

# Create the redis machine
fly apps create --org my-org mastodon-example-redis
bin/fly-redis volumes create --region sjc --size 1 mastodon_redis
bin/fly-redis deploy

# Create the PostgreSQL machine
fly pg create --org my-org --region sjc --name mastodon-example-db
fly pg attach mastodon-example-db
fly deploy -c fly.setup.toml # run `rails db:schema:load`, may take 2-3 minutes

# Deploy the application
fly deploy

# Scale the app machine to 1GB of RAM
fly scale memory 1024

# Set yourself as the owner of your own instance, after signing up
fly ssh console -C 'tootctl accounts modify <username> --confirm --role Owner'
```

## Setup DNS with Cloudflare

### Add your domain to Cloudflare

1. Go to Cloudflare dashboard (https://dash.cloudflare.com/)
2. Click "Add a site" and enter your domain name (example.com)
3. Select the Free plan and click on "Continue"
4. They are going to scan your DNS records, if you have any, to copy them
5. Update your domain's nameservers as described

If everything is ok, the check will pass.

### Follow their quick start guide

During the quick start guide:

1. Improve security
   - Enable "Automatic HTTPS Rewrites"
   - Enable "Always Use HTTPS"
2. Optimize performance
   - Enable "Brotli"
3. Summary: check all our options are "ON" and click "Finish"

### Setup your DNS records for Mastodon

1. In Cloudflare's sidebar, go to "DNS > Records"
2. Click on "Add record"
3. You need to add:
   - The `AAAA` records for your instance
     - `fly ips list` will show it
   - The `CNAME` for your fly.io certificate validation
     - In the fly.io dashboard, go to your mastodon app instance > Certificates > View > Domain ownership verification
4. In Cloudflare's sidebar, go to "SSL/TLS > Overview"
5. Set the encryption mode to "Full"

### Setup your DNS records to redirect any inbound emails to your personal email

1. In Cloudflare's sidebar, go to "Email > Email Routing"
2. Follow their guide to set any DNS records required (they do everything for you)
3. Once done, in the "Routes" tab, you should have something similar to:
   - Custom addresses: noreply@example.com | Send to an email | your personal email | Active
   - Catch-all address: enabled | Send to an email | your personal email as destination
   - Destination addresses: your personal email | Verified

SendGrid takes care of sending emails from Mastodon, and Cloudflare takes care of redirecting any inbound emails to your personal address.

### Setup your DNS records for Cloudflare R2

1. Go to Cloudflare dashboard (https://dash.cloudflare.com/)
2. In the sidebar, go to "R2" > "Overview"
3. Click on your bucket name > "Settings"
4. In the "Public access" section, click on "Connect Domain" and enter the domain or subdomain name you want to use (example: `mastodon-files.example.com`).
5. Review the settings and click on "Connect domain" and you are done

## Setup Cloudflare R2 as your media storage

1. In your `fly.toml` file, add:

```toml
[env]
S3_ENABLED = true
S3_BUCKET = "3615-computer-mastodon" # Name of your R2 bucket
S3_ALIAS_HOST = "mastodon-files.3615.computer" # Subdomain of your bucket public access
S3_ENDPOINT = "https://xxx.r2.cloudflarestorage.com/" # Endpoint for your bucket (click on your bucket to see it)
S3_PERMISSION = "private"
S3_PROTOCOL = "https"
```

2. Comment the "mount" section of your `fly.toml` file:

```toml
## Comment out this section if you use cloud storage
# [mounts]
#   source = "mastodon_uploads"
#   destination = "/opt/mastodon/public/system"
```

3. Generate your API keys:
   1. Go to Cloudflare > R2 > Manage R2 API Tokens
   2. Permissions: Edit
   3. No TTL (Forever)
   4. Copy your access and secret keys for the next step

4. Set your secrets:

```sh
fly secrets set AWS_ACCESS_KEY_ID=xxx
fly secrets set AWS_SECRET_ACCESS_KEY=xxx
```
