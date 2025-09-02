"use client";
import { useEffect, useState } from "react";

export default function LiveProducts() {
  const [liveProducts, setLiveProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products/live")
      .then((res) => res.json())
      .then((data) => {
        setLiveProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching live products:", err);
        setLiveProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent mx-auto mb-4"></div>
      <p className="text-gray-600">Loading live products...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">🌐 Live Products</h1>
          <p className="text-2xl text-gray-700 font-semibold">Products visible to your website visitors</p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {liveProducts.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl shadow-xl">
            <div className="text-8xl mb-6">😴</div>
            <p className="text-3xl font-bold text-gray-600 mb-2">No published products available</p>
            <p className="text-xl text-gray-500">Publish some products from the CMS to see them here!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {liveProducts.map((product) => (
              <div key={product.product_id} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-bold bg-green-200 text-green-900">
                    ✅ LIVE
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.product_name}</h2>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">{product.product_desc}</p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Currently visible to visitors
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg"
          >
            ← Back to CMS Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}