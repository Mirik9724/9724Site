import React, { useState } from 'react';
import './header.css';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header>
            <div className="logo">
                <div className="im-corn">
                <Link href="/">
                    <img id="logo" src="img/logo/mi.png" alt="Логотип сайта" />
                </Link>
            </div></div>

            <div className="mlg-v1-mo burger" onClick={toggleMenu}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>

            <div className={`nav-menu  mlg-v1-mo ${menuOpen ? 'open' : ''}`}>
                <ul className="header-ul">
                    <nav>
                        <Link href="/">Главная</Link>
                        <Link href="/music">Музыка</Link>
                        <Link href="/it">IT</Link>
                        <Link href="/mlg">MLG</Link>
                    </nav>
                </ul></div>
        </header>
    );
}

export default Header;