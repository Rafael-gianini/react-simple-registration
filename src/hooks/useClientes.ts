import Cliente from "@/core/Cliente";
import { useEffect, useState } from "react";
import useTabelaOuForm from "./useTabelaOuForm";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/backend/db/ColecaoCliente";

export default function useClientes() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const {
    formularioVisivel, tabelavisivel, exibirFormulario, exibirTabela

  } = useTabelaOuForm();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);


  useEffect(() => {
    repo.obterTodos().then(setClientes);
  }, []);

  function obterTodos() {
    repo.obterTodos().then(clientes => {
      setClientes(clientes);
      exibirTabela();
    });
  }
  
  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente);
    exibirFormulario();
    console.log(cliente.nome);
  }

  async function excluirCliente(cliente: Cliente) {
    console.log(`Excluido: ${cliente.nome}`);
    await repo.excluir(cliente);
    obterTodos();
  }

  function novoCliente() {
    console.log(cliente);
    setCliente(Cliente.vazio());
    exibirFormulario();

  }

  async function salvarCliente(cliente: Cliente) {
    console.log(cliente);
    repo.salvar(cliente);
    obterTodos();

  }
  return {
    clientes,
    cliente,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    tabelavisivel,
    exibirTabela
  };

}
