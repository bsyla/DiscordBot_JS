import fetch from "node-fetch";

async function pokemonReturn(givenName) {
  let url = `https://api.pokemontcg.io/v2/cards?q=name:"${givenName}"`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export default pokemonReturn;
