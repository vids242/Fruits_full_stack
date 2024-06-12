import { createContext, useReducer } from "react"
import { ContactReducer } from "./contact.reducer"
import axios from "axios"
import { baseURL } from "../../utils/baseURL"
import { ADD_CONTACT } from "../ActionType"

const initialState = {
    isLoding: false,
    contact: [],
    error: null
}

export const ContactContext = createContext()

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ContactReducer, initialState)

    const addContact = async (data) => {
        try {
            const respons = await axios.post(baseURL + "contacts", data)
            dispatch({ type: ADD_CONTACT, payload: respons.data })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <ContactContext.Provider
            value={{
                ...state,
                addContact
            }}
        >
            {children}
        </ContactContext.Provider>
    )
}
