import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Getplots = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const image_url = "http://collinsfungo.alwaysdata.net/static/images/";

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        "http://collinsfungo.alwaysdata.net/api/get_product_details"
      );
      // Ensure we get an array
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by category
  const filteredByCategory = selectedCategory
    ? products.filter((p) => {
        const cat =
          (p.category || p.category_name || p.product_category || "")
            .toString()
            .toLowerCase()
            .trim();
        return cat === selectedCategory.toLowerCase().trim();
      })
    : products;

  // Further filter by search term
  const filteredProducts = filteredByCategory.filter((p) =>
    p.product_name
      ? p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div>
      {/* CAROUSEL */}
      <div
        id="carouselExample"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/house.avif"
              className="d-block w-100"
              height="500"
              alt="slide1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/c2.jpg"
              className="d-block w-100"
              height="500"
              alt="slide2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/c3.jpg"
              className="d-block w-100"
              height="500"
              alt="slide3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* NAVBAR */}
      <Navbar bg="primary" expand="md" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>RealEstate plots</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Dropdown>
                <Dropdown.Toggle>plots available</Dropdown.Toggle>
                <Dropdown.Menu>
                  {[].map(
                    (cat) => (
                      <Dropdown.Item
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </Dropdown.Item>
                    )
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setSelectedCategory("")}>
                    All Products
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link>Offers</Nav.Link>
              <Nav.Link>New Arrivals</Nav.Link>
            </Nav>

            <Form className="d-flex me-3">
              <FormControl
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>

            <Link to="/addproduct" className="btn btn-dark">
              Add Product
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* PRODUCTS */}
      <Container>
        <h3 className="text-center mb-3">
          {selectedCategory
            ? `${selectedCategory} Products`
            : "All Products"}
        </h3>

        {error && <p className="text-danger text-center">{error}</p>}
        {loading && <p className="text-warning text-center">Loading products...</p>}

        {filteredProducts.length === 0 && !loading && (
          <h5 className="text-center text-muted mt-4">
            No products found.
          </h5>
        )}

        <div className="row">
          {filteredProducts.map((product, index) => (
            <div key={product.id || index} className="col-md-4">
              <div className="card m-2 shadow">
                <img
                  src={
                    product.product_photo
                      ? image_url + product.product_photo
                      : "/images/placeholder.png"
                  }
                  alt={product.product_name || "Product"}
                  height="200"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5>{product.product_name}</h5>
                  <p>{product.product_description}</p>
                  <p className="text-warning">
                    KES {product.product_cost || 0}
                  </p>
                  <button
                    className="btn btn-info w-100"
                    onClick={() => navigate("/mpesa", { state: { product } })}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )

  
}

export default Getplots