import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Doanh nghiệp</h3>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Nghề nghiệp</a></li>
            <li><a href="#">For the Record</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Cộng đồng</h3>
          <ul>
            <li><a href="#">Dành cho nghệ sĩ</a></li>
            <li><a href="#">Nhà phát triển</a></li>
            <li><a href="#">Quảng cáo</a></li>
            <li><a href="#">Nhà đầu tư</a></li>
            <li><a href="#">Nhà cung cấp</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Liên kết hữu ích</h3>
          <ul>
            <li><a href="#">Hỗ trợ</a></li>
            <li><a href="#">Ứng dụng di động miễn phí</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Gói Harmonia</h3>
          <ul>
            <li><a href="#">Premium Individual</a></li>
            <li><a href="#">Premium Duo</a></li>
            <li><a href="#">Premium Family</a></li>
            <li><a href="#">Premium Student</a></li>
            <li><a href="#">Harmonia Free</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div>
          <p>© 2025 Harmonia AB</p>
        </div>
        <div className="social-links">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Youtube">
            <FaYoutube />
          </a>
          <a href="#" aria-label="TikTok">
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
}
