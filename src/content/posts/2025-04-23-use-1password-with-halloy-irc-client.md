---
title: 2025-04-23-use-1password-with-halloy-irc-client
published: 2025-04-23
description: "How to use 1Password to authenticate to your favorite IRC server"
image: ""
tags: [IRC, Halloy, 1Password, Security]
category: ""
draft: false
lang: "en"
---

## How to use 1Password to authenticate to your favorite IRC server

1Password is a password manager that can help you securely store and manage your passwords, including those for IRC servers. In this guide, we'll show you how to use 1Password to authenticate to your favorite IRC server using the Halloy IRC client.

## Prerequisites

- You need to have [1Password](https://1password.com/) installed and set up on your device. Any other password manager that supports the same features can be used, check your password manager's documentation for more information.
  - 1Password CLI (`op`) must be installed and configured. You can find the installation instructions [here](https://developer.1password.com/docs/cli/get-started/).
- You need to have the [Halloy IRC client](https://halloy.chat/) installed on your device. Other IRC clients may also work, but this guide was tested with Halloy.
- You need to have an account on the IRC server you want to connect to. I'll be usng [libera.chat](https://libera.chat/) as an example.

## Step 1: Create a new login in 1Password

1. Open 1Password and click on the **"+ New Item"** button.
2. Select "Login".
3. Enter the following information:

   - **Name**: The name of the IRC server (e.g., "libera.chat").
   - **Username**: Your IRC username.
   - **Password**: Your IRC password.
   - **Website**: The URL of the IRC server (e.g., "irc://libera.chat").

4. Select a vault and click "Save".

## Step 2: Configure Halloy to get password from 1Password on startup

1. Open the Halloy IRC client configuration file. This file is usually located at :

   - **Windows**: `%AppData%\halloy`
   - **Mac**: `~/Library/Application Support/halloy` or `$HOME/.config/halloy`
   - **Linux**: `$XDG_CONFIG_HOME/halloy` or `$HOME/.config/halloy`

2. In 1Password, copy the UUID of the login you created in Step 1. You can find the UUID by clicking on the login > three-dots menu > "Copy item UUID".
3. Add the following lines to the configuration file:

```toml
[servers.<server>]
server = "<server>"
nickname = "<nickname>"
channels = []
sasl.plain.username = "<username>"
sasl.plain.password_command = "op read op://<vault>/<uuid>/<field-name>"
```

3. Save the configuration file.
4. Restart the Halloy IRC client.

## Step 3: Connect to the IRC server

1. Open the Halloy IRC client.
2. You should see a prompt asking to unlock your 1Password vault, asked by Halloy's app.
3. Enter your 1Password master password to unlock the vault.
4. Once unlocked, Halloy will automatically retrieve your IRC password from 1Password and connect to the IRC server using the credentials you provided.
5. You should now be connected to the IRC server and can start chatting!

## Conclusion

Using 1Password to authenticate to your favorite IRC server with the Halloy IRC client is a secure and convenient way to manage your passwords. By following the steps outlined in this guide, you can easily connect to your IRC server without having to remember or type in your password every time.

This method also helps to keep your passwords secure (not hardcoded) and reduces the risk of password leaks or breaches.
