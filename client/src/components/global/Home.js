import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../../stylesheets/home.css";

class Home extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    this.setState({
      user: this.props.user
    });
  };

  render() {
    console.log("HOME PROPS: ", this.props);
    return (
      <div className="Landingpage">
        {/*   <div className="BrandGem">Gem</div>
        

        <div className="BrandBox">Box</div> */}
        <svg
          className="Logo"
          width="200"
          height="144"
          viewBox="0 0 200 144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <path
            d="M57.4223 35.992V63.352C54.7983 64.888 51.4703 66.104 47.4383 67C43.4063 67.896 39.0223 68.344 34.2863 68.344C26.9263 68.344 20.7183 66.808 15.6623 63.736C10.6063 60.6 6.79825 56.44 4.23825 51.256C1.74225 46.072 0.49425 40.408 0.49425 34.264C0.49425 28.184 1.80625 22.584 4.43025 17.464C7.05425 12.28 10.9903 8.152 16.2383 5.08C21.5503 2.008 27.9503 0.471998 35.4383 0.471998C39.5343 0.471998 43.4063 1.112 47.0543 2.392C50.7663 3.608 53.9023 5.304 56.4623 7.48L52.9103 14.968C50.8623 13.112 48.3023 11.608 45.2303 10.456C42.1583 9.304 38.8943 8.72799 35.4383 8.72799C30.3823 8.72799 26.0303 9.848 22.3823 12.088C18.7983 14.328 16.0783 17.4 14.2223 21.304C12.3663 25.144 11.4383 29.496 11.4383 34.36C11.4383 39.288 12.3023 43.704 14.0303 47.608C15.8223 51.512 18.4143 54.584 21.8063 56.824C25.2623 59.064 29.4223 60.184 34.2863 60.184C38.7023 60.184 42.8943 59.704 46.8623 58.744V35.992H57.4223ZM115.108 59.032V67H74.0198V1.72H113.188V9.688H84.9638V28.504H109.348V36.472H84.9638V59.032H115.108ZM195.447 1.72V67H184.695V45.592L185.367 18.808L166.935 47.224H159.159L140.439 18.52L141.303 45.592V67H130.551V1.72H140.535L162.999 36.088L185.463 1.72H195.447Z"
            fill="#4BADB6"
          />
          <path
            d="M43.4545 109.536C48.1905 110.496 51.7745 112.448 54.2065 115.392C56.6385 118.272 57.8545 121.824 57.8545 126.048C57.8545 131.616 55.7425 136 51.5185 139.2C47.2945 142.4 41.1825 144 33.1825 144H10.2385V78.72H33.1825C40.2865 78.72 45.6945 80.128 49.4065 82.944C53.1185 85.76 54.9745 89.824 54.9745 95.136C54.9745 98.592 53.9825 101.6 51.9985 104.16C50.0785 106.72 47.2305 108.512 43.4545 109.536ZM21.1825 86.688V105.6H33.1825C36.6385 105.6 39.2945 104.8 41.1505 103.2C43.0705 101.536 44.0305 99.2 44.0305 96.192C44.0305 89.856 40.4145 86.688 33.1825 86.688H21.1825ZM33.1825 136.032C37.5345 136.032 40.8945 135.072 43.2625 133.152C45.6945 131.168 46.9105 128.384 46.9105 124.8C46.9105 121.024 45.7265 118.208 43.3585 116.352C41.0545 114.496 37.6625 113.568 33.1825 113.568H21.1825V136.032H33.1825ZM186.921 144L168.585 117.312L150.153 144H137.289L161.961 110.304L138.921 78.72H151.881L168.585 103.488L185.289 78.72H198.153L175.113 110.112L199.977 144H186.921Z"
            fill="#282727"
          />
          <rect x="65" y="72" width="70" height="72" fill="url(#pattern0)" />
          <defs>
            <filter
              id="filter0_b"
              x="-3.50574"
              y="-3.52802"
              width="202.953"
              height="75.872"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur"
                result="shape"
              />
            </filter>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1">
              <use
                xlinkHref="#image0"
                transform="translate(-0.0142857) scale(0.0205714 0.02)"
              />
            </pattern>
            <image
              id="image0"
              width="50"
              height="50"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAFK0lEQVRoge2aXYhVVRTHf3dGZyZTNC0rgiQ0pkgiLTWmJiPUSCSsQH2olKKyCSyo7Msg+yINKuslsHDMCiyjIi2yEgwaH/qiiSx7KEhKjdIa89Z83dPDWru975597j3nnnvvJPiHw5yz1tprr33O3vu/9roDx3AM/yuMA/4CoipfR4AJ9RrEWKC7BoMwV7f2UVOMAnY6nW6PsWsGPlCbH/SKVNYc02a747cLGF21qD00Ae9qR4f17wMBu0bgNdUfAFqBycAvKnsLGBFot0r1f2IH3VLVEQSC+1Lv53h2OWC96v4Apjm6qcDvqtuoti7mqu5zigc9slqDaABeUceHgBlAHiggi97FWuyibQ/4moX9mus83VhgEPgbmA78pnavIy8yE3LA89hPPgO4QJ93e7b3q7wPuKKEzznAP2p7n6f7VuXnA+chLy4CNjD0C6aCecN5YLbKbnOcGyxX2SCwOIHfq4ABbXO7I+9UWYc+t2G3ef8LJsZqddALzHfkG1V+qxdUAbglhf9l2mYQWKKyDvXd6di5X/ChFP4BeUuRBrjI032nuuleJ/em7QSZWmY6zkemVIRMMRcLgX7V3ZPU+Q3ImyoAN3q6cdgF2U78wk2DNdjpexl2IznBs7tW+y5gZ0MsyhmbLXI/cFDvXyDbQsypj0h97tf7uQHbUi/5P7ifb2WMzYMUpxNvEia3tGgENnu+V8XYlpr2iRfUVqejj4hPNypBE/Ce4/+dErbBjagdIbBaJYG1vo4A7Q3Il8jMnMOIRmQMANyM3TmmxbUA7sBOq1phB0OJ0sdULFHe5CtfVMX3xJ8HxmCz03MzBFsqwALQUyaG3RrDppBBC/CZGrxN/Jb6rNqsrzzeWJhtOI6XckgSGQFfIeejICZhs867Y2ymIFyTB06sLN4gxiMLt4CcYUJYic3CJ5dzuAAJdIAwKQFsI5y9ZoHJnrfG6C9FeK6A5HeJ8Cj2EHVaQD9P9T9TnYPPCGAv8Yx+Cvaw9Ugaxw1YctqFkJUPU4BIkraXwxL19Q1D1+ZI4GPVf0gFVDEeWzR4JqA3Z5CutI4D2KW+QseAdar7CTip0g5mYlOX6zzdKOzGMLPSDrCp+0HgeE+3GJvmt2XoA5AsOEII6BxPZ06Qwf08IV5WH2s8eSuWs5Zn8F+EDepwD8VEdTqyk/QR3hTK4VQk8RsAznDko5H1EiGFj6qhBSnTREiJxl2QW1S+ugK/D2MrJQY5bOmpmxKkVymmYKsadzrydpX9SrqCWjP2EHWxI79LZT3AWRniLYkFCCH1Y6sqAJ9q50tT+Fqmbb5wZG3INC0AV2cJNAkexx53zbpYGgiqHMzgr9fnkxGCjYDHqhJpGTQA72M5pAmZJvtUFqow+rgEmzm0IMxuiuM7qOP5aALwo3b8lMrM8XNLgvZvUHysflqf95KB9CrFLCxZLgIm6rO/lfqYhKyxXiSHWoisiT7gohrGWxKmfHoYIctN+ry2RJsn1eYlikmvo0SbuqATS5Zm7h9iaLoBwgnmp4XZWNJ7tR6BlsNxyG4VIXWuLuLTCpPufIKtY31NeNDDgjORH3YibJF7D8UZQA571jY2PcDZdY00Aa7EkuUBJNB5jv5ybAbQq7bX1DnGxDAFaVPc3ubozO+PZnE/UffoUqAR++usKYa3IlNvUC9DetWoGdcUE7Hn7wgpHz3nPO9D0vejAhciBGeql3m976c40z0qsIKhBecVwxpRBrj/JbFzmGPJhDFI9TBPHf6/pNZoJb4EWjX8C2RUC1duuJhSAAAAAElFTkSuQmCC"
            />
          </defs>
        </svg>

        <div className="Teaser">
          <div className="TeaserTextContainer">
            <div className="TeaserText">
              <p>Get inspired.</p>
              <p>Explore places.</p>
              <p>Share discoveries.</p>
            </div>
          </div>
        </div>
        <>
          <p>
            <a
              className="btn btn-primary btn-landingpage generalBtn-landing"
              href="/explore-places"
              role="button">
              Open the box
            </a>
          </p>

          {!this.state.user && (
            <div className="btn-signup-login">
              <p>
                <Link className="btn btn-link btn-lp " to="/Signup">
                  Join the community
                </Link>
              </p>
              <p>
                <Link className="btn btn-link btn-lp" to="/Login">
                  Login
                </Link>
              </p>
            </div>
          )}
        </>
        {this.state.message && (
          <Alert variant="danger">{this.state.message}</Alert>
        )}
      </div>
    );
  }
}

export default Home;
