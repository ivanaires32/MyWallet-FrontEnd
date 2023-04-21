import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import URL_base from "../URL_base"
import Context from "../context/Context"

export default function SignInPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const lsDados = localStorage.getItem("token")
  const context = useContext(Context)

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
        localStorage.setItem("token", res.data)
        context.setToken(res.data)
        navigate("/home")
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
