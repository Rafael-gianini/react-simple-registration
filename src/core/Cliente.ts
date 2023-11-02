export default class Client {
    //# mesmo que private - foi modificado no tsconfig.json
    //trocando para ES2015
    #id: string | null
    #nome: string
    #idade: number

    constructor(nome: string, idade: number, id: string | null = null){
        this.#nome = nome
        this.#idade = idade
        this.#id = id
    }

    static vazio(){
        return new Client('', 0)
    }

    get id() {
        return this.#id
    }
    get nome(){
        return this.#nome
    }
    get idade(){
        return this.#idade
    }
}