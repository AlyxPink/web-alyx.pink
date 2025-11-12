---
title: "Comment se passer de ChatGPT Plus à 20 $ par mois, au profit de LobeChat ?"
published: 2024-03-22
description: "Découvrez comment remplacer votre abonnement ChatGPT Plus par LobeChat, une interface open-source qui vous permet de payer uniquement ce que vous utilisez via l'API OpenAI."
image: "https://slink.alyx.pink/image/2bf83a52-d0ab-424a-b020-adf636e4e769.webp"
tags: ["ai", "chatgpt", "open-source", "docker", "api"]
category: "AI"
draft: false
lang: "fr"
---

J'ai récemment arrêté mon abonnement ChatGPT Plus et j'ai pu le remplacer par une simple souscription à leur API, me permettant de payer juste ce que j'utilise. Beaucoup moins cher, et proposant – selon moi – plus d'options que leur interface assez sommaire, sans pour autant ne plus pouvoir profiter de toutes les fonctionnalités que OpenAI propose.

## Qu'est-ce que LobeChat ?

LobeChat est un projet open source, disponible sur [https://github.com/lobehub/lobe-chat](https://github.com/lobehub/lobe-chat), qui se décrit ainsi :

> An open-source, modern-design ChatGPT/LLMs UI/Framework. Supports speech-synthesis, multi-modal, and extensible (function call) plugin system. One-click **FREE** deployment of your private ChatGPT/Gemini/Ollama chat application.

![Interface LobeChat](https://slink.alyx.pink/image/2bf83a52-d0ab-424a-b020-adf636e4e769.webp)

C'est un front-end qui peut se brancher à diverses API, que ce soit ChatGPT ou d'autres, comme votre propre instance locale via [Ollama](https://github.com/jmorganca/ollama).

L'interface ressemble beaucoup à celle de ChatGPT, ce qui rend l'adoption très facile.

![Fonctionnalités de LobeChat](https://slink.alyx.pink/image/94f12df8-54c3-43be-8951-40410752e187.png)

## Comment lancer LobeChat ?

Personnellement, j'ai utilisé Unraid pour lancer le container Docker de LobeChat avec la configuration suivante :

```bash
$ docker run -d -p 3210:3210 \
  -e OPENAI_API_KEY=sk-xxxx \
  -e ACCESS_CODE=lobe66 \
  --name lobe-chat \
  lobehub/lobe-chat
```

Cette configuration :
- Expose le container sur le port 3210
- Fournit votre clé API OpenAI
- Définit un mot de passe d'accès
- Utilise l'image Docker officielle

## Comment l'utiliser ?

Pour utiliser LobeChat, vous devez :

1. Configurer votre clé API OpenAI dans les variables d'environnement
2. Accéder à l'interface web via votre navigateur
3. Saisir le code d'accès que vous avez défini
4. Commencer à discuter avec l'IA

![Interface utilisateur 1](https://slink.alyx.pink/image/436b2fcb-4593-4358-9d67-caf0557c572b.png)

![Interface utilisateur 2](https://slink.alyx.pink/image/dea53237-30bc-41ba-ae9e-312c9664489e.png)

L'interface est intuitive et offre de nombreuses options de personnalisation.

## Analyse des coûts

Avant LobeChat, je payais 20 $ par mois pour ChatGPT Plus. Avec l'API OpenAI via LobeChat :

- En février : j'ai dépensé 9 $ d'utilisation API
- En mars (jusqu'au 16) : 6,61 $ seulement

Je recommande de configurer des limites de crédit pour éviter les mauvaises surprises sur votre facture.

## Fonctionnalités supplémentaires de LobeChat

### LobeHub et marketplace d'agents

LobeChat propose un "LobeHub" avec des agents de conversation prédéfinis pour différents cas d'usage.

### Plugin Store

![Plugin Store](https://slink.alyx.pink/image/60fe8ef2-95d4-4565-a3cf-07c6e003356c.webp)

Un magasin de plugins permet d'étendre les fonctionnalités avec diverses intégrations.

### Application Web Progressive (PWA)

LobeChat peut être installé comme une PWA sur vos appareils, offrant une expérience native sur mobile et desktop.

![Interface mobile responsive](https://slink.alyx.pink/image/e5702144-6d51-41d3-95b2-3ffac314818a.webp)

### Support multi-providers

En plus d'OpenAI, LobeChat supporte :
- AWS Bedrock
- Google AI
- Azure OpenAI
- Et bien d'autres fournisseurs d'IA

## Conclusion

Pour moi, c'est un succès. J'économise de l'argent tout en ayant plus de flexibilité et d'options. Le seul inconvénient est que les conversations ne sont stockées que dans le navigateur, ce qui peut être gênant si vous changez d'appareil.

Cette solution est particulièrement adaptée pour les utilisateurs avec une utilisation occasionnelle de l'IA. Les utilisateurs plus intensifs pourraient encore préférer l'abonnement ChatGPT Plus pour sa simplicité.

LobeChat représente une excellente alternative open-source qui vous donne le contrôle sur vos coûts et vos données.
