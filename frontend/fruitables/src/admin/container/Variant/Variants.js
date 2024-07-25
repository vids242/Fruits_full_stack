import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select, IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import { object, string, boolean, mixed } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addVariant, deleteVariant, editVariant, getVariant } from '../../../redux/action/variants.action';
import { getData } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subCategory.slice';
import { getProducts } from '../../../redux/action/products.action';;

function Variants(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.products);
    // console.log(product);
    const categories = useSelector((state) => state.categories.categories);
    // console.log(categories, "categoriescategoriescategoriescategories");
    const subcategories = useSelector((state) => state.subcategories.subcategories);
    // console.log(subcategories);
    const variants = useSelector((state) => state?.variant?.variant || []);
    // console.log("variantsvariantsvariants", variants);
    useEffect(() => {
        dispatch(getVariant());
        dispatch(getProducts());
        dispatch(getData());
        dispatch(getSubData());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        setDynamicFields([]);
        formik.resetForm();
    };

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            additionalFields: Object.entries(data.attributes).map(([key, value]) => ({ key, value })),
        });
        setOpen(true);
        setUpdate(true);
        setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
    };

    const handleDelete = (id) => {
        dispatch(deleteVariant(id));
    };

    const variantSchema = object({
        is_active: boolean(),
        subcategory_id: string().required('Subcategory is required'),
        category_id: string().required('Category is required'),
        product_id: string().required('Product is required'),
    });

    const formik = useFormik({
        initialValues: {
            is_active: true,
            subcategory_id: '',
            category_id: '',
            product_id: '',
            price: '',
            stock: '',
            discount: '',
            additionalFields: [],
            product_img: mixed()
                .required("Please select an image")
                .test("fileSize", "The file is too large", (value) => {
                    if (value.size) {
                        return value && value.size <= 2 * 1024 * 1024; // 2MB
                    }
                    return true

                })
                .test("fileType", "Unsupported File Format", (value) => {
                    if (value.type) {
                        return (
                            value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
                        );
                    }
                    return true

                }),
        },
        validationSchema: variantSchema,
        onSubmit: (values, { resetForm }) => {
            const attributes = values.additionalFields.reduce((acc, field) => {
                acc[field.key] = field.value;
                return acc;
            }, {});

            const variantData = {
                ...values,
                attributes,
            };

            console.log(variantData);

            if (update) {
                dispatch(editVariant(variantData));
            } else {
                dispatch(addVariant(variantData));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = formik;

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 130,
            renderCell: (params) => {
                const category = categories.find((v) => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: 'Subcategory', width: 130,
            renderCell: (params) => {
                const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
                return subcategory ? subcategory.name : '';
            }
        },
        {
            field: 'product_id', headerName: 'Product', width: 130,
            renderCell: (params) => {
                const productData = product.find((v) => v._id === params.row.product_id);
                return productData ? productData.name : '';
            }
        },
        {
            field: 'attributes', headerName: 'Attributes', width: 140,
            renderCell: (params) => {
                const attributes = params.row.attributes;
                return attributes ? Object.entries(attributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
            }
        },
        { field: 'price', headerName: 'price', width: 130, },
        { field: 'stock', headerName: 'stock', width: 130, },
        { field: 'discount', headerName: 'discount', width: 130, },

        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(params.row._id)}
                        startIcon={<DeleteIcon />}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                        startIcon={<EditIcon />}
                    />
                </>
            ),
        },
    ];

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Variant
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{update ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent sx={{ minWidth: 500 }}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    name="category_id"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {categories?.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.category_id && errors.category_id ? (
                                    <div>{errors.category_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                                <Select
                                    labelId="subcategory-select-label"
                                    id="subcategory-select"
                                    name="subcategory_id"
                                    value={values.subcategory_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        subcategories?.filter((v) => v.category_id === values.category_id)?.map((v) => (
                                            <MenuItem key={v._id} value={v._id}>
                                                {v.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {touched.subcategory_id && errors.subcategory_id ? (
                                    <div>{errors.subcategory_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="product-select-label">Product</InputLabel>
                                <Select
                                    labelId="product-select-label"
                                    id="product-select"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        product?.filter((v) => v.subcategory_id === values.subcategory_id)
                                            ?.map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.product_id && errors.product_id ? (
                                    <div>{errors.product_id}</div>
                                ) : null}
                            </FormControl>
                            <TextField
                                margin="dense"
                                id="name"
                                name="price"
                                label="price"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={errors.price && touched.price ? true : false}
                                helperText={errors.price && touched.price ? errors.price : ""}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="stock"
                                label="stock"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.stock}
                                error={errors.stock && touched.stock ? true : false}
                                helperText={errors.stock && touched.stock ? errors.stock : ""}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="discount"
                                label="discount"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discount}
                                error={errors.discount && touched.discount ? true : false}
                                helperText={errors.discount && touched.discount ? errors.discount : ""}
                            />
                            <div>
                                {dynamicFields.map((field, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${index}]`.key}
                                            name={`additionalFields[${index}]`.key}
                                            label="Key"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(index, 'key')}
                                            value={field.key}
                                        />
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${index}]`.value}
                                            name={`additionalFields[${index}]`.value}
                                            label="Value"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(index, 'value')}
                                            value={field.value}
                                        />
                                        <IconButton onClick={() => removeField(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={addField} style={{ marginTop: "20px" }}>
                                    Add Field
                                </Button>
                                <br></br><br></br>
                                <input
                                    id="variant_img"
                                    name="variant_img"
                                    label="variant_img"
                                    type="file"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => {
                                        setFieldValue("variant_img", event.currentTarget.files[0]);
                                    }}
                                    onBlur={handleBlur}

                                    sx={{ marginBottom: 2 }}
                                />
                                {
                                    values.variant_img &&
                                    <img src={values.variant_img.url ? values.variant_img.url : URL.createObjectURL(values.variant_img)} width="50" height="50" />
                                }

                                <br></br><br></br>
                                {errors.variant_img && touched.variant_img ? <span style={{ color: "red" }}>{errors.variant_img}</span> : null}

                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {update ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={variants}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    );
}

export default Variants;