# CheckMyBurnout.com — Guide de mise en ligne

Site complet : assessment de burnout en 20 questions avec scoring sur 5 dimensions, historique de suivi, 10 articles de blog, pages légales AdSense.

---

## 📁 Structure des fichiers

```
checkmyburnout/
├── index.html          ← Page d'accueil (le quiz)
├── blog.html            ← Liste des 10 articles
├── blog-post.html        ← Modèle d'article (dynamique)
├── about.html
├── contact.html
├── privacy.html
├── terms.html
├── robots.txt
├── sitemap.xml
├── css/style.css
├── js/
│   ├── main.js          ← Thème, menu, FAQ, back-to-top
│   ├── quiz.js          ← Moteur du quiz + scoring + historique
│   ├── blog.js          ← Moteur du blog
│   └── adsense.js       ← Emplacements pub
└── data/posts.json      ← Les 10 articles de blog
```

⚠️ **Important** : garde cette structure de dossiers exacte. Si `css/style.css` se retrouve à la racine, le design disparaît.

---

## 🟦 Mise en ligne sur GitHub Pages (même méthode que les projets précédents)

**ÉTAPE 1** : [github.com/new](https://github.com/new) → nomme le repository `checkmyburnout` → Public → Create repository

**ÉTAPE 2** : Clique "uploading an existing file" → sélectionne **tout le contenu** du dossier `checkmyburnout` dézippé (Ctrl+A) → glisse-dépose → Commit changes

**ÉTAPE 3** : Settings → Pages → main / (root) → Save → attends 1-2 min → ton lien apparaît

---

## 🌐 Connecter CheckMyBurnout.com (Namecheap → GitHub Pages)

### Sur GitHub :
Settings → Pages → Custom domain → tape `checkmyburnout.com` → Save → coche "Enforce HTTPS"

### Sur Namecheap :
Domain List → Manage → Advanced DNS → ajoute :

| Type | Host | Value |
|---|---|---|
| A Record | @ | 185.199.108.153 |
| A Record | @ | 185.199.109.153 |
| A Record | @ | 185.199.110.153 |
| A Record | @ | 185.199.111.153 |
| CNAME | www | TON-PSEUDO.github.io |

Propagation DNS : 5 minutes à 24h.

---

## ✏️ Ajouter ou modifier un article de blog

Modifie uniquement `data/posts.json` sur GitHub (crayon ✏️) :
- Copie un article existant comme modèle
- Modifie `id`, `title`, `excerpt`, `date`, `category`, `content`
- Le `content` est en HTML, utilise `[AD1]` et `[AD2]` pour placer les pubs
- Valide le JSON sur [jsonlint.com](https://jsonlint.com) avant de sauvegarder

---

## 🧠 Comprendre le moteur du quiz

Le fichier `js/quiz.js` contient :
- **20 questions** réparties en 5 dimensions (Workload, Emotional, Sleep, Boundaries, Meaning), 4 questions chacune
- **Scoring** : chaque réponse vaut 0-10 points, normalisé sur 100 par dimension, puis moyenné pour le score total
- **5 zones de résultat** : Healthy (0-25), Mild Strain (26-45), At Risk (46-60), Burnout Warning (61-75), Burnout Likely (76-100)
- **Plan d'action automatique** : généré à partir des 3 dimensions les plus à risque
- **Historique** : sauvegardé dans `localStorage`, affiché en graphique si 2+ passages du quiz
- **Bannière de crise** : s'affiche automatiquement si le score dépasse 70, avec lien vers ressources d'aide (988 aux USA, findahelpline.com à l'international)

Si tu veux modifier les questions, le texte, ou les seuils de score, tout est dans la section `QUESTIONS` et `getZone()` du fichier `quiz.js`.

---

## 💰 Activer Google AdSense

⚠️ **Note importante pour ce site** : Google AdSense est généralement plus strict sur les sites de santé/santé mentale ("YMYL" — Your Money or Your Life content). Assure-toi que :
- Le disclaimer ("not a medical diagnosis") reste visible sur toutes les pages
- Le contenu reste factuel et bien sourcé (déjà fait dans les 10 articles)
- Les pages Privacy/Terms sont complètes (déjà faites)

1. Attends que le site ait du contenu en ligne depuis quelques semaines avec un peu de trafic organique
2. Postule sur [adsense.google.com](https://adsense.google.com)
3. Une fois approuvé, colle le code dans le `<head>` de chaque page à l'endroit `<!-- REPLACE WITH YOUR ADSENSE CODE -->`
4. Remplace chaque `.adsense-slot` par tes vrais blocs `<ins class="adsbygoogle">`

---

## 🔍 SEO — Prochaines étapes

1. [Google Search Console](https://search.google.com/search-console) → ajoute le site → soumets `sitemap.xml`
2. Demande l'indexation manuelle de chaque page
3. Les mots-clés "burnout test", "am I burned out" ont un volume énorme — vise des backlinks depuis des communautés Reddit pertinentes (r/antiwork, r/WorkReform, r/csMajors) en participant authentiquement, pas en spammant
4. Teste sur [pagespeed.web.dev](https://pagespeed.web.dev)

---

## ✅ Fonctionnalités incluses

- **Quiz conversationnel** : 1 question à la fois, avance-automatique, barre de progression dégradée verte→rouge
- **Score ring animé** : anneau SVG qui se remplit avec count-up du chiffre
- **5 dimensions scorées** : Workload, Emotional State, Sleep & Recovery, Boundaries, Purpose & Meaning
- **Plan d'action personnalisé** : 3 recommandations basées sur les dimensions les plus faibles
- **Historique de suivi** : graphique en canvas natif (sans dépendance), sauvegardé en localStorage
- **Bannière de crise** : ressources d'aide affichées automatiquement si score élevé
- **100% privé** : aucune donnée envoyée à un serveur, tout reste dans le navigateur
- **10 articles** : signes de burnout, récupération, work-life balance, burnout vs dépression, quiet quitting, limites, sommeil, high achievers, remote work, timeline de récupération
- **Dark mode** par défaut (apaisant) + light mode
- **Schema.org** : WebApplication, FAQPage, Article
- **robots.txt + sitemap.xml** prêts

Bonne mise en ligne ! 🚀
