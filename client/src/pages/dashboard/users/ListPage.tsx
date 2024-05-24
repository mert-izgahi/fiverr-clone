import TableSearchField from "../../../components/TableSearchField";
import { ActionIcon, Avatar, Table, TableScrollContainer } from "@mantine/core";
import TablePagination from "../../../components/TablePagination";
import { Link, useSearchParams } from "react-router-dom";
import { useGetUsersQuery } from "../../../redux/users/api";
import { useMemo } from "react";

function ListPage() {
  const [searchParams] = useSearchParams();
  const { data: usersData, isLoading } = useGetUsersQuery({
    searchParams: searchParams.toString(),
  } as any);

  const users = useMemo(() => {
    if (usersData) {
      return usersData.records;
    }
  }, [usersData]);

  const totalPages = useMemo(() => {
    if (usersData) {
      return usersData.total;
    }
  }, [usersData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Users List</h4>
                <div className="d-flex align-items-center gap-3 ms-auto">
                  <TableSearchField />
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

                  <Table.Tbody>
                    {users?.map((user: any, index: number) => (
                      <Table.Tr key={user._id}>
                        <Table.Td>{user._id}</Table.Td>
                        <Table.Td>
                          <Avatar src={user?.imageUrl} />
                        </Table.Td>
                        <Table.Td>{user.firstName}</Table.Td>
                        <Table.Td>{user.lastName}</Table.Td>
                        <Table.Td>{user.email}</Table.Td>
                        <Table.Td>{user.gender}</Table.Td>
                        <Table.Td>{0}</Table.Td>
                        <Table.Td>{0}</Table.Td>
                        <Table.Td>
                          <div className="d-flex">
                            <ActionIcon
                              component={Link}
                              to={`/dashboard/users/${user._id}`}
                              className="btn btn-ghost"
                            >
                              <i className="bi bi-pencil"></i>
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
        </div>
      </div>
    </div>
  );
}

export default ListPage;
