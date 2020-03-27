// BUDGET CONTROLLER
let budgetController = (() => {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0;

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };

    return {
        addItem: (type, des, val) => {

            let newItem, ID
            // Create new ID without using a database
            if (data.allItems[type].length > 0) {
                 ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                 ID = 0;
            }
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Push it into our data structure
            data.allItems[type].push(newItem);
            // Return new element
            return newItem;
        },

        testing: () => {
            console.log(data);
        }
    }


})();
// UI CONTROLLER
let UIController = (() => {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: () => {
            return DOMstrings;
        }
    }

})();

// GLOBAL APP CONTROLLER
let controller = ((budgetCtrl, UICtrl) => {

    let setupEventListeners = () => {

        const DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
    
        //event.which for older browsers 
        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }



    let ctrlAddItem = () => {
        // 1. Get the field input data
        const input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget controller
        const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);
        // 3. Add the new item to the UI 

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    };

    return {
        init: () => {
            console.log('Sup son.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();