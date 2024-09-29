// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// function NavBar() {
//   let location = useLocation();
//   React.useEffect(() => {
//     console.log(location.pathname);
//     // it will give us the pathname where we will click like "/" or "/about"
//   }, [location]);
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <a className="navbar-brand brandName" href="/">
//             The Everyday Exchange
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link
//                   className={`nav-link ${
//                     location.pathname == "/" ? "active" : ""
//                   }`}
//                   style={{ color: "black" }}
//                   aria-current="page"
//                   to="/"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   className={`nav-link ${
//                     location.pathname == "/blogs" ? "active" : ""
//                   }`}
//                   to="/login"
// style={{ color: "black" }}
//                 >
//                   Login
//                 </Link>
//               </li>
//             </ul> */}
//             <div className="navbar-nav me-auto mb-2 mb-lg-0 write">
//                 <i className="fa-regular fa-pen-to-square writeIcon"></i><span>write</span>
//             </div>
//             <form className="d-flex" role="search">
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <button className="btn publishButton" type="submit">
//                 Search
//               </button>
//             </form>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default NavBar;

import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  let location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
    // it will give us the pathname where we will click like "/" or "/about"
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Navbar Brand */}
          <a className="navbar-brand brandName" href="/">
            The Everyday Exchange
          </a>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar Content */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            {/* Keep items in a flex container to maintain responsiveness */}
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
            {/* You can add nav items here if needed */}
            {/* </ul> */}

            {/* Right-aligned content */}
            <div className="d-flex align-items-center">
              {/* Write Icon and Text */}
              <Link to="/write">
                <div className="navbar-nav me-3">
                  <i className="fa-regular fa-pen-to-square writeIcon"></i>
                  <span className="ms-1">write</span>
                </div>
              </Link>

              {/* Search Form */}
              <form className="d-flex w-100" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn publishButton" type="submit">
                  Search
                </button>
              </form>
              <div>
                <button className="btn publishButton mx-2" type="">
                  <Link to="/authorBlogs">
                  <i className="fa-solid fa-user"></i>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
