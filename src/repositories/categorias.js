import config from '../config';

const URL_CATEGORIAS = `${config.URL_API}/categorias`;

function getAllWithVideos() {
    return fetch(`${URL_CATEGORIAS}?_embed=videos`)
      .then(async (serverResponse) => {
          if(serverResponse.ok) {
            return await serverResponse.json();
          }
          throw new Error('Não foi possível carregar categorias com videos.');
      })
}

function getAll() {
  return fetch(`${URL_CATEGORIAS}`)
    .then(async (serverResponse) => {
        if(serverResponse.ok) {
          return await serverResponse.json();
        }
        throw new Error('Não foi possível carregar categorias.');
    })
}

export default {
    getAllWithVideos,
    getAll
}