import React, { useContext, useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { userContext } from '../App'
import { Types } from '../reducers';
const Cart = () => {
    const { state, dispatch } = useContext(userContext);
    const [subtotal, setSubtotal] = useState(0)
    //console.log(state)

    useEffect(() => {
        calculateSubTotal()
    }, [state])

    const calculateSubTotal = () => {
        let sTotal = 0
        for (let i = 0; i < state.products.length; i++) {
            sTotal = sTotal + state.products[i].price * state.products[i].count
        }
        //console.log(sTotal)
        setSubtotal(sTotal)
    }

    const removeToCart = (recordid) => {
        //console.log(record)
        dispatch({
            type: Types.Delete,
            payload: {
                id: recordid
            }
        })

        //console.log(state)
    }

    return (
        <div className="container">
            <h1>Cart View</h1>

            <Table striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th style={{ textAlign: "center", fontSize: "x-large" }}>Product</th>
                        <th style={{ textAlign: "center", fontSize: "x-large" }}>Price</th>
                        <th style={{ textAlign: "center", fontSize: "x-large" }}>Quantity</th>
                        <th style={{ textAlign: "center", fontSize: "x-large" }}>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.products.map(product => (
                            <tr key={product.id}>
                                <td > <i className="material-icons"
                                    style={{ color: "red" }}
                                    onClick={() => { removeToCart(product.id) }}
                                >delete</i></td>
                                <td style={{ textAlign: "center" }}><div className="Comment-user-avatar">
                                    <img src={product.picture} />
                                </div></td>
                                <td className="text-primary" style={{ textAlign: "center", fontSize: "x-large" }}>{product.title}</td>
                                <td style={{ textAlign: "center", fontSize: "x-large" }}>${product.price}</td>
                                <td style={{ textAlign: "center", fontSize: "x-large" }}>{product.count}</td>
                                <td style={{ textAlign: "center", fontSize: "x-large" }}>${product.price * product.count}</td>
                            </tr>
                        ))
                    }
                    <tr key="0">
                        <td colSpan={6} style={{ textAlign: "right", fontSize: "x-large" }}> <Button variant="secondary" size="lg">Update Cart</Button> </td>
                    </tr>
                </tbody>
            </Table>

            <br></br>
            <br></br>

            <div className="row">
                <div style={{ height: "300px" }} className="col-md-10 offset-md-6">
                    <div className="row border align-items-center" key="1" style={{ height: "100px", fontSize: "x-large", paddingLeft: "10px", paddingRight: "30px" }}>
                        <span style={{ paddingRight: "15px", fontWeight: "bolder", color:"gray" }}>Subtotal</span>
                        <span style={{ fontWeight: "lighter" }}>${subtotal}</span>

                    </div>
                    <div className="row border align-items-center" key="2" style={{ height: "150px", fontSize: "x-large", paddingLeft: "10px", paddingRight: "30px" }}>
                        <span style={{ paddingRight: "15px", fontWeight: "bolder", color:"gray" }}>Shipping</span>
                        <span style={{ fontWeight: "lighter" }}>Free Shipping <br></br>Shipping options will be updated during checkout </span>

                    </div>
                    <div className="row border align-items-center" key="3" style={{ height: "100px", fontSize: "x-large", paddingLeft: "10px", paddingRight: "30px" }}>
                        <span style={{ paddingRight: "60px", fontWeight: "bolder", color:"gray" }}>Total</span>
                        <span style={{ fontWeight: "lighter" }}>${subtotal}</span>

                    </div>
                </div>
            </div>






        </div>
    )
}

export default Cart