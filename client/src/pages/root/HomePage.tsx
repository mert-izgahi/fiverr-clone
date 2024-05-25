function HomePage() {
  return (
    <div>
      <header className="bg-primary mb-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 text-white">
              <div className="mb-5">
                <h1 className="display-1">FiverrClone</h1>
                <p className="lead">Full Functional Clone of Fiverr</p>
                <small className="text-white">Built By Mert izgahi</small>
              </div>
              <div className="mb-5">
                <p className="lead">
                  With this app you can create your own gigs, See other users
                  and create your own account. Buy and Sell gigs on the
                  platform.
                </p>
              </div>

              <div className="mb-5"></div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <img
                src="/assets/header-img.jpg"
                alt="header"
                className="img-fluid rounded-2"
                style={{ height: 375, width: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4">Top Gigs</h4>
              <div className="row row-cols-12 row-cols-md-3 row-cols-lg-3 g-4"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
