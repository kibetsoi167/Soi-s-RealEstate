import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Capacitor } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';

const MakePayment = () => {
  const navigate = useNavigate();

  const APP_ID = "ca-app-pub-7212399669133407~2123650394";
  const AD_UNIT_ID = "ca-app-pub-7212399669133407/8621835477";

  useEffect(() => {
    const initAds = async () => {
      if (!Capacitor.isNativePlatform()) return;
      try {
        await AdMob.initialize({ appId: APP_ID });
        await AdMob.prepareInterstitial({ adUnitId: AD_UNIT_ID });
        await AdMob.addListener('interstitialAdShowed', () => {
          AdMob.prepareInterstitial({ adUnitId: AD_UNIT_ID });
        });
      } catch (e) { console.error("AdMob Error:", e); }
    };
    initAds();
  }, []);

  const img_url = "https://elijahfungo.alwaysdata.net/static/images/";
  const { product } = useLocation().state || {};

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!phone) {
      setError("Enter phone number");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("Processing payment...");

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.product_cost);

      const response = await axios.post(
        "https://elijahfungo.alwaysdata.net/api/mpesa_payment",
        data
      );

      setMessage(response.data.message || "Payment request sent to phone ✔");
      setPhone("");

      // Show ad after payment request
      if (Capacitor.isNativePlatform()) {
        try { await AdMob.showInterstitial(); } catch (e) {}
      }

      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setMessage("");
      setError(
        err.response?.data?.message || err.message || "Payment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <p className="text-center text-danger mt-5">
        No product selected
      </p>
    );
  }

  return (
    <div className="mpesa-page d-flex justify-content-center align-items-start min-vh-100 py-5">
      <div className="mpesa-card card shadow-lg p-4">

        {/* TITLE */}
        <h2 className="text-center mpesa-title">
          <img
            src="/images2/mpesa.jpg"
            alt="Mpesa"
            style={{ height: 35, marginRight: 10 }}
          />
          Lipa na Mpesa
        </h2>

        {message && (
          <p className="text-success text-center">{message}</p>
        )}
        {error && (
          <p className="text-danger text-center">{error}</p>
        )}

        {/* PRODUCT */}
        <div className="text-center mb-3">
          <img
            src={img_url + product.product_photo}
            alt={product.product_name}
            className="img-fluid rounded mpesa-product-img"
          />
        </div>

        <div className="text-center mb-4">
          <h5>{product.product_name}</h5>
          <p>{product.product_description}</p>
          <p className="product-cost">
            KSH {product.product_cost}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={submit}>
          <input
            type="tel"
            className="form-control mb-3 rounded-pill"
            placeholder="Enter phone number (+2547..)"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* PAY BUTTON */}
          <button
            type="submit"
            className="btn btn-mpesa w-100 rounded-pill mb-2"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {/* BACK BUTTON  */}
          <button
            type="button"
            className="btn btn-secondary w-100 rounded-pill"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </form>
      </div>

      <style>{`
        .mpesa-page {
          background: linear-gradient(135deg, #E0F7FA, #C8E6C9);
        }

        .mpesa-card {
          max-width: 500px;
          width: 100%;
          border-radius: 20px;
        }

        .mpesa-title {
          color: #4CAF50;
          font-weight: bold;
          font-size: 2rem;
        }

        .product-cost {
          font-weight: bold;
          color: #FF5722;
          font-size: 1.2rem;
        }

        .mpesa-product-img {
          max-height: 200px;
          object-fit: contain;
        }

        .btn-mpesa {
          background: linear-gradient(90deg, #4CAF50, #66BB6A);
          color: white;
          font-weight: bold;
        }

        .btn-mpesa:hover {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
};

export default MakePayment;