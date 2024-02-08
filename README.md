# le site à Raph

- [Création de contenu](#création-de-contenu)
  - [Frontmatter](#frontmatter)
  - [Images](#images)
  - [Blocs de code](#blocs-de-code)
  - [Pages projets](#pages-projets)
  - [Expositions](#expositions)
- [Développement](#développement)
  - [Installation](#installation)

## Création de contenu

Le contenu est écrit à l'aide de la syntaxe [Markdown](https://www.markdownguide.org/cheat-sheet/) dans les fichiers `.md`. Le "frontmatter" écrit en [Yaml](https://learnxinyminutes.com/docs/yaml/) permet de définir des métadonnées telles qu'un titre ou l'ordre d'apparition. Les fichiers de contenus sont situés dans les dossiers `/content/[lang]`

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

Les images sont optimisées au moment de la construction du livrable. Pour pouvoir inclure des images dans les pages, vous devez les avoir ajouter dans le dossier `images` à la racine du projet. Les images peuvent être inclues dans des sous dossiers.

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

### Blocs de code

Pour intégrer des blocs de code, il est possible d'utiliser [la syntaxe markdown prévue à cet effet](https://www.markdownguide.org/extended-syntax/#syntax-highlighting). Ces blocs seront automatiquements transformés et stylisés.

### Pages projets

Pour ajouter un nouveau projet créer un nouveau fichier `.md` dans le dossier `/content/[lang]/projects`

Le frontmatter des projets contient les entrées suivantes :

| Entrées     | Type de valeur                                                                     | Fonction                                      | Obligatoire |
| ----------- | ---------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| title       | chaîne de caractère                                                                | titre du projet                               | oui         |
| thumbnail   | Objet avec en entrées **src**: chaîne de caractère et **alt**: chaîne de caractère | Image de miniature dans les listes de projets | oui         |
| priority    | nombre                                                                             | priorité dans l'ordre d'apparition            | non         |
| cover       | Objet avec en entrées **src**: chaîne de caractère et **alt**: chaîne de caractère | Image en bannière sur la page projet          | non         |
| moment      | chaîne de caractère                                                                | Date sur la page projet                       | non         |
| legend      | chaîne de caractère, accepte du markdown                                           | Légende sur la page projet                    | non         |
| description | chaîne de caractère, accepte du markdown                                           | Description sur la page projet                | non         |

Exemple :

```md
---
title: Carré blanc
thumbnail:
  src: "/images/projects/carre-blanc-thumbnail.jpg"
  alt: "Fond blanc"
cover:
  src: "/images/projects/carre-blanc-0.jpg"
  alt: "Fond blanc"
priority: 69
moment: "2054"
legend: |
  Peinture sur toile 

  35x155cm
description: |
  Mon chef d'oeuvre.

  Je suis trop **content** de ce travail. J'avoue j'ai un peu copié sur [ce mec](https://fr.wikipedia.org/wiki/Kasimir_Malevitch)
---

![](/images/projects/carre-blanc-1.jpg)
![](/images/projects/carre-blanc-2.jpg)

Comme c'est un super projet je vous montre d'autres images

![](/images/projects/carre-blanc-3.jpg)
![](/images/projects/carre-blanc-4.jpg)
![](/images/projects/carre-blanc-5.jpg)
```

### Expositions

Pour ajouter une nouvelle expositions créer un nouveau fichier `.md` dans le dossier `/content/[lang]/exhibitions`

Le frontmatter des expositions contient les entrées suivantes :

| Entrées  | Type de valeur                                                                | Fonction                           | Obligatoire |
| -------- | ----------------------------------------------------------------------------- | ---------------------------------- | ----------- |
| title    | chaîne de caractère                                                           | titre de l'exposition              | oui         |
| priority | nombre                                                                        | priorité dans l'ordre d'apparition | non         |
| place    | chaîne de caractère                                                           | lieu de l'exposition               | non         |
| moment   | chaîne de caractère                                                           | Date sur la page expositions       | non         |
| type     | chaîne de caractère                                                           | type d'exposition                  | non         |
| legend   | chaîne de caractère                                                           | Description rapide de l'exposition | non         |
| gallery  | liste d'images, Chaque image accepte une entrée **src** et une entrée **alt** | Galerie d'images                   | oui         |

Exemple :

```md
---
title: Au delà
priority: 666
place: La lune
moment: "[08.10.2032 - 26.11.2032]"
type: "Exposition individuelle"
legend: Une superbe exposition
gallery:
  - src: /images/expos/lune-0.jpg
    alt: affiche de l'exposition
  - src: /images/expos/lune-1.jpg
    alt: "tableau Ma lune est la plus belle"
  - src: /images/expos/lune-2.jpg
    alt: "sculpture Dans ma lune"
---

Cette expo était **tip top** cool

[[lien]](https://example.com)
```

## Développement

### Installation

Avant de commencer le développement, assurez-vous d'avoir les outils suivants installés sur votre système :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (inclut npm, le gestionnaire de paquets Node.js)

**Cloner le dépôt :**

```bash
git clone https://github.com/achtaitaipai/r-trema.git my-site-name
```

**Naviguer dans le dossier :**

```bash
cd my-site-name
```

**Installer les dépendances :**

```bash
npm install
```

**Exécuter Eleventy :**

Construire un livrable :

```bash
npm run build
```

L'exécuter sur le serveur de développement local :

```bash
npm start
```
