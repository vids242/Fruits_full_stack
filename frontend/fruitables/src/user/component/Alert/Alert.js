import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../../redux/slice/alert.slice';

function Alert(props) {
    const { color, message } = useSelector(state => state.alert);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    useEffect(() => {
        if (message != '') {
            enqueueSnackbar({
                variant: color, message: message, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                }
            })
        }

        const timeRef = setTimeout(() => {
            dispatch(resetAlert())
        },2000)
    
        return () => {
            clearTimeout(timeRef)
        }
    },[message])

   
    return (
        <div>

        </div>
    );
}

export default Alert;