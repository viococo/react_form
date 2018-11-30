## Etape 1

- **civilité** (select)
- **prénom** (text), obligatoire
- **nom** (text), obligatoire
- **email** (text, format email), obligatoire
- **tél** (text, format : +33 \_ \_\_ \_\_ \_\_ \_\_), non obligatoire
- **bouton** "suivant"

## Etape 2: questions

- **Framework préféré ?** radio Vue, Angular, Symfony, ...
- **Autre** : textearea
- **bouton** : "suivant", "précédent"

## Etape 3 : recap

- afficher les infos saisies
- **boutons** : "enregistrer", "précédent", "annuler"

## Lancer le projet

Se placer dans le dossier

- `npm install`
- `json-server --watch db.json`
- `npm start`
