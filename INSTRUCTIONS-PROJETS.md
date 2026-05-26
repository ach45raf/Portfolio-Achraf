# 📸 Comment ajouter vos screenshots de projets

## 📁 Structure des dossiers

Créez un dossier `projets` dans le même répertoire que votre `index.html` :

```
portfolio/
│
├── index.html
├── styles.css
├── script.js
│
├── certification/          ← Vos certifications (déjà fait ✅)
│   ├── python-essentials.jpg
│   └── ...
│
└── projets/               ← Créez ce nouveau dossier
    ├── gestion-rh.jpg
    ├── gestion-bibliotheque.jpg
    └── marketplace-maalem.jpg
```

## 📸 Noms des fichiers à utiliser

Renommez vos screenshots avec ces noms EXACTS :

1. **Application Gestion RH** → `gestion-rh.jpg`
2. **Application Gestion Bibliothèque** → `gestion-bibliotheque.jpg`
3. **Marketplace "Maalem"** → `marketplace-maalem.jpg`

## 🖼️ Formats acceptés

Vous pouvez utiliser :
- `.jpg` ou `.jpeg`
- `.png`
- `.webp`

**Important :** Si vous utilisez `.png` au lieu de `.jpg`, modifiez les extensions dans le fichier `index.html`.

## ✅ Étapes à suivre

### Étape 1 : Créer le dossier
```bash
# Dans le dossier de votre portfolio, créez :
mkdir projets
```

### Étape 2 : Prendre les screenshots
Pour chaque projet, prenez un screenshot qui montre :
- ✅ L'interface principale de l'application
- ✅ Les fonctionnalités clés
- ✅ Un design propre et professionnel

**Conseils pour de bons screenshots :**
- 📱 Utilisez un écran en mode desktop (pas mobile)
- 🎨 Capturez la page d'accueil ou le dashboard
- 🖼️ Assurez-vous que tout est visible et net
- 💡 Évitez les données sensibles ou personnelles

### Étape 3 : Renommer et placer les images
1. Prenez vos 3 screenshots
2. Renommez-les selon la liste ci-dessus
3. Placez-les dans le dossier `projets/`

### Étape 4 : Vérifier
Ouvrez `index.html` dans votre navigateur. Les images devraient s'afficher !

## 🎨 Optimisation des images (recommandé)

Pour de meilleures performances :
- **Taille recommandée** : 1200x800 pixels (ratio 3:2)
- **Poids** : Moins de 500 KB par image
- **Format** : JPG pour les screenshots

### Outils gratuits pour optimiser :
- [TinyPNG](https://tinypng.com/) - Compression en ligne
- [Squoosh](https://squoosh.app/) - Outil Google
- [ImageOptim](https://imageoptim.com/) - Application Mac

## 🔧 Si les images ne s'affichent pas

### Vérifiez :
1. ✅ Le dossier `projets` est au bon endroit (à côté de `index.html`)
2. ✅ Les noms de fichiers sont EXACTS (sensible à la casse)
3. ✅ Les extensions correspondent (`.jpg`, `.png`, etc.)
4. ✅ Les images ne sont pas corrompues

### Fallback automatique
Si une image ne charge pas, une icône animée s'affichera automatiquement à la place ! 🎯

## 🎯 Fonctionnalités incluses

Une fois vos images ajoutées, vous aurez :
- ✅ **Clic sur l'image** → S'ouvre en plein écran (lightbox)
- ✅ **Icône de zoom** au survol
- ✅ **Effet hover** avec zoom léger
- ✅ **Bouton GitHub** pour voir le code
- ✅ **Bouton télécharger** dans la lightbox
- ✅ **Design responsive** sur tous les appareils

## 📤 Alternative : Hébergement en ligne

Si vous préférez héberger vos images en ligne :

1. Uploadez vos screenshots sur [Imgur](https://imgur.com/) ou [Cloudinary](https://cloudinary.com/)
2. Copiez les liens directs
3. Remplacez dans `index.html` :

```html
<!-- Au lieu de : -->
<img src="projets/gestion-rh.jpg" ...>

<!-- Utilisez : -->
<img src="https://i.imgur.com/VOTRE-LIEN.jpg" ...>
```

## 🎯 Exemple complet

Votre structure finale devrait ressembler à :

```
portfolio/
│
├── index.html
├── styles.css
├── script.js
│
├── certification/
│   ├── python-essentials.jpg
│   ├── javascript-essentials.jpg
│   └── ...
│
└── projets/
    ├── gestion-rh.jpg              ← Screenshot de l'app RH
    ├── gestion-bibliotheque.jpg    ← Screenshot de la bibliothèque
    └── marketplace-maalem.jpg      ← Screenshot de Maalem
```

## 💡 Conseils pour de beaux screenshots

### Pour l'Application Gestion RH :
- Capturez le dashboard principal
- Montrez les modules (disciplinaire, avertissements)
- Assurez-vous que le design Laravel est visible

### Pour la Gestion Bibliothèque :
- Montrez la liste des livres
- Interface de gestion des emprunts
- Design propre et organisé

### Pour Marketplace Maalem :
- Page d'accueil avec les artisans
- Système de recherche visible
- Design moderne avec React/Tailwind

## 🚀 Résultat

Une fois les images ajoutées, vos projets s'afficheront avec :
- ✨ Vos vrais screenshots au lieu des icônes
- 🔍 Zoom au clic pour voir en détail
- 🎨 Effet hover professionnel
- 📱 Responsive sur mobile

---

**Besoin d'aide ?** Vérifiez que tous les fichiers sont au bon endroit et que les noms correspondent exactement ! 🎯

## 🎓 Prochaines améliorations possibles

- [ ] Ajouter plusieurs screenshots par projet (galerie)
- [ ] Ajouter des vidéos de démonstration
- [ ] Créer des pages détaillées pour chaque projet
- [ ] Ajouter des liens vers les démos en ligne
