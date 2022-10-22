# WEBPACK

## Node.js major v16 or later

## Сommands

### Npm install
```shell
npm i
```

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

- [FAQ](https://handlebarsjs.com/) 
- create all interface development files in the **views** folder with extension **.hbs**
- example use import .hbs components: 

```html
<body>
  {{>views/header}}
  <main>...</main>
  {{>views/footer}}
</body>
```
- **сreation or deletion** web-site **pages** must be accompanied **restarting devServer**:

```shell
npm run dev
```

---

## How use Alias?

- use **alias** for image source:

```html
<img src="@img/banner.png" alt="">
```

---

## How use Sprites?

- add **sprites** in directory **/svg/**
- all-sprites names must have **#sprite-{name}**
- true path to sprite **svg/spritemap.svg**

```html
<svg class="icon">
  <use xlink:href="svg/spritemap.svg#sprite-icon"></use>
</svg>
```
