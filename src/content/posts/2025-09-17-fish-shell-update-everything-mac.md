---
title: "Update everything on macOS with one Fish command"
published: 2025-09-17
description: "A handy Fish shell function to update Homebrew, casks, and Mac App Store apps all at once."
image: 'https://slink.alyx.pink/image/c0712389-2d13-4434-ae82-593e28ae29a5.jpg'
tags: ["fish", "shell", "macos", "homebrew", "tips"]
category: 'Tips'
draft: false
lang: "en"
---

*Picture from [Andras Vas](https://unsplash.com/fr/@wasdrew?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/fr/photos/macbook-pro-turned-on-Bd7gNnWJBkU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)*

Got tired of running multiple apps and commands to keep my Mac updated? Here's a Fish shell function that handles everything in one go:

```fish
function upall --description "Update all the things"
    brew update-reset && \
    brew update && \
    brew upgrade --formulae && \
    brew cu --all --cleanup --no-brew-update --interactive --include-mas && \
    brew cleanup --prune=all
end
```

Just run `upall` and you're set! Here's what each part does:

- **`brew update-reset`** - Resets Homebrew to fix any potential issues
- **`brew update`** - Fetches the latest package definitions
- **`brew upgrade --formulae`** - Updates all your CLI tools and libraries
- **`brew cu --all --cleanup --no-brew-update --interactive --include-mas`** - Updates cask applications and Mac App Store apps (requires [brew-cask-upgrade](https://github.com/buo/homebrew-cask-upgrade))
- **`brew cleanup --prune=all`** - Removes old versions and cleans up the cache

The `--interactive` flag is particularly nice—it lets you choose which cask apps to update, perfect for when you want to skip that one app that always breaks after updates.

To add this to your Fish shell, paste the function into a function file, mine is `.config/fish/functions/upall.fish`. No more remembering multiple commands or running them one by one!

*Note: You'll need to install `brew-cask-upgrade` first, see [github.com/buo/homebrew-cask-upgrade](https://github.com/buo/homebrew-cask-upgrade)*.
