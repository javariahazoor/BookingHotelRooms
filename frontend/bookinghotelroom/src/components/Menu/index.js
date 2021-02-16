import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { withRouter, Link } from 'react-router-dom'
import {  search } from '../Constants/routes'

export const Menu = ({ location }) => {
    const [Selected, setSelected] = useState(location.pathname);
    return (

        <Row>
            <Col xs="12" className="p-0">
                <Navbar bg="dark" variant="dark" fixed="top" expand="lg">

                    <Container>

                        <Link to="/" className="navbar-brand">
                            Hotel <span className="yellow">Reservation</span>
                        </Link>
                        
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">

                                <Link to="/" selected onClick={() => setSelected("")}
                                    className={`nav-item ${['/', '', "/home", search.path].includes(Selected)}`}>
                                    {search.title}
                                </Link>

                                {/* <Link to="/" selected onClick={() => setSelected("")}
                                    className={`nav-item ${['/', '', "/home",hotels.path].includes(Selected)}`}>
                                        {hotels.title}
                                </Link> */}
                                
                                {/* <Link to={search.path} Selected onClick={() => setSelected(search.path)}
                                    className={`nav-item ${Selected === search.path}`}>
                                        {search.title}
                                </Link> */}
                                
                            </Nav>

                        </Navbar.Collapse>
                    </Container>

                </Navbar>
            </Col>

        </Row>
    )
}

export default withRouter(Menu);