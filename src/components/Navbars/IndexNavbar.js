/*!

=========================================================
* BLK Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Register } from " ../../../src/views/examples/Register.js";
import Signup from "../../../src/views/IndexSections/Signup.js";
import ReactModal from "react-modal";
import axios from "axios";
import { useAlert } from "react-alert";
import ImageUploader from "react-images-upload";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Label,
    Collapse,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Modal,
    Row,
    Col
} from "reactstrap";
import { getLogin } from "../services/api";
ReactModal.setAppElement("#root");

class ComponentsNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: "navbar-transparent",
            isModalOpen: false,
            Usermail: "",
            Password: "",
            Name: "",
            isRegisterModalOpen: false,
            Signin: true,
            isLoggedIn: false,
            isModalOpenBooking: false,
            Phone: null,
            photo: [],
            photoName: null,
            Bookingfind: null,
            BookingDetails: null
        };
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    //state = {isModalOpen:false};

    //That means that function is always executed on mount, will be run on start and when checkpaymentMethod changes.
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. To do so, pass an array as an optional second argument to useEffect: [...]

    componentDidMount() {
        window.addEventListener("scroll", this.changeColor);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.changeColor);
    }
    openModal = () => {
        //console.log("This Open Modal")
        this.setState({ isModalOpen: true });
        //  document.getElementById("signup-section");
    };
    handlePhoto = event => {
        this.state.photo = event.target.files[0];
        this.state.photoName = event.target.files[0].name;
    };
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });
    }
    openModalBooking = () => {
        //console.log("This Open Modal")
        this.setState({ isModalOpenBooking: true });
        //  document.getElementById("signup-section");
    };
    openRegister = () => {
        this.setState({ isRegisterModalOpen: true, isModalOpen: false });
    };

    handlePassWordChange(event) {
        this.setState({ Password: event.target.value });
    }
    handleNameChange(event) {
      console.log("handleNameChange");
      console.log(event.target.value);
        this.setState({ Name: event.target.value });
    }
    handlePhoneChange(event) {
        this.setState({ Phone: event.target.value });
    }
    handleEmailChange(event) {
        this.setState({ Usermail: event.target.value });
    }
    handleSubmit(event) {
        this.state.alert("A name was submitted: " + this.state.Password);
        event.preventDefault();
    }
    closeModal = () => {
        this.setState({ isModalOpen: false });
    };
    closeModalBooking = () => {
        this.setState({ isModalOpenBooking: false });
    };
    closeRegisterModal = () => {
        this.setState({ isModalOpen: true, isRegisterModalOpen: false });
    };
    useLogin = () => {
        //const alert = useAlert();
        return axios({
            url: "api/loginc",
            method: "GET",
            header: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            params: {
                password: this.state.Password,
                email: this.state.Usermail
            }
        })
            .then(res => {
                if (!res.data) {
                    console.log(res.data);
                } else {
                    console.log(res.data);

                    this.setState({
                        isModalOpen: false,
                        collapseOpen: false,
                        isLoggedIn: true
                    });

                    this.props.handleLogin(true, this.state.Usermail);

                    // alert.success('You are succesfully loged in')
                }
            })

            .catch(function($response) {
                //handle error
                console.log($response);
                // this.props.handleLogin(false);
            });
    };
    userCheckin = () => {
        //const alert = useAlert();
        return axios({
            url: "api/checkins",
            method: "GET",
            header: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            params: {
                name: this.state.Name,
                phone: this.state.Phone,
                email: this.state.Usermail
            }
        })
            .then(res => {
                console.log(res.data);
                if (!res.data) {
                    console.log(res.data);
                    this.setState({ Bookingfind: true, BookingDetails: null });
                } else {
                    console.log(res.data);

                    this.setState({
                        Bookingfind: true,
                        BookingDetails: res.data
                    });

                    // alert.success('You are succesfully loged in')
                }
            })

            .catch(function($response) {
                //handle error
                console.log($response);
                // this.props.handleLogin(false);
            });
    };
    userRegister = () => {
        // const alert = useAlert();

        console.log(this.state.Password);
        return axios({
            url: "api/registerc",
            method: "POST",
            header: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data: {
                password: this.state.Password,
                email: this.state.Usermail,
                name: this.state.Name
            }
        })
            .then(res => {
                console.log(res.data);
                // alert.success('You are succesfully registered')

                this.setState({ isRegisterModalOpen: false });
            })

            .catch(function(response) {
                //handle error
                console.log(response);
            });
    };
    changeColor = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            this.setState({
                color: "bg-info"
            });
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            this.setState({
                color: "navbar-transparent"
            });
        }
    };
    toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    onCollapseExiting = () => {
        this.setState({
            collapseOut: "collapsing-out"
        });
    };
    onCollapseExited = () => {
        this.setState({
            collapseOut: ""
        });
    };
    scrollToDownload = () => {
        document
            .getElementById("download-section")
            .scrollIntoView({ behavior: "smooth" });
    };
    render() {
        return (
            <React.Fragment>
                <Navbar
                    className={"fixed-top " + this.state.color}
                    color-on-scroll="100"
                    expand="lg"
                >
                    <Container>
                        <div className="navbar-translate">
                            <NavbarBrand
                                data-placement="bottom"
                                to="/"
                                rel="noopener noreferrer"
                                title="Designed and Coded by Creative Tim"
                                tag={Link}
                            >
                                <span>ΙΣΝ• SNF </span>
                                Stavros Niarxos Foundation
                            </NavbarBrand>
                            <button
                                aria-expanded={this.state.collapseOpen}
                                className="navbar-toggler navbar-toggler"
                                onClick={this.toggleCollapse}
                            >
                                <span className="navbar-toggler-bar bar1" />
                                <span className="navbar-toggler-bar bar2" />
                                <span className="navbar-toggler-bar bar3" />
                            </button>
                        </div>
                        <Collapse
                            className={
                                "justify-content-end " + this.state.collapseOut
                            }
                            navbar
                            isOpen={this.state.collapseOpen}
                            onExiting={this.onCollapseExiting}
                            onExited={this.onCollapseExited}
                        >
                            <div className="navbar-collapse-header">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                        <a
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            BLK•React
                                        </a>
                                    </Col>
                                    <Col
                                        className="collapse-close text-right"
                                        xs="6"
                                    >
                                        <button
                                            aria-expanded={
                                                this.state.collapseOpen
                                            }
                                            className="navbar-toggler"
                                            onClick={this.toggleCollapse}
                                        >
                                            <i className="tim-icons icon-simple-remove" />
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                            <Nav navbar>
                                <NavItem className="p-0">
                                    <NavLink
                                        data-placement="bottom"
                                        href="https://twitter.com/CreativeTim"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        title="Follow us on Twitter"
                                    >
                                        <i className="fab fa-twitter" />
                                        <p className="d-lg-none d-xl-none">
                                            Twitter
                                        </p>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="p-0">
                                    <NavLink
                                        data-placement="bottom"
                                        href="https://www.facebook.com/CreativeTim"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        title="Like us on Facebook"
                                    >
                                        <i className="fab fa-facebook-square" />
                                        <p className="d-lg-none d-xl-none">
                                            Facebook
                                        </p>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="p-0">
                                    <NavLink
                                        data-placement="bottom"
                                        href="https://www.instagram.com/CreativeTimOfficial"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        title="Follow us on Instagram"
                                    >
                                        <i className="fab fa-instagram" />
                                        <p className="d-lg-none d-xl-none">
                                            Instagram
                                        </p>
                                    </NavLink>
                                </NavItem>
                                {this.state.BookingDetails &&
                                this.state.Bookingfind ? (
                                    <UncontrolledDropdown nav>
                                        <DropdownToggle
                                            caret
                                            color="default"
                                            data-toggle="dropdown"
                                            href="#pablo"
                                            nav
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="fa fa-cogs d-lg-none d-xl-none" />
                                            Πληροφορίες της Κράτησής μου
                                        </DropdownToggle>
                                        <DropdownMenu
                                            size="40"
                                            heigh="40"
                                            width="40"
                                        >
                                        <DropdownItem
                                                size="40"
                                                heigh="40"
                                                width="40"
                                            >
                                               Όροφος:   {
                                                  this.state.BookingDetails[0]
                                                        .room_name
                                                }
                                            </DropdownItem>
                                            <DropdownItem
                                                size="40"
                                                heigh="40"
                                                width="40"
                                            >
                                               Σειρά:   {
                                                  this.state.BookingDetails[0]
                                                        .location
                                                }
                                            </DropdownItem>
                                            <DropdownItem
                                                size="40"
                                                heigh="40"
                                                width="40"
                                            >
                                               Γραμμή: {
                                                    this.state.BookingDetails[0]
                                                        .row
                                                }
                                            </DropdownItem>
                                            <DropdownItem
                                                size="40"
                                                heigh="40"
                                                width="40"
                                        
                                            >
                                              <div style={{ color: "#e14eca" }}>
                                              Αρ/μός.Θέσης: {
                                                    this.state.BookingDetails[0]
                                                        .seat_number
                                                }
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem
                                                size="40"
                                                heigh="40"
                                                width="40"
                                            >
                                               Περιγραφή {
                                                    this.state.BookingDetails[0]
                                                        .tooltip
                                                }
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                ) : null}
                                <NavItem className="p-0">
                                    <Button
                                        color="primary" /* to="register-page" tag={Link}  */
                                        onClick={this.openModalBooking}
                                    >
                                        Check in To Library
                                    </Button>
                                </NavItem>
                                <NavItem className="p-0">
                                    <Button
                                        color="primary" /* to="register-page" tag={Link}  */
                                        onClick={this.openModal}
                                    >
                                        Sign Up/Registers
                                    </Button>
                                    {/*  <Button
                  className="nav-link d-none d-lg-block"
                  color="default"
                  onClick={this.scrollToDownload}
                >
                  <i className="tim-icons icon-cloud-download-93" /> Download
                </Button> */}
                                    {this.state.isLoggedIn && (
                                        <span>{this.state.Usermail} </span>
                                    )}
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

                <Col sm="5" md="7">
                    <Modal isOpen={this.state.isModalOpen}>
                        <Button
                            color="primary" /* to="register-page" tag={Link}  */
                            onClick={this.closeModal}
                        >
                            Close
                        </Button>

                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <small>Sign in with</small>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <Button
                                        className="btn-neutral btn-icon"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <span className="btn-inner--icon">
                                            <img
                                                alt="..."
                                                src={require("../../assets/img/icons/common/github.svg")}
                                            />
                                        </span>
                                        <span className="btn-inner--text">
                                            Github
                                        </span>
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-icon"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <span className="btn-inner--icon">
                                            <img
                                                alt="..."
                                                src={require("../../assets/img/icons/common/google.svg")}
                                            />
                                        </span>
                                        <span className="btn-inner--text">
                                            Google
                                        </span>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <InputGroup
                                            className="input-group-alternative  "
                                            style={{
                                                backgroundColor: "#B59CB8"
                                            }}
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                autoComplete="new-email"
                                                value={this.state.Usermail}
                                                onChange={
                                                    this.handleEmailChange
                                                }
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup
                                            className="input-group-alternative"
                                            style={{
                                                backgroundColor: "#B59CB8"
                                            }}
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Password"
                                                id="password "
                                                type="password"
                                                autoComplete="new-password"
                                                value={this.state.Password}
                                                onChange={
                                                    this.handlePassWordChange
                                                }
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin"
                                            type="checkbox"
                                            color="primary"
                                            style={{ color: "primary" }}
                                        />

                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin"
                                        >
                                            <span className="text-muted">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="button"
                                            onClick={this.useLogin}
                                        >
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className="mt-3" style={{ color: "primary" }}>
                            <Col xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                    color="primary"
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </Col>
                            <Col className="text-right" xs="6">
                                <a
                                    className="text-light"
                                    href="#pablo"
                                    onClick={this.openRegister}
                                >
                                    <small>Create new account</small>
                                </a>
                            </Col>
                        </Row>
                    </Modal>
                    <Modal isOpen={this.state.isModalOpenBooking}>
                        <Button
                            color="primary" /* to="register-page" tag={Link}  */
                            onClick={this.closeModalBooking}
                        >
                            Close
                        </Button>

                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <small>Check in To the Library</small>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Fill your Infos</small>
                                </div>
                                <Form role="form">
                                    <FormGroup>
                                        <InputGroup
                                            className="input-group-alternative mb-3"
                                            style={{
                                                backgroundColor: "#B59CB8"
                                            }}
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-hat-3" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Name"
                                                type="text"
                                                onChange={this.handleNameChange}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup
                                            className="input-group-alternative mb-3"
                                            style={{
                                                backgroundColor: "#B59CB8"
                                            }}
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                autoComplete="new-email"
                                                onChange={
                                                    this.handleEmailChange
                                                }
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup
                                            className="input-group-alternative mb-3"
                                            style={{
                                                backgroundColor: "#B59CB8"
                                            }}
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-hat-3" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Mobile Phone"
                                                type="number"
                                                maxLength="10"
                                                onChange={
                                                    this.handlePhoneChange
                                                }
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        Upload Your photo
                                        {this.state.photoName}
                                    </FormGroup>
                                    <input
                                        type="file"
                                        onChange={this.handlePhoto}
                                    ></input>
                                    <div className="text-center">
                                        <Button
                                            className="mt-4"
                                            color="primary"
                                            type="button"
                                            onClick={this.userCheckin}
                                        >
                                            Check In
                                        </Button>
                                        {this.state.Bookingfind &&
                                        this.state.BookingDetails ? (
                                            <FormGroup>
                                                Βρέθηκε η κράτησή σου ! Καλως
                                                ήρθες {this.state.Name} !
                                            </FormGroup>
                                        ) : null}
                                        {this.state.Bookingfind &&
                                        !this.state.BookingDetails ? (
                                            <FormGroup>
                                                Δεν βρέθηκε η Κράτηση με αυτά τα
                                                στοιχεία παρακαλώ δοκιμάστε ξανά
                                            </FormGroup>
                                        ) : null}
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Modal>
                </Col>

                <Col sm="5" md="7">
                    <Modal isOpen={this.state.isRegisterModalOpen}>
                        <>
                            <Button
                                color="primary" /* to="register-page" tag={Link}  */
                                onClick={this.closeRegisterModal}
                            >
                                Close
                            </Button>
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent pb-5">
                                    <div className="text-muted text-center mt-2 mb-4">
                                        <small>Sign up with</small>
                                    </div>
                                    <div className="text-center">
                                        <Button
                                            className="btn-neutral btn-icon mr-4"
                                            color="default"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <span className="btn-inner--icon">
                                                {/* <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    /> */}
                                            </span>
                                            <span className="btn-inner--text">
                                                Github
                                            </span>
                                        </Button>
                                        <Button
                                            className="btn-neutral btn-icon"
                                            color="default"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <span className="btn-inner--icon">
                                                {/*  <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    /> */}
                                            </span>
                                            <span className="btn-inner--text">
                                                Google
                                            </span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>
                                            Or sign up with credentials
                                        </small>
                                    </div>
                                    <Form role="form">
                                        <FormGroup>
                                            <InputGroup
                                                className="input-group-alternative mb-3"
                                                style={{
                                                    backgroundColor: "#B59CB8"
                                                }}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Name"
                                                    type="text"
                                                    onChange={
                                                        this.handleNameChange
                                                    }
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup
                                                className="input-group-alternative mb-3"
                                                style={{
                                                    backgroundColor: "#B59CB8"
                                                }}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    autoComplete="new-email"
                                                    onChange={
                                                        this.handleEmailChange
                                                    }
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup
                                                className="input-group-alternative"
                                                style={{
                                                    backgroundColor: "#B59CB8"
                                                }}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    onChange={
                                                        this
                                                            .handlePassWordChange
                                                    }
                                                    style={{ color: "primary" }}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="text-muted font-italic">
                                            <small>
                                                password strength:{" "}
                                                <span className="text-success font-weight-700">
                                                    strong
                                                </span>
                                            </small>
                                        </div>
                                        <Row className="my-4">
                                            <Col xs="12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="customCheckRegister"
                                                        type="checkbox"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheckRegister"
                                                    >
                                                        <span className="text-muted">
                                                            I agree with the{" "}
                                                            <a
                                                                href="#pablo"
                                                                onClick={e =>
                                                                    e.preventDefault()
                                                                }
                                                            >
                                                                Privacy Policy
                                                            </a>
                                                        </span>
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="text-center">
                                            <Button
                                                className="mt-4"
                                                color="primary"
                                                type="button"
                                                onClick={this.userRegister}
                                            >
                                                Create account
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </>
                    </Modal>
                </Col>
            </React.Fragment>
        );
    }
}

export default ComponentsNavbar;
