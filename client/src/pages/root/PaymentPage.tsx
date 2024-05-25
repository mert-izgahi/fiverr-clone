import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useCreatePaymentIntentMutation } from "../../redux/utils/api";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51PKJNuRwI3h01LZSndEcXfJe19kvvpHoLpwElm5lhiOoTl6TPyQwcBJLkeYQR1vF4dqx3jK5yr3R7dbL3zqnGnDI00y7UGWs20"
);
function PaymentPage() {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [
    createPaymentIntent,
    { isLoading: createPaymentIntentPending, error: createPaymentIntentError },
  ] = useCreatePaymentIntentMutation();

  useEffect(() => {
    if (id) {
      createPaymentIntent({ gigId: id as string })
        .unwrap()
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }
  }, [id]);

  if (createPaymentIntentPending) {
    return <div>Loading...</div>;
  }

  if (createPaymentIntentError) {
    return <div>{createPaymentIntentError as string}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          {clientSecret && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                fetchClientSecret: async () => {
                  return clientSecret!;
                },
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
