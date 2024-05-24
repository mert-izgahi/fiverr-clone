import React from "react";
import TableSearchField from "../../../components/TableSearchField";
import { Button, Table, TableScrollContainer } from "@mantine/core";
import TablePagination from "../../../components/TablePagination";
import { Link } from "react-router-dom";

function ListPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Gigs List</h4>
                <div className="d-flex align-items-center gap-3 ms-auto">
                  <TableSearchField />
                  <Button
                    component={Link}
                    to={"/dashboard/gigs/create"}
                    leftSection={<i className="bi bi-plus" />}
                  >
                    Create Gig
                  </Button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <TableScrollContainer minWidth={800}>
                <Table className="table table-hover align-middle mb-0">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>#</Table.Th>
                      <Table.Th>Image</Table.Th>
                      <Table.Th>First Name</Table.Th>
                      <Table.Th>Last Name</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Gender</Table.Th>
                      <Table.Th>Gigs</Table.Th>
                      <Table.Th>Orders</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                </Table>
              </TableScrollContainer>
            </div>

            <div className="card-footer">
              <TablePagination total={10!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
