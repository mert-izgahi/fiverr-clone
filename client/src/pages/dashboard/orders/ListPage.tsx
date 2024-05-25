import LoadingState from "../../../components/LoadingState";
import OrdersTable from "../../../components/OrdersTable";
import { useGetSellerOrdersQuery } from "../../../redux/orders/api";

function ListPage() {
  const { data: ordersData, isLoading, error } = useGetSellerOrdersQuery();
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <>{error}</>;
  }
  return (
    <div className="container-fluid">
      <OrdersTable
        orders={ordersData!.records}
        totalPages={ordersData!.total}
        isLoading={isLoading}
        tag="seller"
      />
    </div>
  );
}

export default ListPage;
