"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Draft");
  const [editingId, setEditingId] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError('Unable to connect to server');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submission (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      product_name: name,
      product_desc: desc,
      status,
      created_by: "admin",
    };

    try {
      if (editingId) {
        // UPDATE
        const res = await fetch(`http://localhost:5000/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...productData, updated_by: "admin" }),
        });

        if (res.ok) {
          alert("✏️ Product updated!");
          fetchProducts();
          setEditingId(null);
        } else {
          alert("❌ Failed to update product");
        }
      } else {
        // CREATE
        const res = await fetch("http://localhost:5000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        if (res.ok) {
          alert("✅ Product added!");
          fetchProducts();
        } else {
          alert("❌ Failed to add product");
        }
      }

      // Reset form
      setName("");
      setDesc("");
      setStatus("Draft");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Handle edit click
  const handleEdit = (p) => {
    setEditingId(p.product_id);
    setName(p.product_name);
    setDesc(p.product_desc);
    setStatus(p.status);
  };

  // Handle delete click
  const handleDelete = async (id) => {
    if (!confirm("🗑️ Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updated_by: "admin" }),
      });

      if (res.ok) {
        alert("🗑️ Product deleted!");
        fetchProducts();
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) return (
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">📦 Product CMS</h1>
            <p className="text-xl text-gray-700 font-medium">Manage your products with ease</p>
          </div>
          <a 
            href="/live" 
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🌐 View Live Products →
          </a>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Product Name</label>
              <input
                type="text"
                placeholder="Enter an amazing product name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-gray-900 font-medium text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Description</label>
              <textarea
                placeholder="Describe what makes this product special..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-gray-900 font-medium text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 resize-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-gray-900 font-medium text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
              >
                <option value="Draft">📝 Draft</option>
                <option value="Published">✅ Published</option>
                <option value="Archived">📦 Archived</option>
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg"
              >
                {editingId ? "🔄 Update Product" : "🚀 Add Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                    setDesc("");
                    setStatus("Draft");
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-4 px-8 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg"
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white">📋 Products ({products.length})</h2>
          </div>
          {error ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-2xl font-bold text-red-600">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-8xl mb-6">📦</div>
              <p className="text-2xl font-bold text-gray-600">No products yet!</p>
              <p className="text-lg text-gray-500 mt-2">Create your first product above</p>
            </div>
          ) : (
            <div className="divide-y-2 divide-gray-100">
              {products.map((p, index) => (
                <div key={p.product_id || index} className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.product_name}</h3>
                      <p className="text-lg text-gray-700 mb-4 leading-relaxed font-medium">{p.product_desc}</p>
                      <span className={`inline-flex items-center px-4 py-2 text-base font-bold rounded-full ${
                        p.status === 'Published' ? 'bg-green-200 text-green-900' :
                        p.status === 'Draft' ? 'bg-yellow-200 text-yellow-900' :
                        'bg-gray-200 text-gray-900'
                      }`}>
                        {p.status === 'Published' ? '✅' : p.status === 'Draft' ? '📝' : '📦'} {p.status}
                      </span>
                    </div>
                    <div className="flex gap-3 ml-6">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-5 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.product_id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold px-5 py-3 rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}