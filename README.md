# WEBPACK

## Node.js major v16 or later

## Сommands

### Launching a development server
```shell
npm run dev
```

### Building a project with optimization
```shell
npm run build
```

### Cleaning up the dist folder
```shell
npm run clear
```

---

## Project structure

- src/styles/base ... this project service **scss** files
- src/styles/partials ... this project custom **scss** files
- src/js/app.js ... this general application **JS** file

---

## How use Handlebars?

- create all interface development files in the **views** folder with extension .hbs
- **{{>views/header}} , {{>views/footer}}** ... etc use components
- each creation/delete web-site page must be accompanied by a restart of the server
```shell
npm run dev
```

---

## How use Alias?

- use alias for image source **@img/banner.png**