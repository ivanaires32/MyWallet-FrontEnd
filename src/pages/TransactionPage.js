import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import URL_base from "../URL_base"

export default function TransactionsPage({ transacao }) {
  const [value, setValue] = useState()
  const [description, setDescription] = useState()
  const lsDados = localStorage.getItem("token")
  const config = { headers: { Authorization: `Bearer ${lsDados}` } }
  const navigate = useNavigate()

  useEffect(() => {
    if (!lsDados) return navigate("/")
  }, [])

  function adicionar(e) {
    e.preventDefault()
    const obj = { value, description }
    axios.post(`${URL_base}/nova-transacao/${transacao}`, obj, config)
      .then(() => navigate("/home"))
      .catch(err => alert(err.response.data))
  }

  return (
    <TransactionsContainer>
      <h1>{`Nova ${transacao}`}</h1>
      <form>
        <input placeholder="Valor" value={value} onChange={e => setValue(e.target.value)} type="text" />
        <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} type="text" />
        <button onClick={adicionar}>{`Salvar ${transacao}`}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
