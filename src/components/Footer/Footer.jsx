import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../../assets/bidnest.png";

export default function App() {
  const themeColor = "#2f1c6a"; // Define your theme color
  const hoverColor = "#bb9ddf"; // Light purple for hover effect

  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span style={{ color: themeColor }}>
            Get connected with us on social networks:
          </span>
        </div>

        <div>
          <a
            href=""
            className="me-4"
            style={{ color: themeColor }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = themeColor)}
          >
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a
            href=""
            className="me-4"
            style={{ color: themeColor }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = themeColor)}
          >
            <MDBIcon fab icon="twitter" />
          </a>
          <a
            href=""
            className="me-4"
            style={{ color: themeColor }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = themeColor)}
          >
            <MDBIcon fab icon="google" />
          </a>
          <a
            href=""
            className="me-4"
            style={{ color: themeColor }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = themeColor)}
          >
            <MDBIcon fab icon="instagram" />
          </a>
          <a
            href=""
            className="me-4"
            style={{ color: themeColor }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = themeColor)}
          >
            <MDBIcon fab icon="linkedin" />
          </a>
          <a
            href=""
            className="me-4"
            style={{ color: themeColor }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = themeColor)}
          >
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: themeColor }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: "40px", width: "auto" }}
                />{" "}
                BIDNEST
              </h6>
              <p style={{ color: themeColor }}>
                BidNest is an online auction platform designed to revolutionize
                the way users buy and sell assets through a transparent, and
                competitive bidding process.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: themeColor }}
              >
                Projects
              </h6>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Open Bids
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Close Bids
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Purchasing Groups
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Participating Agencies
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Company
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Buyer Solutions
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Buyer Demo Request
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Catergories
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: themeColor }}
              >
                Useful links
              </h6>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Facebook
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Linkedin
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Twitter
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  style={{ color: themeColor }}
                  onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = themeColor)}
                >
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: themeColor }}
              >
                Contact
              </h6>
              <p style={{ color: themeColor }}>
                <MDBIcon icon="home" className="me-2" />
                173 E block Lahore, Pakistan
              </p>
              <p style={{ color: themeColor }}>
                <MDBIcon icon="envelope" className="me-3" />
                support@bidnest.com
              </p>
              <p style={{ color: themeColor }}>
                <MDBIcon icon="phone" className="me-3" />+92 3324421885
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: themeColor }}
      >
        © 2025 Copyright:
        <a
          className="text-reset fw-bold"
          href="#"
          style={{ color: themeColor }}
          onMouseEnter={(e) => (e.target.style.color = hoverColor)}
          onMouseLeave={(e) => (e.target.style.color = themeColor)}
        >
          bidnest.com
        </a>
      </div>
    </MDBFooter>
  );
}
