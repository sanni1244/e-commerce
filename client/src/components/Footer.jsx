import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaWhatsapp, FaTelegramPlane, FaTelegram } from "react-icons/fa";
import { IoMail, IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li><a href="/about#story">Our Story</a></li>
            <li><a href="/about#mission">Mission</a></li>
            <li><a href="/about#career">Careers</a></li>
            <li><a href="/about#tos">Terms of Service</a></li>
            <li><a href="/about#privacy">Privacy Policy</a></li>
            <li><Link to={"/admin"}>Admin</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/services">Contact Us</a></li>
            <li><a href="/services">FAQs</a></li>
            <li><a href="/services">Shipping Information</a></li>
            <li><a href="/services">Returns & Exchanges</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect With Us</h4>
          <ul className="social-icons">
            <li><a href="+2349083575587"><IoCall/></a></li>
            <li><a href="astro8va@gmail.com"><IoMail/></a></li>
            <li><a href="t.me/OpeyemiM1"><FaTelegram/></a></li>
            <li><a href="#"><FaTwitter/></a></li>
            <li><a href="https://www.instagram.com/blank_intro/"><FaInstagram/></a></li>
            <li><a href="https://github.com/sanni1244"><FaGithub/></a></li>
            <li><a href="https://wa.link/nzt6fb"><FaWhatsapp/></a></li>             
          </ul> 
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Buyverse. All Rights Reserved.</p>
      </div>
    </footer> 
  );
}

export default Footer;
