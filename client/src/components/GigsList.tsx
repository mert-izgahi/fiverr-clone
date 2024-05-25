import React from "react";
import { IGig } from "../types";
import GigCard from "./GigCard";
import TablePagination from "./TablePagination";

function GigsList({
  gigs,
  totalPages,
  isLoading,
}: {
  gigs: IGig[];
  totalPages: number;
  isLoading: boolean;
}) {
  return (
    <div className="row mb-5">
      <div className="col-12">
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <div className="row row-cols-12 row-cols-md-3 row-cols-lg-4 g-3 mb-5">
            {gigs &&
              gigs.map((gig) => {
                return (
                  <div className="col" key={gig._id}>
                    <GigCard gig={gig} />
                  </div>
                );
              })}
          </div>
        )}
        <TablePagination total={totalPages!} />
      </div>
    </div>
  );
}

export default GigsList;
