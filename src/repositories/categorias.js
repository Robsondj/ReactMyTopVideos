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

function create(categoria) {
  return fetch(`${URL_CATEGORIAS}?_embed=categorias`, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(categoria)
  })
    .then(async (serverResponse) => {
        if(serverResponse.ok) {
            return await serverResponse.json();
        }

        throw new Error('Não foi possível cadastrar categoria');
    })
}

export default {
    getAllWithVideos,
    getAll,
    create
}