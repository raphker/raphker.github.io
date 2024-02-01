## Développement

### Installation

Avant de commencer le développement, assurez-vous d'avoir les outils suivants installés sur votre système :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (inclut npm, le gestionnaire de paquets Node.js)

#### Cloner le dépôt :

```bash
git clone https://github.com/achtaitaipai/r-trema.git my-site-name
```

#### Naviguer dans le dossier :

```bash
cd my-site-name
```

#### Installer les dépendances :

```bash
npm install
```

#### Exécuter Eleventy :

Construire un livrable :

```bash
npm run build
```

L'exécuter sur le serveur de développement local :

```bash
npm start
```

## Création de contenu

Le contenu est écrit à l'aide de la syntaxe [Markdown](https://www.markdownguide.org/cheat-sheet/) dans les fichiers `.md`. Le "frontmatter" écrit en [Yaml](https://learnxinyminutes.com/docs/yaml/) permet de définir des métadonnées telles qu'un titre ou l'ordre d'apparition.

### Frontmatter

Le frontmatter est définit au début du fichier entre les séparateur `---`.
Pour écrire une valeur sur plusieurs lignes vous pouvez utiliser le caractère `|` et précéder chacune des lignes par deux espaces.

```md
---
title: Le titre de ma page
priority: 666.69
description: |
  Ceci est la **description** de ma page.
  Si je veux elle sera super _longue_!
---

Le contenu de la page suit le second `---`.
```

### Images

Les images sont optimisées au moment de la construction du livrable. Pour pouvoir inclure des images dans les pages, vous devez les ajouter dans le fichiers `images` à la racine du projet. Les images peuvent être inclues dans des sous dossiers.

```md
![mon chat](/images/chat.jpg)

![mon plus beau timbre](/images/passions/timbre.jpg)
```

Le texte entre `[]` permet de définir [une description alternative de l'image](https://developer.mozilla.org/fr/docs/Learn/Accessibility/HTML#alternatives_textuelles). Bien que non obligatoire au fonctionnement du site, elle est fortement recommandée, pour des raisons d'accessibilité et de référencement.

Pour que les images s'affichent en grille, il faut séparer les différentes lignes d'images par des sauts de lignes:

```md
Ligne de texte.

![mon chat](/images/chat.jpg) ![mon chien](/images/chien.jpg) ![mon poisson](/images/poisson.jpg)

![Ma grand-mère en tenue de chasse](/images/mamie.png)

Autre ligne de texte.
```
