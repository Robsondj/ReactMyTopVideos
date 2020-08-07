import config from '../config';

const URL_VIDEOS = `${config.URL_API}/videos`;

function getAll() {
    return fetch(`${URL_VIDEOS}`)
      .then(async (serverResponse) => {
          if(serverResponse.ok) {
            return await serverResponse.json();
          }
          throw new Error('Não foi possível carregar videos.');
      })
}

function create(video) {
    return fetch(`${URL_VIDEOS}?_embed=videos`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(video)
    })
      .then(async (serverResponse) => {
          if(serverResponse.ok) {
              return await serverResponse.json();
          }

          throw new Error('Não foi possível cadastrar video');
      })
}

export default {
    getAll,
    create
}