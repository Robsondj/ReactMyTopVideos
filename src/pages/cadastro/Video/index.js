import React, { useEffect, useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {

  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: 'Video padrão',
    url: 'https://www.youtube.com/watch?v=jOAU81jdi-c',
    categoria: 'Front End'
  });

  useEffect(() => {
    categoriasRepository.getAll()
      .then((serverCategorias) => setCategorias(serverCategorias))
      .catch((error) => console.log(error.message));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);

    videosRepository.create({
      titulo: values.titulo,
      url: values.url,
      categoriaId: categoriaEscolhida.id
    })
      .then(() => {
        console.log('cadastrado com sucesso.');
        history.push('/');
      });
  }

  return (
    <PageDefault>
        <h1>Cadastro de Vídeos</h1>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Título do Vídeo"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
          />

          <FormField
            label="URL"
            name="url"
            value={values.url}
            onChange={handleChange}
          />

          <FormField
            label="Categoria"
            name="categoria"
            value={values.categoria}
            onChange={handleChange}
            suggestions={categoryTitles}
          />

          <Button type="submit">
            Cadastrar
          </Button>
        </form>

        <Link to="categoria">Cadastro de Categorias</Link>
    </PageDefault>
  )
}

export default CadastroVideo;