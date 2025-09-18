---
title: "Comment fonctionne mon NAS UNRAID à domicile ?"
published: 2023-12-17
description: "J'ai depuis longtemps un NAS à la maison. Retour d'expérience sur Unraid, un OS pour serveur qui me permet de gérer facilement stockage de masse et hébergement de services."
image: 'https://slink.alyx.pink/image/f3955d6e-d13a-40db-9bcf-928c8e69b1a6.webp'
tags: ["docker", "unraid", "nas", "hardware", "cloudflare"]
category: 'Hardware'
draft: false
---

J'ai depuis longtemps un NAS à la maison. Je ne sais plus vers quel âge, probablement vers 15 ans. J'avais récupéré des pièces d'une décheterie pour assembler mon premier serveur. Autant vous dire que les performances n'étaient pas au rendez-vous.

Un vieux petit boîtier tout jauni, dans lequel j'avais coupé un trou au Dreml pour lui coller un ventilateur tant il avait chaud dans mon placard. Ma mère ne voulait pas le voir en dehors, il était trop moche. Je m'amusais bien avec, un petit serveur LAMP et je ne sais plus trop quoi d'autres dessus. Ça m'a fait les bases de l' admininistration système et de serveur web.

J'ai pu m'acheter une vraie config de NAS quelques années plus tard, très light en performance, mais me permettant de faire tourner Plex correctement et d'avoir du stockage de dispo. Je faisais tourner Ubuntu Server dessus. Ça demandait beaucoup d'interventions manuelles pour le mettre à jour, et le faire évoluer (installer des nouvelles applications par exemple). J'ai écrit quelques scripts pour me simplifier la tâche mais c'était assez relou. J'ai vite su que c'était pas pour moi d'avoir un truc comme ça à gérer à la maison, ou même dans mon métier. Je voulais déjà tout automatiser.

J'ai déménagé à Paris vers mes 20 ans, et j'ai emmené mon PC gaming ainsi que mon serveur. J'ai un peu repris la main dessus, collectant les films de vacances sur mon NAS pour les regarder entre amis. Ça demandait toujours autant de maintenance cependant.

J'avais envie d'un NAS autonome dont j'aurais juste à m'occuper des films de vacances et des logiciels, rien d'autres. Un truc bête genre un Synology... mais c'est hors de prix, et pas le choix du software qui tourne dessus.

Et j'ai fini par trouvé la solution. J'ai un NAS très autonome, j'ai besoin de faire que très peu de maintenance, l'installation était d'une facilitée déconcertante, et le grand choix d'applications disponibles en one-click install est un vrai plaisir. Je vais bien sûr vous parler de [Unraid](https://unraid.net/).

# Mais d'abord, c'est quoi un NAS exactement ?

Un NAS, aussi appelé "Network Attached Storage" et un système de stockage connecté en réseau qui permet de centraliser les données et de les mettre à disposition des utilisateurs.

Ce NAS fait un peu plus que ça, puisque'il héberger également des services, c'est devenu un abus de langage je pense de dire NAS pour en fait ce qui est un simple serveur de stockage et plus encore. Peut-être que le terme de serveur à domicile serait plus approprié ?

# Mon utilisation

On peut répartir l'utilisation de mon NAS en deux catégories, qui se complètement l'une et l'autre. La partie donc je m'occupe très peu, et dont je suis heureuse de laisser Unraid laisser ça, et l'autre partie qui m'amuse: lancer et gérer des services.

## Stockage de masse

![5 disques, 80TB au total, dont 48TB utilisables (deux disques de parités)](https://slink.alyx.pink/image/a99c4a16-af6c-4b39-935e-4e62178b53c2.png)

J'ai une grappe totale de `5x16TB` de données, soit `80TB`. Cependant, deux des disques sont utilisé pour la parité. Ce sont des disques servant à sauvegarder des informations qui permettent de récupérer les données en cas de panne d'un autre disque. Si l'un de mes disques venaient à mourir, alors Unraid peut recalculer les données manquantes.

J'ai fait le choix d'avoir 2 disques de parité: avec autant de données disponible (`48TB`), je veux surtout pas avoir un soucis lors de la perte d'un disque par exemple. Elles me sont précieuses, ça vaut le coup d'investir pour les protéger. Il faut noter que le re-calcul de la parité peut prendre des heures et des heures, et est très intensive sur l'utilisation des disques. Pas question de perdre un second disque pendant la restauration.

Mais tout de même, `48TB` ça me laisse une belle marge d'utilisation, et il est tout à fait possible de continuer à l'étendre comme bon me semble. Unraid permet d'ajouter des disques à une grappe existante d'une manière extrêmement simple. Seul problème: vous ne pouvez pas dépasser la taille du plus petit disque de parité. Dans mon cas, je ne pourrais jamais mettre un disque plus gros que 16TB.

Pour faire simple et vous donner un exemple, pour [installer un nouveau dissque](https://docs.unraid.net/unraid-os/manual/storage-management/#adding-disks), il vous suffit d'éteindre le NAS, brancher vos nouveaux disques, rallumer le NAS, assigner les nouveaux disques à la grappe de votre choix (vous pouvez en avoir plusieurs), lui dire de le formater, et il s'occupe de faire le reste pour vous. Une fois que tout est prêt, le stockage disponible est automatiquement mis à disposition.

## Hébergement de services

![Le menu principal de l'interface d'admin de Unraid](https://slink.alyx.pink/image/075ce524-5b06-4595-be4c-571db21746e4.png)

Unraid tire sa puissance de sa facilité à installer des applications, en utilisant la technologie des containers Docker, ainsi qu'un "marketplace" rendant encore plus simple le lancement des apps proposés.

Le "marketplace," c'est ce qui peut s'apparenter à des templates, souvent pré-rempli pour vous faciliter la tâche, avec des exemples. Par exemple, pour un serveur Redis, vous aurez ça:

![](https://slink.alyx.pink/image/96229e51-1144-4fcd-94fc-4efacda99fdb.png)

La plupart des options peuvent être laissés par défaut et votre container se lancera automatiquement. Vous avez un accès rapide aux logs pour voir ce qu'il se passe au lancement. Si le container expose une Web UI, et que le template est bien fait, alors un bouton "Web UI" apparaitra en cliquant sur le logo du container déployé.

Unraid intègre un système qui détecte si une nouvelle version du container est disponible, et en un seul clic, il le mettra à jour. Attention aux notes de mises à jour cependant ! Il arrive parfois que vous deviez effectuer une action manuelle avant/après la mise à jour, ne vous faites pas avoir.

Vous vous retrouvez alors avec une interface d'admistration de vos applications déployées, en cours ou stoppées:

![](https://slink.alyx.pink/image/2e3ac7d4-faf0-4669-af07-0c44e1a99a08.png)

## Services utilisés

J'utilise de nombreux services accumulés au fil du temps. Prenez le temps de les prendre en main et comprendre ce qu'ils peuvent faire pour vous. Amusez vous aussi, si le service vous plait pas, supprimez le tout simplement, il n'y a rien d'instrusif dans l'OS à supprimer qui pourrait être laisser derrière, sauf peut-être les appdata, mais c'est juste un dossier à un seul endroit donc pas de panique pour les nettoyage.

#### [**Tailscale**](https://tailscale.com/)

Je commence par celui-ci car il est intégré nativement – via un plugin disponible – à Unraid et vous permet de vous connecter à votre serveur depuis n'importe où, comme si vous étiez chez vous.

Pour rappel, Tailscale est un service de réseau privé virtuel (VPN) qui permet de connecter de manière sécurisée et facile des appareils et des services à travers internet. Il utilise la technologie WireGuard pour établir des connexions rapides et cryptées, offrant ainsi un accès sécurisé aux ressources de votre réseau, dans le monde entier. Tailscale se distingue par sa configuration simple, ne nécessitant pas de matériel spécialisé ni de configuration réseau complexe. Il offre également tout un tas de features très utiles, comme la possibilité d'envoyer des fichiers entre les appareils du réseau, ou encore une meilleure gestion de DNS pour tous vos appareils.

Ça vous ouvre des possibilités incroyable: un point de montage sur Files.app de votre iPhone vers vos Partages Samba, l'utilisation de Adguard-Home en dehors de chez vous, sans jamais avoir besoin d'exposer vos services sur internet. Peu importe où vous êtes, sur n'importe quel réseau, vous êtes comme chez vous.

Vous pouvez même vous servir de votre serveur comme un nœud de sortie VPN: dans ce cas, toute votre connexion sera tunnelée vers votre serveur et sortira de chez vous. Pas mal si vous voulez regarder un contenu géo-bloqué de votre pays pendant un voyage par exemple.

![masthead static](https://cdn.sanity.io/images/w77i7m8x/production/6d16dd6fac328a0575f3bf9d460cf6cb37f9044e-1360x725.svg?w=3840&q=75&fit=clip&auto=format)

#### [**AdGuard Home**](https://github.com/AdguardTeam/AdGuardHome)

Un bloqueur de publicités et de tracking pour tout votre réseau, qui protège tous les appareils connectés. Fonctionne uniquement via les DNS cependant, donc impossible de supprimer les pré-roll de pubs YouTue ou Twitch.

#### [**Cloudflared Tunnel**](https://github.com/cloudflare/cloudflared)

Crée un tunnel sécurisé entre votre serveur Unraid et les services Cloudflare pour un accès distant sécurisé. Ça vous permet d'exposer vos services publiquement, comme [blog.alyxpractice.com](https://blog-ghost.alyx.pink/) par exemple ou bien [files.alyxpractice.com](https://files.alyxpractice.com/).

#### [**db-backup**](https://hub.docker.com/r/tiredofit/db-backup/)

Un outil pour automatiser les sauvegardes de vos bases de données.

#### [**Ghost**](https://ghost.org/)

Une plateforme de blogging élégante et moderne, idéale pour ceux qui cherchent une alternative à WordPress. C'est sur celle-ci que vous me lisez !

C'est beaucoup centré sur la génération de contenu payant, mais vous pouvez très facilement désactiver tout ça et rendre tout gratuit et accessible. Je n'ai pas encore trop fouillé si il existait beaucoup de plugins, thèmes, etc... mais son interface de base me permet de me focus sur mon contenu et c'est très bien comme ça.

#### [**Homarr**](https://homarr.dev/)

Un tableau de bord personnalisable pour centraliser et accéder facilement à vos applications et services web. Plus simple que de passer par Unraid > Docker > Web UI systématiquement.

#### [**Home Assistant**](https://www.home-assistant.io/)

Une solution de domotique pour contrôler et automatiser votre maison intelligente. Apporte de nombreuses solutions pour combler le manque des plateformes classiques type Siri, Alexa, Google Assistant, etc...

#### [**icloudpd**](https://github.com/Womabre/unraid-docker-templates)

Un service pour télécharger automatiquement vos photos iCloud sur votre serveur Unraid. Attention le token doit être renouveler régulièrement, mais je me sens plus safe d'avoir toutes mes photos en backup chez moi.

#### [**MariaDB**](https://mariadb.org/)

Un système de gestion de base de données, compatible avec MySQL, pour stocker et gérer vos données.

#### [**Picoshare**](https://github.com/mtlynch/picoshare)

Un outil simple pour partager des fichiers et des images via votre serveur. Disponible via [files.alyxpractice.com](https://files.alyxpractice.com/)

![](https://slink.alyx.pink/image/adb17c13-709d-4f67-a52d-6f787f14d04c.png)

#### [**Plex Media Server**](https://www.plex.tv/)

Un serveur de médias pour organiser et diffuser votre collection de vidéos, musiques et photos, pour vous et vos amis. Parfait pour partager vos films de vacances ! Disponible sur toutes les plateformes.

![](https://slink.alyx.pink/image/74a5277e-79f0-477d-8558-7a1474e15373.png)

#### [**Prowlarr**](https://github.com/Prowlarr/Prowlarr)

Un gestionnaire pour indexer des sites de torrents et Usenet, facilitant la recherche de médias. Il vous permet de centraliser la configuration de vos clients de torrents et indexers, et synchroniser les paramètres avec la suite logiciels `*arr` comme `radarr` ou `sonarr`...

#### [**qBittorrent**](https://www.qbittorrent.org/)

Un client torrent léger et puissant pour télécharger et partager des fichiers.

#### [**Radarr**](https://github.com/Radarr/Radarr)

Un gestionnaire de films qui automatise le processus de recherche, téléchargement et organisation de votre collection de films.

#### [**Red-DiscordBot**](https://github.com/PhasecoreX/docker-red-discordbot)

Un bot Discord personnalisable avec un système de "[cogs](https://index.discord.red/)" ou plugins, créés par la communauté, pour améliorer l'interaction sur vos serveurs Discord. Il est utilisé sur le discord de 3615.computer.

#### [**Sonarr**](https://sonarr.tv/)

Un gestionnaire de séries TV qui automatise le téléchargement et l'organisation de vos émissions télévisées.

#### [**Soulseek**](https://github.com/slskd/slskd)

Une application de partage de fichiers axée sur la musique, idéale pour découvrir et télécharger de la musique rare ou spécifique. Fonctionne en pair à pair, voir friends to peers, puisque chacun a un pseudo et vous pouvez discuter avec la personne. C'est toujours sympa de se faire remercier d'avoir partager des fichiers avec quelqu'un !

![](https://slink.alyx.pink/image/72a9a8f9-8ab3-4494-9a6e-0094b02925fc.png)

#### [**Tautulli**](https://tautulli.com/)

Un outil de surveillance et de suivi pour Plex Media Server, offrant des statistiques détaillées sur l'utilisation. Pratique pour savoir si votre serveur fait plaisir à vos invités. Il me permet aussi d'envoyer des notifications sur Discord et bien d'autres pour savoir quand un nouvel épisode ou film de vacances est disponible.

#### [**UptimeKuma**](https://github.com/louislam/uptime-kuma)

Un moniteur de disponibilité pour garder un œil sur l'état et la performance de vos sites web et services. Il vous permet de vous envoyer une alerte où vous le souhaitez.

![](https://slink.alyx.pink/image/a19f8800-09e7-4c44-9bd7-13a4eeeca63d.png)

#### [**YouTube-DL**](https://github.com/Jeeaaasus/youtube-dl)

Un outil pour télécharger des vidéos de YouTube et d'autres sites de partage de vidéos, directement sur votre serveur. Ça me permet d'avoir les vidéos de mes chaînes favorite en local pour les regarder via Plex par exemple.

![L'interface est un peu austère cependant](https://slink.alyx.pink/image/bf5aefbc-5681-459b-aea7-476df4972cda.png)

# Mes services favoris

## Unraid, le coeur du serveur

Unraid, c'est un peu le couteau suisse des systèmes d'exploitation pour serveurs. Basé sur Linux, il est très souple et "facile d'entretien". Vous pouvez mixer des disques durs de différentes tailles pour créer un espace de stockage sur mesure.

Vous pouvez créer un pool de stockage de masse, une partie cache pour accélérer l'upload des fichiers vers celui-ci, faire une grappe de SSD pour vos applications et machines virtuelles, etc... Il s'adapte à vos besoins.

Son gros plus ? La redondance des données, grâce à un système de parité qui protège contre la perte de données. Il est très intuitif et convivial avec une interface web facile à gérer. Vous n'aurez quasiment pas besoin de la ligne de commande, pour pas dire du tout.

Vous pouvez faire plus encore: par exemple, lancer une machine virtuelle Windows, installer une carte graphique de gaming dans le NAS, et grâce à une configuration de mise, vous pourriez très bien en faire votre PC de jeu en plus de votre NAS. L'exemple idéal me semble être pour les invités qui viennent chez moi: on est toujours frustré de pas pouvoir se faire une game de Overwatch ensemble. Peut-être que je pourrais régler ce soucis...

À noter qu'il est payant et n'est pas open-source. Mais son prix est tellement faible par rapport au gain de temps assuré, croyez moi c'est un bon investissement. Vous pouvez l'essayer 30 jours avant de vous faire un avis [unraid.net/pricing](https://unraid.net/pricing).

![](https://slink.alyx.pink/image/a41b198a-b1f7-4bdd-912e-37f0753d4c0d.png)

Fun fact: l'OS est stocké sur clé USB (puis chargé en RAM ?) donc prévoyez d'en condamner une, ou en acheter une pour l'occasion.

Personnellement, j'ai essayé TrueNAS (et peut-être FreeNAS aussi, je me souviens plus ?): non merci. Si vous rêvez d'avoir constamment les mains dans le cambouis, et d'un OS libre et open-source, peut-être vous y trouverez votre bonheur.

## Hardware

C'est une vielle machine – mon très ancien PC de jeu – qui fait désormais tourner mon NAS. Il est prévu de faire un gros rafraichissement dans quelques mois:

```
MSI Z77A-G45 (MS-7752) , Version 1.0
American Megatrends Inc., Version V2.5
BIOS dated: Tue 19 Jun 2012 12:00:00 AM CEST

Intel® Core™ i3-2120 CPU @ 3.30GHz

Memory: 8 GiB DDR3

5x16TB HDD
```

Honnêtement, il est assez stable. N'espérer du transcode Plex, ou pouvoir installer un container rapidement, mais il tient la route.

Il est parfois dans les choux, et me fait parfois très peur quand je dois le force reboot cependant, ça reste très rare.

# Conclusion

Sans lui ma vie quotidienne serait bien différente. Il me permet d'explorer énormément de choses, facilement, de lancer des services à droite à gauche, et enfin avoir un serveur de stockage redondant pour y sauvegarder tout ce dont j'ai besoin depuis mes différents appareils (attention à ne jamais confondre redondance et sauvegarde/backup !).

J'ai tous mes media en un seul endroit, et plusieurs petits services qui sont chez moi, qui ne dépendent presque de personne *(tousse tousse cloudflare tunnel tousse tousse).*

Un rafraichissement de la configuration est à venir, je n'ai pas encore d'idée précise en tête mais je veux pas non plus casser la banque. Je pense tabler sur un budget de 500-600€ pour carte-mère, CPU, mémoire vive, alimentation, disque NVMe pour ce qui nécessite vraiment de la grande vitesse (genre des base de données) et double disque SSD (dont un de parité) pour ce qui est entre le stockage et le besoin de performance (applications Docker et machines virtuelle).

Une nouvelle alimentation au meilleur rendement ne serait pas de trop également, ainsi que quelques ventilateurs plus silencieux. Je pense partir sur des composants "grand public" plutôt que des gammes orientés serveurs professionnels, pour des raisons de coût.

Je ne pense pas me tourner vers un serveur de type professionnel, mais qui sait, si je trouve une affaire sur eBay par exemple...

# Screenshots divers

![](https://slink.alyx.pink/image/803f01c2-d975-46a0-9f4e-c2197b1d08b6.png)

![](https://slink.alyx.pink/image/5c870fb4-d6bb-4372-8f6b-3909cbb09ad9.png)

![](https://slink.alyx.pink/image/a5ec92e4-cf39-4d73-8083-64589b8b4653.png)

![](https://slink.alyx.pink/image/a67b3307-d63a-4d5a-a2e4-b791cfcfdfc3.png)

![](https://slink.alyx.pink/image/942f7a9a-6684-4aa8-83f3-ebc229bb70de.png)

![](https://slink.alyx.pink/image/b3ef0622-0c7b-4ebb-a41c-742945b60675.png)

# Parlez-moi de votre expérience !

Pour plus d'information sur Unraid, rendez-vous sur [unraid.net](https://unraid.net/).

Vous avez déjà un NAS, souhaitez le mettre à niveau ou simplement partager votre expérience et les services les plus cools que vous faites tourner ? Parlez-en moi sur Mastodon ([3615.computer/@alyx](https://3615.computer/@alyx)), je me ferais un plaisir d'échanger avec nous !
