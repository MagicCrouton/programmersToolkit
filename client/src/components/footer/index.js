import React from 'react';
import './footer.css';

function Footer () {
  return (
    <div>
      <footer>
        <div className="footer-content">
          <div className="header">
            <h5>Created by the Pensive Garlic Bread crew for You.</h5>
          </div>
          <div className="links">
            <a href="https://github.com/MagicCrouton/programmersToolkit"><img src="https://logoeps.com/wp-content/uploads/2014/05/37318-github-logo-icon-vector-icon-vector-eps.png" alt="" height="30px" width="30px"></img></a>
          </div>
          <div className="copywrite">
            <p>Copywrite © 2023</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
