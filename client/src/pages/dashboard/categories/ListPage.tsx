import { ActionIcon, Button, Table, TableScrollContainer } from "@mantine/core";
import { useGetCategoriesQuery } from "../../../redux/categories/api";
import { useMemo } from "react";
import TableSearchField from "../../../components/TableSearchField";
import { useSearchParams } from "react-router-dom";
import TablePagination from "../../../components/TablePagination";

function ListPage() {
  const [searchParams] = useSearchParams();
  const { data: categoryData, isLoading } = useGetCategoriesQuery({
    searchParams: searchParams.toString(),
  } as any);

  const categories = useMemo(() => {
    if (categoryData) {
      return categoryData.records;
    }
  }, [categoryData]);

  const totalPages = useMemo(() => {
    if (categoryData) {
      return categoryData.total;
    }
  }, [categoryData]);

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
                <h4 className="card-title mb-0">Categories List</h4>
                <div className="d-flex align-items-center gap-3 ms-auto">
                  <TableSearchField />
                  <Button>New Category</Button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <TableScrollContainer minWidth={800}>
                <Table className="table table-hover align-middle mb-0">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Icon</Table.Th>
                      <Table.Th>Gigs</Table.Th>
                      <Table.Th>Orders</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {categories &&
                      categories.map((category) => (
                        <Table.Tr key={category._id}>
                          <Table.Td>{category.name}</Table.Td>
                          <Table.Td>
                            <i className={category.icon}></i>
                          </Table.Td>
                          <Table.Td>{0}</Table.Td>
                          <Table.Td>{0}</Table.Td>
                          <Table.Td>
                            <ActionIcon className="btn btn-ghost">
                              <i className="bi bi-pencil-square"></i>
                            </ActionIcon>
                            <ActionIcon className="btn btn-ghost">
                              <i className="bi bi-trash"></i>
                            </ActionIcon>
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
