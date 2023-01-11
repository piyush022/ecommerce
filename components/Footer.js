import Script from 'next/Script'

const Footer = () => {
  
    return ( <><>
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="footer_logo">
            <a href="index.html">
              <img src="images/footer-logo.png" />
            </a>
          </div>
          <div className="input_bt">
            <input
              type="text"
              className="mail_bt"
              placeholder="Your Email"
              name="Your Email"
            />
            <span className="subscribe_bt" id="basic-addon2">
              <a href="#">Subscribe</a>
            </span>
          </div>
          <div className="footer_menu">
            <ul>
              <li>
                <a href="#">Best Sellers</a>
              </li>
              <li>
                <a href="#">Gift Ideas</a>
              </li>
              <li>
                <a href="#">New Releases</a>
              </li>
              <li>
                <a href="#">Today's Deals</a>
              </li>
              <li>
                <a href="#">Customer Service</a>
              </li>
            </ul>
          </div>
          <div className="location_main">
            Help Line Number : <a href="#">+1 1800 1200 1200</a>
          </div>
        </div>
      </div>
      {/* footer section end */}
      {/* copyright section start */}
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            © 2020 All Rights Reserved. Design by{" "}
            <a href="https://html.design">Free html Templates</a>
          </p>
        </div>
      </div>
      <Script src="js/jquery.min.js"></Script>
      <Script src="js/popper.min.js"></Script>
      <Script src="js/bootstrap.bundle.min.js"></Script>
      <Script src="js/jquery-3.0.0.min.js"></Script>
      <Script src="js/plugin.js"></Script>
      <Script src="js/jquery.mCustomScrollbar.concat.min.js"></Script>
      <Script src="js/custom.js"></Script>
      
    </>
    
      </> );
}
 
export default Footer;