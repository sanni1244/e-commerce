import { FaAngleLeft } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Back = () => {
    let themeC = localStorage.getItem('themeColor') || "#967BB6"
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isHome2 = location.pathname === '/';

    
    document.documentElement.style.setProperty('--primary_color', themeC);
    if (themeC === "#967BB6") {
      localStorage.setItem('themeColor', "#967BB6")
    }
    
    if(!isHome && !isHome2){ 
        return (
            <FaAngleLeft className="back-btn" onClick={() => {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = "/";
                } 
            }} />
        )
    }
}

export default Back
