import React from 'react'

const Mycarousel = () => {
  return (
    
     <div>
      <section className="row">
        <div className="col-md-12">
          {/* Carousel starts here */}
          <div
            className="carousel slide"
            id="mycarousel"
            data-bs-ride="carousel"
          >
            {/* Image wrapper */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="carousel/beach.avif"
                  alt="Slide 1"
                  className="d-block w-100"
                />
              </div>

              <div className="carousel-item">
                <img
                  src="carousel/house.avif"
                  alt="Slide 2"
                  className="d-block w-100"
                />
              </div>

              <div className="carousel-item">
                <img
                  src="carousel/land.avif"
                  alt="Slide 3"
                  className="d-block w-100"
                />
              </div>
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-danger"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-danger"></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mycarousel