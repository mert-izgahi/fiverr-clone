import { useMemo } from "react";
import { useGetBuyerOrdersQuery } from "../../redux/orders/api";
import OrdersTable from "../../components/OrdersTable";

function OrdersPage() {
  const { data, isLoading, error } = useGetBuyerOrdersQuery();
  const orders = useMemo(() => {
    if (data) {
      return data.records;
    }
  }, [data]);

  const totalPages = useMemo(() => {
    if (data) {
      return data.total;
    }
  }, [data]);
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <OrdersTable
            orders={orders!}
            totalPages={totalPages!}
            isLoading={isLoading}
            tag="buyer"
          />
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
