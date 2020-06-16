import React,{useEffect,useState} from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repositoryList,setRepositoryList] = useState([])

  useEffect(()=>{

    api.get('/repositories').then(response =>{
      console.log(response.data)
      return setRepositoryList(response.data)
    })

  },[])


  async function handleAddRepository() {

      const data = {}

      api.post('/repositories',data)


  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div className="main">

      <div id="header">
        <h1>Go Repository</h1>

      </div>
      <div id='section'>
        <ul data-testid="repository-list">

          { repositoryList.map(repository => {
          return (
          <div className='groupItem'>
            <li>
              <h1>{ repository.title }</h1>
            </li>

            <button onClick={()=> handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
          )
          })}

        </ul>
          <div id="formAdd">
            <h2>Novo</h2>
            <label htmlFor="">Título</label>
            <input ></input>
            <label htmlFor="">Url</label>
            <input ></input>
            <label htmlFor="">Tecnolocias</label>
            <input ></input>


            <button onClick={handleAddRepository}>Adicionar</button>
          </div>
      </div>
    </div>
  );
}

export default App;
