import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignInPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [dados, setDados] = useState()
  const navigate = useNavigate()

  function goHome() {
    if (!email || !password) return alert("Campos obrigatorios")
    axios.post("http://localhost:5000/sign-in", { email, password })
      .then(res => {
        navigate("/home")
        setDados(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <SingInContainer>
      <form onSubmit={goHome}>
        <MyWalletLogo />
        <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} type="email" />
        <input placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} type="password" autocomplete="new-password" />
        <button>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
