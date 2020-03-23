// BUDGET CONTROLLER
let budgetController = (() => {

    let Expense = (id, description, value) => {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = (id, description, value) => {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    }

})();

//UI CONTROLLER
let UIController = (() => {
    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: () => {
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: () => {
            return DOMstrings;
        }
    };
})();

//GLOBAL APP CONTROLLER
let controller = ((budgetCtrl, UICtrl) => {
    let setupEventListeners = () => {

        const DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListner('click', ctrlAddItem)

        //event.which is for older browsers
        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }
    
    let ctrlAddItem = () => {
        // 1. Get the field input data
        let input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget controller

        // 3. Add the new item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    };

    return {
        init: () => {
            console.log("Sup son");
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();