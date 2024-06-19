import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string, number, date, InferType, mixed, array, ref } from 'yup';

import { useFormik } from 'formik';
import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';


export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };
    let d = new Date()
    d.setDate(d.getDate() - 1);
    console.log(d)

    const hobbiesList = ['Reading', 'Traveling', 'Gaming', 'Cooking'];
    const handleHobbiesChange = (event) => {
        const { value } = event.target;
        const currentIndex = values.hobbies.indexOf(value);
        const newHobbies = [...values.hobbies];

        if (currentIndex === -1) {
            newHobbies.push(value);
        } else {
            newHobbies.splice(currentIndex, 1);
        }
        setFieldValue('hobbies', newHobbies);
    };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    let employeSchema = object({
        name: string().required("please entre name").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
        email: string().required("please entre email").email(),
        phone: string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10)
            .max(10)
            .required("please enter number"),
        age: string()
            .min(18)
            .max(100)
            .required("please enter Age"),
        password:
            string()
                .required('Password is required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    ' Password must contain at least 8 characters, one letter, and one special character'
                ),
        conformpass:
            string()
                .required('Please retype your password.')
                .oneOf([ref('password')], 'Your passwords do not match.'),

        appointmentdate: date()
            .min(d, "Please Selct Atlist Todays Date")
            .required(),
        messsage: string()
            .required()
            .test("message-remove-space", "more then one space is not allowed",
                (val) => !val.trim().includes("  ")
            )
            .test("message", "Max 5 words allowed.", function (val) {
                console.log(val.trim(), val);
                let x = val.trim()
                let arr = x.split(" ");
                console.log(arr);
                return arr.length <= 5;
            }),
        file:
            mixed()
                .required('File is required').
                test('fileType', 'Unsupported file format. Please provide a file in PNG, PDF, SVG, or JPG format', (value) => {
                    if (!value) return false;
                    const supportedFormats = ['image/png', 'image/jpeg', 'application/pdf', 'image/svg+xml'];
                    return supportedFormats.includes(value.type);
                }),
        gender: string()
            .required(),
        hobbies: array()
            .required()
            .min(3)
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            age: '',
            password: '',
            conformpass: '',
            appointmentdate: '',
            messsage: '',
            file: '',
            gender: '',
            hobbies: [],
        },

        validationSchema: employeSchema,

        onSubmit: (values, { resetForm }) => {
            resetForm();
            handleClose();
        },
    });



    const { handleSubmit, handleBlur, handleChange, setFieldValue, errors, values, touched, setValues } = formik;

    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Employes Chart
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Employes Chart</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                error={errors.name && touched.name ? true : false}
                                helperText={errors.name && touched.name ? errors.name : ''}

                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                error={errors.email && touched.email ? true : false}
                                helperText={errors.email && touched.email ? errors.email : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="phone"
                                label="phone"
                                type="text"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                error={errors.phone && touched.phone ? true : false}
                                helperText={errors.phone && touched.phone ? errors.phone : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="age"
                                label="age"
                                type="text"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.age}
                                error={errors.age && touched.age ? true : false}
                                helperText={errors.age && touched.age ? errors.age : ''}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="password"
                                name="password"
                                label="Password"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password && errors.password}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="conformpass"
                                name="conformpass"
                                label="Confirm Password"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.conformpass}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.conformpass && touched.conformpass}
                                helperText={errors.conformpass && touched.conformpass && errors.conformpass}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="appointmentdate"
                                type="date"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.appointmentdate}
                                error={errors.appointmentdate && touched.appointmentdate ? true : false}
                                helperText={errors.appointmentdate && touched.appointmentdate ? errors.appointmentdate : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="messsage"
                                label="Message"
                                type="text"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.messsage}
                                error={errors.messsage && touched.messsage ? true : false}
                                helperText={errors.messsage && touched.messsage ? errors.messsage : ''}

                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="file"
                                label="File"
                                type="file"
                                fullWidth
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={(event) => setFieldValue("file", event.currentTarget.files[0])}

                                error={errors.file && touched.file ? true : false}
                                helperText={errors.file && touched.file ? errors.file : ''}

                            />
                            <FormControl
                                margin="dense"
                                fullWidth
                                error={touched.gender && Boolean(errors.gender)}
                            >
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                </RadioGroup>
                                {touched.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                            </FormControl>
                            <FormControl
                                margin="dense"
                                fullWidth
                                error={touched.hobbies && Boolean(errors.hobbies)}
                            >
                                <FormLabel>Hobbies</FormLabel>
                                {hobbiesList.map((hobby) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={hobby}
                                                checked={values.hobbies.includes(hobby)}
                                                onChange={handleHobbiesChange}
                                                onBlur={handleBlur}
                                            />
                                        }
                                        label={hobby}
                                        key={hobby}
                                    />
                                ))}
                                {touched.hobbies && <FormHelperText>{errors.hobbies}</FormHelperText>}
                            </FormControl>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>

                </Dialog>
            </React.Fragment>


        </>
    );
}