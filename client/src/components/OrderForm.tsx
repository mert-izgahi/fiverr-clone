import { Button } from "@mantine/core";
import { IGig } from "../types";
import { Link } from "react-router-dom";

function OrderForm({ gig }: { gig: IGig }) {
  return (
    <div className="card py-4 px-3">
      <div className="card-header border-0 bg-transparent">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">Order Gig</h4>
          <h6 className="card-title mb-0">${gig.price}</h6>
        </div>
      </div>

      <div className="card-body">
        <p className="card-text mb-0">{gig.description}</p>
        <p className="card-text mb-4">{gig.category.name}</p>
        <p className="card-text mb-0">
          <i className="bi bi-check text-success me-1 fs-4 align-middle"></i>
          {gig.deliveryDays} Days Delivery
        </p>
        {gig.features.map((feature) => (
          <p className="card-text mb-0" key={feature}>
            <i className="bi bi-check text-success me-1 fs-4 align-middle"></i>
            {feature}
          </p>
        ))}
      </div>

      <div className="card-footer border-0 bg-transparent">
        <div className="vstack gap-4">
          <Button
            component={Link}
            to={`/dashboard/gigs/${gig._id}/orders/create`}
            fullWidth
          >
            Continue
          </Button>

          <Button
            component={Link}
            to={`/dashboard/gigs/${gig._id}`}
            variant="outline"
            fullWidth
          >
            Contact Seller
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
