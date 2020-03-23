// BUDGET CONTROLLER
let budgetController = (() => {

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

    }
})();