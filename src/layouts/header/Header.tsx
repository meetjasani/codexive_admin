import React from 'react'
import "./Header.css"
import Swal from 'sweetalert2'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setToggleMenu } from '../../redux/actions/toggleMenuAction';
import { Container, Navbar, Button, Dropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Close from '../../img/close.png';
import MenuPic from '../../img/menu.png'
function Header() {

    const dispatch = useDispatch();
    const { is_toggleMenu } = useSelector((state: RootStateOrAny) => state.menuToggle);

    const togglemenubtn = () => {
        if (is_toggleMenu) {
            dispatch(setToggleMenu(false));
        }
        else {
            dispatch(setToggleMenu(true));
        }
    }

    const closeopenClass = is_toggleMenu ? 'openmenu' : 'closemenu';

    const history = useHistory();

    return (
        <div className={closeopenClass}>
            <Container fluid className="p-0">
                <Navbar collapseOnSelect expand="lg" className="header-bg position-fixed">

                    <Navbar.Brand className="text-white logo-text">
                        <Button className="border-0 bg-transparent mr-3 closeimg" onClick={togglemenubtn}>
                            <img src={Close} alt="close" />
                        </Button>
                        <Button className="border-0 bg-transparent mr-3 menuimg" onClick={togglemenubtn}>
                            <img src={MenuPic} alt="open" />
                        </Button>
                        <span className="compastrips_name"> Codexive </span> <span className="administrator"> Administrator </span>
                    </Navbar.Brand>



                    <Nav className="ml-auto logout-btn-header">


                        <Nav.Link className="text-center text-white" onClick={() => {
                            Swal.fire({
                                title: "로그아웃",
                                text: "로그아웃 하시겠습니까?",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "확인",
                                cancelButtonText: "취소",
                                reverseButtons: true,
                                showCloseButton: true

                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        localStorage.removeItem('token');
                                        history.push("/");
                                    }
                                })
                        }}>


                            <img src="./img/logout.svg" alt="" />
                        </Nav.Link>
                    </Nav>
                    <div className="pv-notification">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <img className="pv-notification-1" src="./img/notification.png" alt="" />
                            </Dropdown.Toggle>



                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>


                    </div>

                </Navbar>
            </Container>
        </div>

    )
}

export default Header
