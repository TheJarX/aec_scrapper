# AEC Scrapper

## Usage

You just need to go to the [index.js](index.js) file and invoke the init function, like this:
```js
// the aec resources page
const url = 'https://aprendoencasa.pe/#/experiencias/modalidad/ebr/nivel/inicial.sub-level.inicial/grado/0-2/categoria/practicas-de-crianza.experiences/unico/recursos/9c11e32109f3e4e511247abe93629ddc0e30f1b03d698aeb87aa6320bc3c3f24'

const results = init(url) // this will return a json with all the resources data
```


## Results format

The results will come from the [findResources]() function in this format:
```js
Resource = {
  link: string,
  title: string,
}

findResources: {
  categories: string[],
  categoriesString: string, // categories separated by commas
  resoucesLinks: string[],
  resources: Resource[],
}
```
