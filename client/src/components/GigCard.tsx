import { Link } from "react-router-dom";
import { IGig } from "../types";

function GigCard({ gig }: { gig: IGig }) {
  return (
    <div className="card">
      <div className="card-header p-0 position-relative">
        <img src={gig.coverUrl} alt="" className="img-fluid rounded-0" />
        <div className="position-absolute top-0 start-0 m-3">
          <span className="badge bg-primary">{gig.category.name}</span>
        </div>
      </div>
      <div className="card-body">
        <Link to={`/gigs/${gig._id}`} className="card-title mb-0">{gig.title}</Link>
        <p className="card-text text-truncate">{gig.description}</p>
        <p className="card-text">${gig.price}</p>
      </div>
    </div>
  );
}

export default GigCard;
