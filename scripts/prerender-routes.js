
const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

( async () => {

  const fs = require('fs');

  //Páginas de detalle de pokemon por id
  const pokemonIds = Array.from( { length: TOTAL_POKEMONS }, ( _, i ) => i + 1 );

  let fileContent = pokemonIds.map(
    id => `/pokemons/${id}`
  ).join('\n');

  //Páginas de listado de pokemon
  for (let i = 1; i <= TOTAL_PAGES; i++) {

    fileContent += `\n/pokemons/page/${i}`;

  }

  //Páginas de detalle de pokemon por nombre

  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(res => res.json());

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemons/${pokemon.name}`
  ).join('\n');

  fs.writeFileSync('routes.txt', fileContent);

  console.log('routes.txt generated');

})();



// const TOTAL_POKEMONS = 10;
// const TOTAL_PAGES = 5;

// function generateRoutes(path, total){
//   return Array.from( { length: total }, ( _, i ) => `${path}/${i + 1}`).join('\n');
// }

// ( async () => {

//   const fs = require('node:fs');

//   const pagePaths = generateRoutes('/pokemons/page', TOTAL_PAGES);
//   const pokemonPaths = generateRoutes('/pokemons', TOTAL_POKEMONS);

//   const routes = pagePaths + '\n' + pokemonPaths;

//   fs.writeFileSync('./routes.txt', routes);

//   console.log('routes.txt generated');

// })();
