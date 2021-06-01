const Modal = { //Objeto
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

/*Foi usadas as chaves abaixo pq teremos objetos e esse objetos terão especificações*/

const Transaction = {
    all:[
    {
        description: 'luz',
        amount: -20000,
        date: '23/01/2021'
},
    
    {
        description: 'DW',
        amount: 500000,
        date: '23/01/2021'
},
] ,//atalho apara tds as transações

    add(transaction){
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index){
        Transaction.all.splice(index, 1)
        App.reload()
    },
    incomes(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total(){
        let total = Transaction.incomes() + Transaction.expenses();
        
        return total;
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
        //verifica qual classe o valor vai receber:
        if(transaction.amount > 0){
            var CSSclass = "income"
        }else{
            var CSSclass = "expense"
        }
        //Formatação de valores:
        const amount =  Utils.formatCurrency(transaction.amount)

        const html = `
    
            <td>${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td class="minus-button"><img src="./Imagens/minus.svg" alt=""></td>
        `
        return html //joga para fora a const html qnd o objeto for chamado
    },
    updateBalance(){
    document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())

    },
    clearTransactions(){
    DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
        formatCurrency(value){
            const signal = Number(value) < 0 ? "-":"" 
            value = String(value).replace(/\D/g, "")
            value = Number(value) / 100
            value = value.toLocaleString("pt-BR",{
                style: "currency",
                currency: "BRL"
            })
            return signal + value
        }    
}
const App = {
    init(){
        Transaction.all.forEach(transaction => {//joga transactions[0] para dentro  de addTransaction(transaction, index)
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

const Form = {
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),
    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateFields(){
    const { description, amount, date} = Form.getValues()
        if(description.trim()==="" || amount.trim()==="" || date.trim()===""){
            throw new Error("Por favor, preencha todos os campos")
        }
    },
    formatValues(){
        let { description, amount, date} = Form.getValues()
    },
    submit(event) {
        event.preventDefault()

        try{
            Form.validateFields()
        } catch (error){
            alert(error.message)
        }

        Form.validateFields()
        Form.formatData()
    }
}

App.init()

Transaction.add({
    description: "Alo",
    amount: 200,
    date: '23/01/2021'
})


