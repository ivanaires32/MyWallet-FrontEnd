import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState } from "react"
import axios from "axios"
import URL_base from "../URL_base"

export default function SignInPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const lsDados = localStorage.getItem("user")


  useEffect(() => {
    if (lsDados !== null) {
      navigate("/home")
    } else {
      navigate("/")
    }
  }, [])

  function goHome(e) {
    e.preventDefault()
    axios.post(`${URL_base}/sign-in`, { email, password })
      .then(res => {
        navigate("/home")
        localStorage.setItem("user", JSON.stringify({ email, token: res.data }))
      })
      .catch(err => alert(err.response.data))
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
