import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string } from 'yup';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {  DeleteFacilites, UpdateFacilites, facilites_data } from '../../../redux/action/facilites.action';

import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function Facilites(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [update, setupdate] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setupdate(false)
        formik.resetForm()

    };

    let facilitesSchema = object({
        name: string().required(),
        discription: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            discription: "",
        },
        validationSchema: facilitesSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(UpdateFacilites(values))
            } else {
                const rNo = Math.floor(Math.random() * 1000)
                dispatch(facilites_data({ ...values, id: rNo }))
            }
            resetForm()
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik

    const facilites = useSelector(state => state.facilites)
    // console.log(facilites);

    const hendalDelete = (id) => {
        // console.log(id);
        dispatch(DeleteFacilites(id))
    }

    const hendalEdit = (data) => {
        formik.setValues(data)
        setOpen(true);
        setupdate(true)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'discription', headerName: 'Discription', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => hendalEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => hendalDelete(params.row.id)} >
                        <DeleteIcon />
                    </IconButton>
                </>
            )


        },

    ];

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Facilites
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Facilites</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Add Facilites"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ""}
                        />
                        <TextField
                            margin="dense"
                            id="discription"
                            name="discription"
                            label="Add Discription"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.discription}
                            error={errors.discription && touched.discription ? true : false}
                            helperText={errors.discription && touched.discription ? errors.discription : ""}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? "update" : "Add"}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            <br></br><br></br>
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={facilites.facilites}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Facilites;