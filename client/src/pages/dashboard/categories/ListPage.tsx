import { ActionIcon, Button, Table, TableScrollContainer } from "@mantine/core";

const categories = [
  {
    id: 1,
    name: "Web Development",
    icon: <i className="bi bi-laptop"></i>,
  },
  {
    id: 2,
    name: "Mobile Development",
    icon: <i className="bi bi-mobile"></i>,
    gigs:120,
    orders:120,
  },
  {
    id: 3,
    name: "Design",
    icon: <i className="bi bi-palette"></i>,
    gigs:130,
    orders:130,
  },
  {
    id: 4,
    name: "Marketing",
    icon: <i className="bi bi-bar-chart"></i>,
    gigs:140,
    orders:140,
  },
  {
    id: 5,
    name: "Business",
    icon: <i className="bi bi-briefcase"></i>,
  },
];
function ListPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Categories List</h4>
                <Button>New Category</Button>
              </div>
            </div>
            <div className="card-body">
              <TableScrollContainer minWidth={800}>
                <Table>
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
                    {categories.map((category) => (
                      <Table.Tr key={category.id}>
                        <Table.Td>{category.name}</Table.Td>
                        <Table.Td>{category.icon}</Table.Td>
                        <Table.Td>{category.gigs}</Table.Td>
                        <Table.Td>{category.orders}</Table.Td>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
