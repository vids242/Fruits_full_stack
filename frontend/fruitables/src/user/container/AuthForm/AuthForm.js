import React, { useState } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ragister } from '../../../redux/slice/authform.slice';


const AuthForm = () => {
    // Set initial form type to 'signup'
    const [formType, setFormType] = useState('signup'); // 'signup', 'login', 'forgot'
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth)
    console.log(auth);
    
    const registerSchema = object({
        name: string().required("Please Enter Name"),
        email: string().required("Please Enter Email"),
        password: string().required("Please Enter Password")
    });

    const loginSchema = object({
        email: string().required("Please Enter Email"),
        password: string().required("Please Enter Password")
    });

    const forgotPasswordSchema = object({
        email: string().required("Please Enter Email"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: formType === 'signup' ? registerSchema :
            formType === 'login' ? loginSchema :
                forgotPasswordSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (formType === 'signup') {
                    dispatch(ragister({ ...values, 'role': 'user' }))
                    console.log("signup Page");
                } else if (formType === 'login') {
                    console.log("login Page");
                } else if (formType === 'forgot') {
                    console.log("forgot Page");
                }
                resetForm();
            } catch (error) {
                console.log(error);
            }
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;

    const renderSignupForm = () => (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="border-bottom rounded">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Your Name*"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name && touched.name ? <span style={{ color: "red" }}>{errors.name}</span> : null}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="border-bottom rounded">
                        <input
                            type="email"
                            className="form-control border-0"
                            placeholder="Your Email *"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email ? <span style={{ color: "red" }}>{errors.email}</span> : null}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="border-bottom rounded">
                        <input
                            type="password"
                            className="form-control border-0"
                            placeholder="Your Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password ? <span style={{ color: "red" }}>{errors.password}</span> : null}
                    </div>
                </div>
                <p onClick={() => setFormType('login')}>Already have an account ? Login</p>
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between py-3 mb-5">
                        <button type="submit" className="btn border border-secondary text-primary rounded-pill px-4 py-3">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    );

    const renderLoginForm = () => (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="row g-4">
                <div className="col-lg-12">
                    <div className="border-bottom rounded">
                        <input
                            type="email"
                            className="form-control border-0"
                            placeholder="Your Email *"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email ? <span style={{ color: "red" }}>{errors.email}</span> : null}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="border-bottom rounded ">
                        <input
                            type="password"
                            className="form-control border-0"
                            placeholder="Your Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password ? <span style={{ color: "red" }}>{errors.password}</span> : null}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between py-3 mb-5">
                        <button type="submit" className="btn border border-secondary text-primary rounded-pill px-4 py-3">Login</button>
                    </div>
                </div>
            </div>
            <p onClick={() => setFormType('forgot')}>Forgot Password?</p>
            <p onClick={() => setFormType('signup')}>Don't have an account? Sign Up</p>
        </form>
    );

    const renderForgotPasswordForm = () => (
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <div className="row g-4">
                <div className="col-lg-12">
                    <div className="border-bottom rounded">
                        <input
                            type="email"
                            className="form-control border-0"
                            placeholder="Your Email *"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email ? <span style={{ color: "red" }}>{errors.email}</span> : null}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between py-3 mb-5">
                        <button type="submit" className="btn border border-secondary text-primary rounded-pill px-4 py-3">Submit</button>
                    </div>
                </div>
            </div>
            <p onClick={() => setFormType('login')}>Remember your password? Login</p>
        </form>
    );

    return (
        <div className="container-fluid py-5 mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div className="auth-form">
                        {formType === 'signup' && renderSignupForm()}
                        {formType === 'login' && renderLoginForm()}
                        {formType === 'forgot' && renderForgotPasswordForm()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;