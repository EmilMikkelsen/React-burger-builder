import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 40
};

const INGREDIENT_PRICES = {
    salad: 3,
    cheese: 5.5,
    meat: 10,
    bacon: 7
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;