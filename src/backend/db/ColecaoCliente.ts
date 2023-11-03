import Cliente from "@/core/Cliente";
import db from "../config";
import {collection, addDoc, updateDoc, doc, deleteDoc, query, orderBy, getDocs} from 'firebase/firestore'
import ClienteRepositorio from "@/core/ClienteRepositorio";
 
export default class ColecaoCliente implements ClienteRepositorio{
 
    async salvar(cliente: Cliente): Promise<Cliente> {
        //salvar temos 2 cenários
        //cenário 1: se o cliente.id existir significa que vou alterar
        //senão significa que irei adicionar um novo cliente
 
        if(cliente?.id){
            //altera um cliente
            const taskDocRef = doc(db,'clientes',cliente.id)
            try{
                await updateDoc(taskDocRef, {
                    nome: cliente.nome,
                    idade: cliente.idade
                })
            }catch(err){
                alert(err)
            }
            return cliente 
        }else{
            //adiciona um novo
            try{
                const docRef = await addDoc(collection(db,'clientes'), {
                    nome: cliente.nome,
                    idade:cliente.idade
                })
                const docId = docRef.id
                return new Cliente(cliente.nome,cliente.idade,docId)
            }catch(err){
                alert(err)
            }
            return cliente
        }
    }
 
    async excluir(cliente: Cliente): Promise<void> {
        if(cliente?.id){
            const taskDocRef = doc(db,'clientes',cliente.id)
            try{
                await deleteDoc(taskDocRef)
            }catch(err){
                alert(err)
            }
        }else{
            alert('ERRO: Id do cliente é nulo')
        }
    }
 
     async obterTodos(): Promise<Cliente[]>{
        const clientes:Cliente[] = []
        try{
            const q = query(collection(db,'clientes'), orderBy('nome'))
            const docs = await getDocs(q)
            docs.forEach(doc => {
                clientes.push(new Cliente(doc.data().nome,doc.data().idade,doc.id))
            })
        }catch(err){
            alert(err)
        }
        return clientes
    }
}
