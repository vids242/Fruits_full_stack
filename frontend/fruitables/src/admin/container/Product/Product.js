import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, addProducts, editProducts, deleteProducts } from '../../../redux/action/products.action'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { getData } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subCategory.slice';


function Product() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector((state) => state.subcategories.subcategories);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getData());
    dispatch(getSubData());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    formik.resetForm();
  };

  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(true);
  };



  const productSchema = object({
    name: string().required("Please enter name"),
    description: string().required("Please enter description"),
    price: number().required("Please enter price").positive("Price must be positive"),
    category_id: string().required("Please select a category"),
    subcategory_id: string().required("Please select a subcategory"),
    stock: number().required("Please enter stock").min(0, "Stock cannot be negative")
  });

  const formik = useFormik({
    initialValues: {
      subcategory_id: '',
      category_id: '',
      name: '',
      description: '',
      price: '',
      stock: '',
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editProducts(values));
      } else {
        dispatch(addProducts(values));
      }
      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;

  const changeCategorySelect = (event) => {
    const selectedCategoryId = event.target.value;
    console.log(selectedCategoryId)
    setFieldValue("category_id", selectedCategoryId);
    setFieldValue("subcategory_id", "");
  };

  const changeSubcategorySelect = (event) => {
    setFieldValue("subcategory_id", event.target.value);
  };
 
  const filteredSubcategories = subcategories.filter(subcategory => subcategory.category_id === values.category_id);
  const columns = [
    {
      field: 'category_id', headerName: 'Category', width: 150,
      renderCell: (params) => {
        const category = categories.find((v) => v._id === params.rows.category_id);
        
        return category ? category.name : '';
      }
    },
    {
      field: 'subcategory_id', headerName: 'SubCategory', width: 150,
      renderCell: (params) => {
        const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
        return subcategory ? subcategory.name : '';
      }
    },
    { field: 'name', headerName: 'Product Name', width: 160 },
    { field: 'description', headerName: 'Product Description', width: 160 },
    { field: 'price', headerName: 'Product Price', width: 160 },
    { field: 'stock', headerName: 'Products Stock', width: 160 },

    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{update ? 'Update Product' : 'Add Product'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="category_id-label">Select Category</InputLabel>
              <Select
                labelId="category_id-label"
                id="category_id"
                value={values.category_id}
                label="Category"
                name="category_id"
                onChange={changeCategorySelect}
                onBlur={handleBlur}
                input={<OutlinedInput label="Select Category" />}
              >
                {categories.map((v) => (
                  <MenuItem key={v._id} value={v._id}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category_id && touched.category_id && <span style={{ color: 'red' }}>{errors.category_id}</span>}
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel id="subcategory_id-label">Select SubCategory</InputLabel>
              <Select
                labelId="subcategory_id-label"
                id="subcategory_id"
                value={values.subcategory_id}
                label="subcategory"
                name="subcategory_id"
                onChange={changeSubcategorySelect}
                onBlur={handleBlur}
                input={<OutlinedInput label="Select subcategory" />}
                disabled={!values.category_id}
              >
                {filteredSubcategories.map((v) => (
                  <MenuItem key={v._id} value={v._id}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.subcategory_id && touched.subcategory_id && <span style={{ color: 'red' }}>{errors.subcategory_id}</span>}
            </FormControl>

            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name}
              helperText={errors.name && touched.name ? errors.name : ''}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={errors.description && touched.description}
              helperText={errors.description && touched.description ? errors.description : ''}
            />
            <TextField
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              error={errors.price && touched.price}
              helperText={errors.price && touched.price ? errors.price : ''}
            />
            <TextField
              margin="dense"
              id="stock"
              name="stock"
              label="Stock"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.stock}
              error={errors.stock && touched.stock}
              helperText={errors.stock && touched.stock ? errors.stock : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </form>
      </Dialog>
      <br /><br />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default Product;