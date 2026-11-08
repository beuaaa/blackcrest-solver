# Blackcrest Solver

Outil gratuit pour le **Décodeur** de l'événement **Blackcrest** d'*Asphalt Legends* : il indique, à chaque coup, la case à ouvrir pour trouver les 3 récompenses d'un panneau avec le moins de décodeurs possible.

👉 **https://blackcrest.gauntlet-manager.com/**

Outil de fan, non officiel, sans lien avec Gameloft.

## Fonctionnalités

- Probabilité de récompense affichée sur chaque case, case conseillée entourée en bleu.
- Calcul qui anticipe 3 à 5 clics : environ **10 décodeurs par panneau** en moyenne en simulation.
- La 2ᵉ case ✕ se place toute seule (le jeu la met toujours à l'opposé de la 1ʳᵉ).
- Après une récompense, question sur les « ! » voisins encore affichés, réponses certaines remplies automatiquement.
- Cases incohérentes entourées en rouge, sans bloquer l'outil.
- Statistique du nombre moyen de décodeurs utilisés par panneau.
- Tutoriel interactif avec démonstrations animées, et liste des nouveautés à chaque version.
- Français, español, English.
- Application installable (PWA), qui fonctionne hors connexion. La partie est sauvegardée automatiquement.

## Règles du jeu utilisées

- Le panneau compte 5 rangées de 8, 9, 8, 9 et 8 hexagones, avec 2 cases ✕ symétriques et 3 récompenses.
- Une case cliquée qui contient une récompense, ou qui touche une récompense cachée (« ! »), ne révèle qu'elle-même.
- Une case cliquée vide révèle aussi ses voisines, qui n'apportent aucune information.
- Un « ! » s'efface dès qu'il ne touche plus aucune récompense cachée.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application (HTML, CSS et JavaScript dans un seul fichier) |
| `manifest.json` | Manifeste de l'application installable |
| `sw.js` | Service worker : fonctionnement hors connexion et mises à jour |
| `icons/` | Icônes de l'application |

Aucune dépendance et aucune étape de construction : il suffit de servir le dossier en HTTPS (Nginx, Apache, GitHub Pages…). La seule ressource externe est la police Google Fonts.

## Publier une nouvelle version

1. Dans `index.html`, changer `APP_VERSION` et ajouter une entrée en haut de `CHANGELOG`, dans les trois langues. Le tutoriel affiche alors les nouveautés aux joueurs.
2. Dans `sw.js`, changer `VERSION`, pour que les applications installées récupèrent les nouveaux fichiers.
3. Pour une simple correction de texte, ne changer que `VERSION` dans `sw.js` : le tutoriel ne se rouvre pas.

---

# Blackcrest Solver (English)

Free helper for the **Decoder** of the **Blackcrest** event in *Asphalt Legends*: at each step it tells you which cell to open to find a panel's 3 rewards with as few decoders as possible (about 10 per panel on average in simulation). Available in English, French and Spanish, installable as an app and usable offline.

Unofficial fan tool, not affiliated with Gameloft.
