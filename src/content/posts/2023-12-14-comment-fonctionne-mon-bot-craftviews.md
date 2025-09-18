---
title: "Comment fonctionne mon bot qui poste des paysages Minecraft aléatoires ?"
published: 2023-12-14
description: "Explication du fonctionnement de mon bot CraftViews qui génère et partage automatiquement des captures d'écran de paysages Minecraft aléatoires toutes les 4 heures."
image: 'https://slink.alyx.pink/image/9919ffab-5a2a-464e-bb4c-e83a3e1678e1.png'
tags: ["minecraft", "bot", "golang", "automation", "mastodon", "screenshot"]
category: 'Development'
draft: false
---

## Qu'est-ce que c'est ?

J'ai créé le bot [@CraftViews](https://3615.computer/@CraftViews) qui envoie toutes les 4h une "photo" d'un paysage Minecraft entièrement aléatoire sur le réseau social [Mastodon](https://joinmastodon.org/).

Le script, écrit en [Go](https://go.dev/), va lancer Minecraft, créer un nouveau monde, se téléporter à un endroit aléatoire à la surface, prendre une capture d'écran et la poster sur Mastodon.

## Exemples

Voici quelques exemples de captures générées par le bot :

![Paysage Minecraft 1](https://slink.alyx.pink/image/0261ac89-9421-4b97-9e78-f180e5b0ed51.png)

![Paysage Minecraft 2](https://slink.alyx.pink/image/9b9aa25a-d029-4449-8bd7-fbc7ca98835b.png)

![Paysage Minecraft 3](https://slink.alyx.pink/image/da19e5c3-8158-4c3a-95b7-ce82d378ca84.png)

## Idée

J'ai toujours trouvé les paysages de Minecraft absolument fantastique. Généré aléatoirement et procéduralement, ils sont toujours uniques et peuvent être d'une incroyable beauté.

Ajoutant à cela des shaders, permettant de rendre le jeu encore plus beau, on obtient des vues magnifiques. Ajoutez à ça quelques éléments tel que de l'eau, une source de lave brillante de mille feux, un lever ou coucher de soleil et on a le plus beau des paysages.

Pour nous vieux joueurs (je joue depuis la version Alpha du jeu en décembre 2010), il y a aussi un côté nostalgique à voir ces paysages. À la façon de Edward Hopper, souvent vides de vie, ils ont quelque chose d'un peu étrange, comme si c'était abandonné de toute vie.

![Paysage Minecraft 4](https://slink.alyx.pink/image/9ec08179-29c4-4846-bb29-d0d719fdf9b3.png)

## Dans les grandes lignes

Ce projet de bot se compose de deux fichiers Go principaux :

### main.go

Ce fichier contient la logique principale pour :
- Prendre les captures d'écran de Minecraft
- Les publier sur Mastodon avec l'API appropriée
- Gérer les erreurs et la configuration

### minecraft.go

Ce fichier contient toutes les fonctions spécifiques à Minecraft :
- Lancement du jeu
- Création d'un nouveau monde
- Téléportation à des coordonnées aléatoires
- Prise de capture d'écran
- Fermeture du jeu

![Paysage Minecraft 5](https://slink.alyx.pink/image/ac91fa2d-95e5-401d-93bb-6a115a33c14a.png)

## Comment tout ça fonctionne

Le processus est relativement simple mais nécessite plusieurs étapes coordonnées :

### 1. Lancement de Minecraft

Le script utilise la bibliothèque `robotgo` pour automatiser les interactions avec l'interface utilisateur et lancer Minecraft.

### 2. Création d'un nouveau monde

Une fois Minecraft ouvert, le bot navigue dans les menus pour créer un nouveau monde avec des paramètres aléatoires.

### 3. Téléportation aléatoire

Le bot utilise la commande `/spreadplayers` de Minecraft pour se téléporter à un endroit aléatoire à la surface du monde généré. Cette commande est particulièrement utile car elle garantit que le joueur apparaît toujours sur un bloc solide.

### 4. Configuration de l'environnement

Le bot configure ensuite :
- Le mode de jeu (créatif ou spectateur pour une meilleure vue)
- L'heure de la journée (aléatoire)
- Les conditions météorologiques

### 5. Prise de capture d'écran

Une fois positionné, le bot prend une capture d'écran haute résolution du paysage.

### 6. Publication sur Mastodon

Finalement, la capture d'écran est postée sur Mastodon avec une description générée automatiquement.

## Qu'est-ce qu'on peut améliorer

### Automatisation

Actuellement, le script doit être lancé manuellement. Une amélioration évidente serait de l'automatiser via :
- Un serveur dans le cloud avec une tâche cron
- Un service Windows/Linux qui tourne en arrière-plan
- Une instance Docker déployée sur un VPS

### Stockage en masse des captures

Au lieu de poster immédiatement, le bot pourrait :
- Générer plusieurs captures d'écran à la fois
- Les stocker localement ou dans le cloud
- Les poster selon un planning défini

### Shaders et resource packs aléatoires

Pour encore plus de variété, le bot pourrait :
- Choisir aléatoirement parmi différents shaders
- Utiliser différents resource packs
- Varier les générateurs de terrain

### Partager les informations du monde

Une fonctionnalité intéressante serait de partager :
- Le seed du monde généré
- Les coordonnées exactes de la capture
- Les paramètres utilisés (heure, météo, etc.)

Cela permettrait aux joueurs de revisiter ces lieux s'ils le souhaitent.

### Génération de texte alternatif

Pour l'accessibilité, le bot pourrait générer automatiquement des descriptions textuelles des images pour les personnes malvoyantes.

## Conclusion

Ce petit projet m'a permis d'explorer l'automatisation d'un jeu vidéo tout en créant du contenu intéressant pour les réseaux sociaux. C'est pas grand chose mais c'est du travail honnête !

Le code source est disponible sur [GitHub](https://github.com/VictorBersy/minecraft-screenshot-bot) pour ceux qui souhaiteraient l'adapter ou l'améliorer.

---

*Article original publié le 14 décembre 2023*
