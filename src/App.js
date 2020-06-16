import React,{useEffect,useState} from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repositoryList,setRepositoryList] = useState([])
  const [formData,setFormData] = useState({})
  //console.log(formData)


  function getRepositoryList() {
    api.get('/repositories').then(response =>{
      console.log(response.data)
      return setRepositoryList(response.data)
    })
    
  }

  useEffect(()=>{
    getRepositoryList()
    

  },[])

  function handleFormData(event) {

    const {name,value} = event.target
    
    setFormData({...formData,[name]: value})
    
    //console.log(formData)
    
  }

  async function handleAddRepository() {
      
      const result = await api.post('/repositories',formData)
      //getRepositoryList()
      
      setRepositoryList([...repositoryList,result])
      
    

    }
    
  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`)

    //getRepositoryList()
    
    setRepositoryList(repositoryList.filter((repository)=>{
      return repository.id !== id
    }))
    
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
          <div className='groupItem' key={repository.id}>
            <li>
              <h1>{ repository.title }</h1>
            </li>

            <button onClick={()=> handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
          )
          })} 




          {/* { repositoryList.map(repository => {
          return (
          <div className='groupItem' key={repository.id}>
            <li>
              <h1>{ repository.title }</h1>
            </li>

            <button onClick={()=> handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
          )
          })} */}



        </ul>
          <div id="formAdd">
            <h2>Novo</h2>
            <label htmlFor="title">Título</label>
            <input name='title' type='text'  onChange={handleFormData} ></input>
            <label htmlFor="url">Url</label>
            <input name='url' type='text'  onChange={handleFormData} ></input>
            <label htmlFor="techs">Tecnolocias</label>
            <input name='techs' type='text'  onChange={handleFormData} ></input>


            <button onClick={handleAddRepository}>Adicionar</button>
          </div>
      </div>
    </div>
  );
}

export default App;
