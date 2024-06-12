import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string, number } from 'yup';



import { useFormik } from 'formik';


import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ContactContext } from '../../../Context/reducer/ContactContext';


function Contact(props) {

    const [open, setOpen] = React.useState(false);

    const [update, setUpdate] = useState(false);

   

    const contact = useContext(ContactContext)
    console.log(contact);

    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
    };

    



    let contactSchema = object({
        address: string().required(),
        email: string().email().required(),
        phone: number().required(),
        
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            email: '',
            phone: '',
        },

        validationSchema: contactSchema,

        onSubmit: (values, { resetForm }) => {
           if (update) {
            
           } else {
            contact.addContact(values)
           }
            resetForm();
            handleClose();
        },


    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleDelete = (id) => {
        
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }

    const columns = [
        { field: 'address', headerName: 'Address', width: 170 },
        { field: 'email', headerName: 'Email', width: 170 },
        { field: 'phone', headerName: 'Phone', width: 170 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" size="large" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ];


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open  Contact Form
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Coupon</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="address"
                            name="address"
                            label="Enter Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            error={errors.address && touched.address ? true : false}
                            helperText={errors.address && touched.address ? errors.address : ''}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Enter Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email && touched.email ? true : false}
                            helperText={errors.email && touched.email ? errors.email : ''}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Enter Phone"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            error={errors.phone && touched.phone ? true : false}
                            helperText={errors.phone && touched.phone ? errors.phone : ''}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>

            </Dialog>

           
        </>
    );
}

export default Contact;

{/* <div style={{ height: 400, width: '100%' }}>
<DataGrid
    rows={coupon.coupon}
    columns={columns}
    initialState={{
        pagination: {
            paginationModel: { page: 0, pageSize: 5 },
        },
    }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
/>
</div> */}
