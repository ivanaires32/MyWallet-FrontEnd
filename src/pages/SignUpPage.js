import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPass, setComfirmPass] = useState()

  function goSignIn() {

  }

  return (
    <SingUpContainer>
      <form onSubmit={goSignIn}>
        <MyWalletLogo />
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} type="text" />
        <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} type="email" />
        <input placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} type="password" autocomplete="new-password" />
        <input placeholder="Confirme a senha" value={confirmPass} onChange={e => setComfirmPass(e.target.value)} type="password" autocomplete="new-password" />
        <button>Cadastrar</button>
      </form>

      <Link>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
