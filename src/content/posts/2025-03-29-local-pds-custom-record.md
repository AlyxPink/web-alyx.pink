---
title: Running a local PDS in dev mode and create a custom record
published: 2025-03-29
description: "Messing around with ATProto and Personal Data Server (PDS)"
image: 'https://slink.alyx.pink/image/b088f0eb-a908-4204-9ca2-09f58f20ab72.png'
tags: [Bluesky, ATProto, PDS]
category: 'Computer'
draft: false
lang: "en"
---

I wanted to play around with ATProto and Personal Data Server (PDS). My goal was just to see how to write a record to the PDS, using a custom type. Here are some quick notes just in case it can help anyone, and so it does not get "lost".

I haven't made an extended search for everything: I'm not sure what `PDS_DEV_MODE` does entirely. Maybe I could have used something else than `PDS_INVITE_REQUIRED=0` to not require an invitation code on signup. It's your turn to scratch around and find out!

## Launch a local PDS in dev mode

This will launch a container running the PDS, the blobs (files, uploads) are stored on disk but not on a volume, so it's ephemeral. The secrets are generated automatically. Invitations are disabled. Dev mode is enabled. The container is named `pds-dev`.

```bash
$ docker run --rm \
  -e PDS_DATADIR=/pds \
  -e PDS_BLOBSTORE_DISK_LOCATION=/pds/blocks \
  -e PDS_BLOBSTORE_DISK_TMP_LOCATION=/pds/tmp \
  -e PDS_PLC_ROTATION_KEY_K256_PRIVATE_KEY_HEX=$(openssl ecparam --name secp256k1 --genkey --noout --outform DER | tail --bytes=+8 | head --bytes=32 | xxd --plain --cols 32) \
  -e PDS_JWT_SECRET=$(openssl rand --hex 16) \
  -e PDS_DEV_MODE=true \
  -e PDS_ADMIN_PASSWORD=$(openssl rand --hex 16) \
  -e LOG_ENABLED=true \
  -e LOG_LEVEL=debug \
  -e PDS_INVITE_REQUIRED=0 \
  -p 3000:3000 \
  --name pds-dev \
  ghcr.io/bluesky-social/pds:0.4
```

## Create a custom record

In my case, `example.alyx.customRecord` is obviously not registered. Click here to learn more about the [NSID](https://atproto.com/guides/glossary#nsid-namespaced-id) and [Lexicon](https://atproto.com/guides/glossary#lexicon).

### Create a new account

```bash
$ export pds_account_password=$(openssl rand --hex 16)

$ curl -X POST localhost:3000/xrpc/com.atproto.server.createAccount \
  -H "Content-Type: application/json" \
  -d '{"handle": "alyx.example", "email": "alyx@alyx.example", "password": "'$pds_account_password'"}'
```

### Get the JWT access token

```bash
$ curl -s -X POST localhost:3000/xrpc/com.atproto.server.createSession \
  -H "Content-Type: application/json" \
  -d '{"identifier": "alyx.example", "password": "'$pds_account_password'"}' | jq -r '.accessJwt'
```

Or:
```bash
$ export pds_access_session=$(curl -s -X POST localhost:3000/xrpc/com.atproto.server.createSession \
  -H "Content-Type: application/json" \
  -d '{"identifier": "alyx.example", "password": "'$pds_account_password'"}' | jq -r '.accessJwt')
```

### Create your custom record

```bash
$ curl -X POST localhost:3000/xrpc/com.atproto.repo.createRecord \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer xxx" \
  -d '{"repo": "alyx.example", "collection": "example.alyx.customRecord", "record": {"custom": "Hello, world!"}}'
```

Or:
```bash
$ curl -X POST localhost:3000/xrpc/com.atproto.repo.createRecord \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer "$pds_access_session"" \
  -d '{"repo": "alyx.example", "collection": "example.alyx.customRecord", "record": {"custom": "Hello, world!"}}'
```

## Inspect your PDS using a web app

You can also use [pdsls.dev](https://pdsls.dev/) to inspect any records stored on your PDS. Yes, everything stored on your PDS is public, keep this in mind.

