const Modal = { //Objeto
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

/*Foi usadas as chaves abaixo pq teremos objetos e esse objetos terão especificações*/
const transactions = [
    {
        id: 0,
        description: 'luz',
        amount: -20000,
        date: '23/01/2021'
},
    
    {
        id: 1,
        description: 'DW',
        amount: 500000,
        date: '23/01/2021'
},
]

const Transaction = {
    incomes(){
        //somas as entradas
    },
    expenses(){
        //somar as saídas
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    //transaction que ele vai querer adcionar e index é onde ele quer que apareça
    addTransaction(transaction, index){
            const tr = document.createElement('tr')//cria um elemento no doc html
            tr.innerHTML /*Captura o return html lá de baixo e coloca no doc html*/ 
            = DOM.innerHTMLTransaction( transaction)
            DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const html = `
            <td>${transaction.description}</td>
            <td class="income">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td class="minus-button"><img src="./Imagens/minus.svg" alt=""></td>
        `
        return html //joga para fora a const html qnd o objeto for chamado
    }
}

DOM.addTransaction(transactions[0])
DOM.addTransaction(transactions[1])//joga transactions[0] para dentro  de addTransaction(transaction, index)