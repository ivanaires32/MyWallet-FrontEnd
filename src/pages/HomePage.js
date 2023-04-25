import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from "axios"
import URL_base from "../URL_base"
import { useNavigate } from "react-router-dom"


export default function HomePage({ setTransacao }) {
  const [dados, setDados] = useState([])
  const [total, setTotal] = useState(0)
  const lsDados = localStorage.getItem("token")
  const config = { headers: { Authorization: `Bearer ${lsDados}` } }

  const navigate = useNavigate()


  function adicionarPositivo() {
    setTransacao("entrada")
    navigate(`/nova-transacao/positivo`)
  }

  function adicionarSaida() {
    setTransacao("saída")
    navigate(`/nova-transacao/saida`)
  }

  function logOut() {
    localStorage.removeItem("token")
    navigate("/")
  }

  useEffect(() => {

    if (lsDados === null) {
      return navigate("/")
    }

    axios.get(`${URL_base}/home`, config)
      .then(res => {
        let contador = []
        for (let i = 1; i < res.data.length; i++) {
          contador = [...contador, res.data[res.data.length - i]]
        }
        setDados(contador)
      })
      .catch(err => alert(err.response.data))


  }, [])

  useEffect(() => {
    if (dados[0]) {
      let soma = 0
      for (let i = 0; i < dados.length; i++) {
        if (dados[i].type === "saída") {
          soma -= Number(dados[i].value)
        } else if (dados[i].type === "entrada") {
          soma += Number(dados[i].value)
        } else {
          return setTotal(soma)
        }
        setTotal(soma)
      }
    }
  }, [dados])

  return (
    <HomeContainer>
      <Header>
        <h1>{`Olá, ${dados.length > 0 ? dados[0].name : ""}`}</h1>
        <BiExit onClick={logOut} />
      </Header>

      <TransactionsContainer>
        <ul>
          {dados.map((t) => (
            <ListItemContainer key={t._id}>
              <div>
                <span>{t.day}</span>
                <strong>{t.description}</strong>
              </div>
              <Value color={t.type === "entrada" ? "positivo" : "negativo"}>{t.value ? Number(t.value).toFixed(2).replace(".", ",") : ""}</Value>
            </ListItemContainer>
          ))}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={total >= 0 ? "positivo" : "negativo"}>{Number(total).toFixed(2).replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={adicionarPositivo}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={adicionarSaida}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  overflow-x: scroll;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`