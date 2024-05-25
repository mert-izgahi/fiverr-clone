import { Image, Table } from "@mantine/core";
import { IOrder } from "../types";
import TablePagination from "./TablePagination";
import LoadingState from "./LoadingState";

function OrdersTable({
  orders,
  totalPages,
  isLoading,
  tag,
}: {
  orders: IOrder[];
  totalPages: number;
  isLoading: boolean;
  tag: "seller" | "buyer";
}) {
  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title mb-0">Orders</h4>
      </div>
      <div className="card-body">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Gig Cover</Table.Th>
              <Table.Th>Gig</Table.Th>
              <Table.Th>{tag === "buyer" ? "Seller" : "Buyer"}</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {orders.map((order) => (
              <Table.Tr key={order._id}>
                <Table.Td>{order._id}</Table.Td>
                <Table.Td>
                  <Image
                    src={order.gig.coverUrl}
                    alt={order.gig.title}
                    width={80}
                    height={80}
                    fit="cover"
                    radius="sm"
                  />
                </Table.Td>
                <Table.Td>{order.gig.title}</Table.Td>
                <Table.Td>
                  {tag === "buyer"
                    ? `${order.seller.firstName} ${order.seller.lastName}`
                    : `${order.buyer.firstName} ${order.buyer.lastName}`}
                </Table.Td>
                <Table.Td>{order.paymentStatus}</Table.Td>
                <Table.Td>${order.price}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>

      <div className="card-body">
        <TablePagination total={totalPages} />
      </div>
    </div>
  );
}

export default OrdersTable;
