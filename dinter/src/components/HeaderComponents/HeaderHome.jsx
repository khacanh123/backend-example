import React, { useContext } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../common/Token';
import {AuthContext} from '../../context/AuthContext.jsx'
function HeaderHome(props) {
    const nav = useNavigate();
    const {setUser} = useContext( AuthContext );

    const handleLogout = () => {
        clearToken();
        localStorage.removeItem('User');
        setUser(null);
        nav('/login');
    }
    return (
        <Container fluid style={{ backgroundColor: "#fff", padding: "10px 0", position: "fixed", zIndex: "2" }} className='headerContainer'>
            <Container className=" d-flex justify-content-between header align-items-center">
                <Link to={'/'} style={{ textDecoration: "none", color: '#000' }}>
                    <div className='header-logo poin pointer'>
                        <img src='images/common/dinter-logo.png' alt='logo' width={"30px"} />
                        <strong style={{ marginLeft: "5px" }}>DINTER</strong>
                    </div>
                </Link>
                <div className="header-search">
                    <div className='d-flex align-items-center'>
                        <ion-icon name="search-outline"></ion-icon>
                        <input type="text" placeholder='Search your friends' />
                    </div>
                </div>
                <Dropdown>
                    <Dropdown.Toggle className='header-dropdown'>
                        <div className="header-avatar avatar">
                            <img src="images/common/avatar.png" alt="avatar" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </Container>
        </Container>
    );
}

export default HeaderHome;