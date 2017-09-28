import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.css';

const Footer = (props) => {

  return (
    <footer className="bg-gray">
      <section id="copyright" className="container grid-xl centered">
        <div className="columns">
          <div className="column col-md-12 col-8">
            <div className="r">
              <a href="mailto:feedback@ewolo.fitness">Contact</a>
              &nbsp;&#8226;&nbsp;<a href="https://github.com/victorparmar/easy-workout-log">Github</a>
            </div>
            <div className="r">
              Version {props.clientVersion}
              &nbsp;/ {window.SERVER_VERSION === '__SERVER_VERSION__'
                ? props.apiVersion
                : window.SERVER_VERSION}
            </div>
            <div className="r">
              By using this service you agree to the&nbsp;<Link to="/privacy">Privacy policy</Link>
              &nbsp;and&nbsp;<Link to="/terms">Terms of service</Link>.
            </div>

          </div>
          <div className="column col-md-12 col-4">
            <div className="r">
              <a href="https://www.facebook.com/ewolo.fitness" className="social-icon">
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
              </a>
              <a href="https://twitter.com/EwoloFitness" className="social-icon">
                <i className="fa fa-twitter-square" aria-hidden="true"></i>
              </a>
            </div>
            <div className="r">
              Built with&nbsp;<i className="fa fa-heart" aria-hidden="true"></i>&nbsp;by&nbsp;<a href="https://smalldata.tech">SmallData</a>.
            </div>
          </div>
        </div>

      </section>
    </footer>
  );

};

export default Footer;
