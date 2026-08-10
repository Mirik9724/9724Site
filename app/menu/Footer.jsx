import React from 'react';
import './footer.css';
import Link from "next/link";

function Footer() {
    return (
        <footer className="footer">
            <div className="social-icons" id="media">
                <div className="im-corn">
                <a href="https://t.me/mirik9724"><img src="img/logo/telegram.webp" alt="Telegram"/></a>
                <a href="https://github.com/Mirik9724"><img src="img/logo/github.png" alt="GitHub"/></a>
                <a href="https://www.youtube.com/@mirik9724"><img src="img/logo/Youtube.webp" alt="Youtube"/></a>
                </div>
            </div>
            <p>&copy; 2026 Все права защищены<Link href={"/ss"}>.</Link></p>
        </footer>
    );
}

export default Footer;