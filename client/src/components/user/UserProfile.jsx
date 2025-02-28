import React, { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AllUsersContextObj } from "../../contexts/AllUsersContext";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";

function UserProfile() {
  const { currentUser } = useContext(userAuthorContextObj);
  const { allUsers } = useContext(AllUsersContextObj);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (currentUser && allUsers) {
      const foundUser = allUsers.find(
        (userObj) => userObj.email === currentUser.email
      );
      if (foundUser && foundUser.isActive === false) {
        setIsBlocked(true);
      }
    }
  }, [currentUser, allUsers]);

  if (isBlocked) {
    return (
      <div className="alert alert-danger text-center fs-4">
        Your account is blocked. Please contact admin.
      </div>
    );
  }

  return (
    <div className="user-profile">
      <ul className="d-flex justify-content-around list-unstyled fs-3">
        <li className="nav-item">
          <NavLink to="articles" className="nav-link">
            Articles
          </NavLink>
        </li>
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
