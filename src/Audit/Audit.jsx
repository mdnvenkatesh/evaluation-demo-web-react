import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";

import { Navbar, Nav } from "react-bootstrap";
import Pagination from './Pagination';
import { useState, useEffect, useMemo } from "react";
import './Audit.css'

let PageSize = 10;
function Auditpage(props) {
  const { user, users } = props;

  useEffect(() => {
    props.getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => props.deleteUser(id);
  };
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users && users.items && users.items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

  console.log("printing", users, currentTableData);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/Home">Home</Link>
          </Nav.Link>
          <Nav.Link href="#features">Auditor</Nav.Link>
          <Nav.Link>
            <Link to="/login">Logout</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All login audit :</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <div>
            <table className="tableContainer">
              <tr>
                <th className="bigWidth">ID</th>
                <th className="smallWidth">Role</th>
                <th className="bigWidth">Date</th>
                <th className="smallWidth">First Name</th>
                <th className="smallWidth">Last Name</th>
                <th className="smallWidth">Other</th>
              </tr>
              {currentTableData && currentTableData.map((user, index) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.role}</td>
                  <td>{user.createdDate}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.deleting ? (
                    <em> - Deleting...</em>
                  ) : user.deleteError ? (
                    <span className="text-danger">
                      - ERROR: {user.deleteError}
                    </span>
                  ) : (
                    <span>
                      <a onClick={handleDeleteUser(user.id)}>Delete</a>
                    </span>
                  )}</td>
                </tr>
              ))}
            </table>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={users.items.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
