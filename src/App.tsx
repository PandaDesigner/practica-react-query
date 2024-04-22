import { useQuery } from '@tanstack/react-query';
import "./styles.css";
import React, { useState } from 'react';
import { User } from './User';
import { UsersInterface } from './interface/user';



const fetchData = async ({ queryKey }): Promise<any> => {
  const [_key, page] = queryKey
  const res = await fetch(`https://reqres.in/api/users?page=${page}`);
  const result = await res.json()
  return result
}


const Users = () => {
  const [page, setPage] = useState(1)
  const query = useQuery({
    queryKey: ['users', page], queryFn: fetchData, placeholderData: (previousData, previousQuery) => previousData,
  })
  const handlerPages = (n = 1) => setPage(prev => Math.max(prev + n, 0))

  console.log(query.isPlaceholderData)


  if (query.isLoading) {
    return (<React.Fragment>
      <div className='container _bg__dark' ><h2 className='text__center'>...cargando</h2></div>
    </React.Fragment>)
  }

  if (query.isError) {
    return (
      <React.Fragment>
        <div className='text__center'><h3>{query.error instanceof Error ? query.error.message : "Error"}</h3></div>
      </React.Fragment>)

  }

  return (
    <React.Fragment>
      <div>
        <h2 className='text__center'>Data Users</h2>
        <div style={{
          width: '60%',
          margin: '0 auto'

        }} >
          <ul>
            {query.data.data && query.data?.data.map((user: UsersInterface) => (
              <User key={user.id} user={user} />
            ))}
          </ul>
        </div>
        <div className='container_btn'>
          <button disabled={page === 1} className='btn' onClick={() => handlerPages(-1)}>Prev</button>
          <p>pagina: {page}</p>
          <button disabled={query.data.total_pages === page} className='btn' onClick={() => handlerPages(1)}>Next</button>
        </div>
      </div>
    </React.Fragment>
  )

}


export default function App() {
  return (

    <div className="App">
      <h1 className='text__center'>CodeSandbox React-Query</h1>
      <h2 className='text__center'>Start editing to see some magic happen!</h2>
      <Users />
    </div>

  );
}
