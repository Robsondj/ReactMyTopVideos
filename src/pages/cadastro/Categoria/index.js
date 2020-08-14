import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../pages/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import categoriaRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: ''
  }

  const { values, handleChange, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    categoriaRepository.create({
      titulo: values.titulo,
      descricao: values.descricao,
      cor: values.cor
    })
      .then(() => {
        console.log('cadastrado com sucesso!');
        setCategorias([
          ...categorias,
          values
        ]);
        clearForm();
      });
  }

  useEffect(() => {
    categoriaRepository.getAll()
      .then((response) => setCategorias(response))
      .catch((error) => console.log(error.message));
  }, []);// esse último parametro faz o useEffet atualizar apenas quando montar o componente

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.titulo}</h1>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Nome da Categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <button>
          Cadastrar
        </button>
      </form>

      <ul>
        {categorias.map((categoria, index) => {
          return(
            <li key={`${categoria}${index}`}>
              {categoria.titulo}
            </li>
          )
        })}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria;