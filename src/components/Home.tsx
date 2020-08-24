import React, { useEffect, useState, useContext } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { userContext } from '../App'
import { Types } from '../reducers';

import { Link, withRouter } from 'react-router-dom'

const Home = () => {

    const [items, setItems] = useState<any[]>([])
    const [subtotal, setSubtotal] = useState(0)
    const [dropDwonValue, setDropDwonValue] = useState("Default Sorting")
    const { state, dispatch } = React.useContext(userContext);

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/naieem/c138ff1f12847b2a1b8ad85866426d3d/raw/037825eee126d589ab3e1fff6c3d0119f33f3b5b/Products?fbclid=IwAR0Ls3YK0ruoAT5VkgaFy0jfGN-BmjbKZEVMDXw1ekT5nQMrLIZ_yTN2Pmc')
            .then(res => {
                //console.log(res.data)
                setItems(res.data)
            })
    }, [])


    useEffect(() => {
        calculateSubTotal()
    }, [state])


    const sortDescending = () => {
        const sorted = items.sort((a, b) => a["price"] - b["price"])
        //console.log(sorted)
        setItems(sorted)
    }

    const sortAscending = () => {
        const sorted = items.sort((a, b) => b["price"] - a["price"])
        //console.log(sorted)
        setItems(sorted)
    }


    const handleSelect = (e) => {
        console.log(e);
        //setValue(e)
        setDropDwonValue(e)

        if (e === "Ascending") {
            sortAscending()
        }
        else if (e === "Descending") {
            sortDescending()
        }

    }

    const calculateSubTotal = () => {
        let sTotal = 0
        for (let i = 0; i < state.products.length; i++) {
            sTotal = sTotal + state.products[i].price * state.products[i].count
        }
        //console.log(sTotal)
        setSubtotal(sTotal)
    }

    const addToCart = (record) => {
        //console.log(record)

        for (let i = 0; i < state.products.length; i++) {
            if (state.products[i].id === record._id) {
                dispatch({
                    type: Types.Increase,
                    payload: {
                        id: record._id,
                    }
                });

                //console.log("Got One Bye")

                return;
            }
        }

        dispatch({
            type: Types.Create,
            payload: {
                id: record._id,
                title: record.title,
                price: record.price,
                picture: record.picture,
                count: 1
            }
        });


        //console.log(state)
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
        <>
            {items ?
                <div>

                    <div className="container">
                        <div className="row site-section">
                            <div className="col-md-9">

                                <h1>Shop</h1>

                                <DropdownButton
                                    alignRight
                                    title={dropDwonValue}
                                    id="dropdown-menu-align-right"
                                    onSelect={handleSelect}
                                    style={{ float: "right", position: "absolute", right: "0px" }}
                                >
                                    <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="Descending">Descending</Dropdown.Item>
                                </DropdownButton>
                                <br></br>
                                <br></br>
                                <br></br>


                                {
                                    items.map(record => {
                                        return (
                                            <div key={record._id}>
                                                <Card>
                                                    <Card.Img variant="top" src={record.picture} />
                                                    <Card.Body style={{ textAlign: "center" }}>
                                                        <Card.Title className="btn"
                                                        ><Link to={{
                                                            pathname: '/product/' + record._id,
                                                            state: { foo: record }
                                                        }}>{record.title} </Link></Card.Title>
                                                        <Card.Text>
                                                            {record.description}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            ${record.price}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Available prdoucts: {record.stock}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer className="align-items-center" >
                                                        <i className="material-icons"
                                                            style={{ float: "left", position: "absolute", left: "0px", color: "red", marginLeft: "5px" }}
                                                            onClick={() => { addToCart(record) }}
                                                        >add_shopping_cart</i> <small className="btn" onClick={() => { addToCart(record) }} style={{ marginLeft: "10px", fontSize:"large" }}>  Add to cart</small>

                                                        {
                                                            state.products.map(product => (
                                                                product.id === record._id
                                                                    ? <span key={product.id}>
                                                                        <i className="material-icons"
                                                                            style={{ position: "relative", left: "0px", color: "grey", marginLeft: "0px" }}
                                                                            
                                                                        >check</i>

                                                                        <span className="btn btn-secondary" key={product.id} style={{ marginLeft: "20px" }}><Link style={{ color: "white" }} to={{
                                                                            pathname: '/cart'
                                                                        }}> View cart</Link></span>

                                                                    </span>
                                                                    :
                                                                    <span key={product.id}></span>
                                                            ))
                                                        }
                                                    </Card.Footer>
                                                </Card>
                                                <br></br>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="col-md-3">
                                <h1>Cart</h1>
                                {
                                    state.products.length > 0 ?
                                        <div>
                                            {state.products.map(record => (
                                                <div className="Comment-user" key={record.id} style={{ borderBottom: "1px solid blue" }}>
                                                    <div>
                                                        <div className="Comment-user-avatar">
                                                            <img src={record.picture} />
                                                        </div>
                                                    </div>
                                                    <div className="Comment-user-nickname" >

                                                        <span style={{ fontFamily: "'PT Sans', sans-serif", fontWeight: "bold" }}>{record.title}</span>

                                                        <br></br>
                                                        {record.count} x ${record.price}
                                                        <i className="material-icons"
                                                            style={{ float: "right", position: "absolute", right: "0px", color: "red" }}
                                                            onClick={() => { removeToCart(record.id) }}
                                                        >delete</i>

                                                    </div>

                                                </div>
                                            ))}
                                            <br></br>

                                            <span style={{ fontWeight: "bolder", fontSize: "small" }}>Subtotal: ${subtotal}</span>

                                            <br></br>

                                            <div className="btn btn-secondary" style={{ marginRight: "10px" }}><Link style={{ color: "white" }} to={{
                                                pathname: '/cart'
                                            }}> View cart</Link></div>

                                            <div className="btn btn-secondary">Checkout</div>
                                        </div>
                                        : <h4>No products in the cart</h4>
                                }
                            </div>

                        </div>


                    </div>
                </div >

                :
                <h2>Loading......</h2>
            }
        </>

    )
}

export default withRouter(Home)