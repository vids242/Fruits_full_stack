import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/action/products.action';
import { deletedata, dicrementQty, incrementQty } from '../../../redux/slice/cart.slice';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { getCoupon } from '../../../redux/slice/coupan.slice';
import Button from '../../component/UI/Button/Button';


function Cart(props) {
    const cart = useSelector(state => state.cart)

    const product = useSelector(state => state.products)

    const coupans = useSelector(state => state.coupon)
    // console.log(coupans);
    // console.log(cart, product);
    const [discount, setDiscount] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCoupon())
    }, [])

    const cartData = cart.cart.map((v) => {
        // console.log(v.pid);

        const productData = product.products.find((v1) => v1.id === v.pid)
        console.log(productData);

        return { ...productData, qty: v.qty }
    })
    const hendalInc = (id) => {
        dispatch(incrementQty(id))
    }
    const hendalDic = (id) => {
        dispatch(dicrementQty(id))
    }
    const hendalDelet = (id) => {
        dispatch(deletedata(id))
    }

    const hendalSubmit = (data) => {
        console.log(data);
        let flag = 0
        let pr = 0

        coupans.coupon.map((v) => {
            const currentDate = new Date()
            const expiryDate = new Date(v.expiry_Date)


            console.log(currentDate, expiryDate);

            if (v.coupon_name === data.coupan) {
                if (currentDate <= expiryDate) {
                    flag = 1
                    pr = (v.percentage)
                    setDiscount(pr)
                } else {
                    flag = 2
                }
            }
        })

        if (flag === 0) {
            formik.setFieldError('coupan', "please enter valid coupan")
        } else if (flag === 1) {
            formik.setFieldError('coupan', `coupan applied succesfully & you get flet ${pr}% Discount`)
        } else if (flag === 2) {
            formik.setFieldError('coupan', "coupan expired")

        }
    }

    const total = cartData.reduce((a, v) => a + v.qty * v.price, 0)

    let totalDiscount = total * (discount / 100)

    let totalamt = total - totalDiscount
    let coupanSchema = object({
        coupan: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            coupan: ''
        },
        validationSchema: coupanSchema,
        onSubmit: values => {
            hendalSubmit(values)
        },
    });

    const { handleBlur, handleSubmit, handleChange, values, errors, touched } = formik

    return (
        <div>
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((v) => (
                                        <tr>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={v.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price} $</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => hendalDic(v.id)} disabled={v.qty > 1 ? false : true} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span className="form-control form-control-sm text-center border-0" defaultValue={v.qty} >
                                                        {v.qty}
                                                    </span>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => hendalInc(v.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{(v.price * v.qty).toFixed(2)}$</p>
                                            </td>
                                            <td>
                                                <button onClick={() => hendalDelet(v.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <input
                                name='coupan'
                                type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.coupan}
                            />{
                                errors.coupan && touched.coupan ? <span style={{ color: "red" }}>{errors.coupan}</span> : null
                            }
                            <Button
                                btnDisable={true}
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                type="submit"> Apply Coupon
                            </Button>
                        </form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${total.toFixed(2)}</p>
                                    </div>
                                    {
                                        totalDiscount > 0 ?
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="mb-0 me-4">Discount:</h5>
                                                <p className="mb-0">${totalDiscount.toFixed(2)}</p>
                                            </div> : null

                                    }
                                    {
                                        totalamt < 500 ?
                                            <>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="mb-0 me-4">Shipping</h5>
                                                    <div className>
                                                        <p className="mb-0">Flat rate: ${100}</p>
                                                    </div>

                                                </div>

                                                <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                            </>
                                            : null
                                    }


                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${totalamt < 500 ? totalamt + 100 : totalamt}</p>
                                </div>
                                <Button btnType="primary">
                                    Proceed Checkout
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;