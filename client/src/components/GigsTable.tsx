import { Link, useSearchParams } from "react-router-dom";
import { IGig } from "../types";
import TableSearchField from "./TableSearchField";
import { ActionIcon, Button, Table, TableScrollContainer } from "@mantine/core";
import TablePagination from "./TablePagination";

function GigsTable({
  gigs,
  totalPages,
  isLoading,
}: {
  gigs: IGig[];
  totalPages: number;
  isLoading: boolean;
}) {
  return (
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
                <Table.Th>Cover</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Rating</Table.Th>
                <Table.Th>Orders</Table.Th>
                <Table.Th ta={"right"}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {gigs?.map((gig, index) => (
                <Table.Tr key={gig._id}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={gig.coverUrl}
                        alt={gig.title}
                        height={60}
                        width={80}
                        className="rounded img-thumbnail"
                      />
                    </div>
                  </Table.Td>
                  <Table.Td>{gig.title}</Table.Td>
                  <Table.Td>{gig.category}</Table.Td>
                  <Table.Td>{gig.price}</Table.Td>
                  <Table.Td>{gig.rating}</Table.Td>
                  <Table.Td>{0}</Table.Td>
                  <Table.Td>
                    <div className="d-flex gap-3 align-items-center justify-content-end">
                      <ActionIcon
                        component={Link}
                        to={`/dashboard/gigs/${gig._id}`}
                        className="btn btn-ghost"
                      >
                        <i className="bi bi-pencil"></i>
                      </ActionIcon>
                      <ActionIcon
                        component={Link}
                        to={`/gigs/${gig._id}`}
                        className="btn btn-ghost"
                      >
                        <i className="bi bi-eye"></i>
                      </ActionIcon>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </TableScrollContainer>
      </div>

      <div className="card-footer">
        <TablePagination total={totalPages!} />
      </div>
    </div>
  );
}

export default GigsTable;
