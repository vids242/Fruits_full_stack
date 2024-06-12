import { ADD_CONTACT } from "../ActionType";

export const ContactReducer = (state,action) => {
    console.log(action.type);

    switch (action.type) {
        case ADD_CONTACT:
            
           return {
            contact : state.contact.concat(action.payload)
           }
    
        default:
           return state
    }
}