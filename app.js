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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: (obj, type) => {
            let html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value)
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: () => {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, index, array) => {
                current.value = ""
            });

            fieldsArr[0].focus();
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
        UICtrl.addListItem(newItem, input.type);

        // 4. Clear the fields
        UICtrl.clearFields();
        // 5. Calculate the budget

        // 6. Display the budget on the UI
    };

    return {
        init: () => {
            console.log('Sup son.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();