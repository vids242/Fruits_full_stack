import axios from 'axios';
import { baseURL } from '../../utils/baseURL';
import { GET_SHOPDATA } from '../ActionType';

export const get_shopdata = () =>async (dispatch) => {
    try {
        await axios.get(baseURL + "fruites")
        .then((responses) => {
            dispatch({type :GET_SHOPDATA,payload : responses.data})
        })
        .catch ((error) => {
            alert(error)
        })
    } catch (error) {
        alert(error.message)
    }
}