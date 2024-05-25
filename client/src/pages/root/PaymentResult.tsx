import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCheckPaymentIntentStatusQuery } from "../../redux/utils/api";
import { useCreateOrderMutation } from "../../redux/orders/api";
import { Button } from "@mantine/core";

function PaymentResult() {
  const [searchParams] = useSearchParams();

  const sessionId = useMemo(() => {
    return searchParams.get("session_id");
  }, [searchParams]);
  const gigId = useMemo(() => {
    return searchParams.get("gigId");
  }, [searchParams]);

  const { data, isLoading, error } = useCheckPaymentIntentStatusQuery(
    {
      sessionId,
    } as any,
    {
      skip: !sessionId,
    }
  );

  const [
    createOrder,
    { isLoading: createOrderPending, error: createOrderError },
  ] = useCreateOrderMutation();

  const isCompleted = useMemo(() => {
    if (data) {
      return data.status === "complete";
    }
  }, [data]);

  const paymentIntentId = useMemo(() => {
    if (data) {
      return data.id;
    }
  }, [data]);

  const paymentStatus = useMemo(() => {
    if (data) {
      return data.status;
    }
  }, [data]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isCompleted) {
      if (gigId && paymentIntentId && paymentStatus) {
        createOrder({ gigId, paymentIntentId, paymentStatus })
          .unwrap()
          .then(() => {
            console.log("Order created successfully");

            setTimeout(() => {
              navigate("/orders");
            }, 5000);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    console.log("isCompleted", isCompleted);
  }, [isCompleted, gigId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error as string}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header border-0 bg-transparent">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Payment Result</h4>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">
                {isCompleted
                  ? "Payment completed successfully"
                  : "Payment failed"}
              </p>

              <p className="card-text">
                Payment Status: <b>{paymentStatus}</b>
              </p>

              <p className="card-text">
                Payment Intent Id: <b>{paymentIntentId}</b>
              </p>

              <p className="card-text">
                Gig Id: <b>{gigId}</b>
              </p>

              <p className="card-text">
                Session Id: <b>{sessionId}</b>
              </p>

              <Button
                disabled={createOrderPending}
                loading={createOrderPending}
                component={Link}
                to="/dashboard/orders"
              >
                Go to Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentResult;
