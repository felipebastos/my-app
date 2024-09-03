'use client'

import { FormEvent } from 'react'
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<{titulo: string, texto: string, url: string}[]>([])

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch('http://localhost:8000/api/postagens/')
      let data = await res.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  async function cadastraUsuario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    let res = await fetch('http://localhost:8000/auth/users/',
      {
        method: 'POST',
        mode: 'cors',
        
        body: formData
      })
    let data = await res.json()
  }

  if (!posts) return <div>Não consigo ler nada</div>

  return (
    <div>
      <form onSubmit={cadastraUsuario}>
      <input type="text" name="username" placeholder="nome"/>
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password"/>
      <input type="password" name="re_password" placeholder="confirme o password" />
      <button type="submit">Submit</button>
    </form>
      <hr />
      {posts.map((p) => {
        return <div key={p.url}>
          <h1>{p.titulo}</h1>
          <p>{p.texto}</p>
        </div>
      })}
    </div>
  );
}
