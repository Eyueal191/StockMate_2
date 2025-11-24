import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from '../../../../axios/axios.config.js';
import toast, { Toaster } from 'react-hot-toast';

function EditCategory() {
  const [category, setCategory] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getCategoryById = async (id) => {
    setLoading(true);
    try {
      const res = await Axios.get(`/api/category/categories/${id}`);
      if (res.data.success) setCategory(res.data.category);
      else toast.error('Failed to fetch category.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getCategoryById(id);
  }, [id]);

  const handleChange = (e) => setCategory({ ...category, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.put(`/api/category/categories/${id}`, { name: category.name });
      if (res.data.success) {
        toast.success('Category updated successfully!');
        navigate('/dashboard/categories');
      } else toast.error('Failed to update category.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await Axios.delete(`/api/category/categories/${id}`);
      if (res.data.success) {
        toast.success('Category deleted successfully!');
        navigate('/dashboard/categories');
      } else toast.error('Failed to delete category.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-300 flex items-center justify-center p-4 sm:p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Edit Category
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 text-center">
          Update the category name or delete it if not needed.
        </p>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 w-full">
            <label className="text-gray-700 font-medium text-sm sm:text-base md:text-lg mb-2 md:mb-0 min-w-[120px]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={category.name || ''}
              onChange={handleChange}
              placeholder="Enter category name"
              required
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 shadow-sm w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 md:py-5 px-4 rounded-lg transition-shadow duration-200 shadow-sm hover:shadow-md text-sm sm:text-base md:text-lg w-full ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              disabled={loading}
              className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 sm:py-4 md:py-5 px-4 rounded-lg transition-shadow duration-200 shadow-sm hover:shadow-md text-sm sm:text-base md:text-lg w-full ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              Delete
            </button>
          </div>
        </form>

        {/* Custom Delete Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-sm w-full">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-2">
                Are you sure?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-6">
                This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 sm:py-3 rounded-lg transition-shadow duration-200 shadow-sm hover:shadow-md text-sm sm:text-base md:text-lg w-full ${
                    loading ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  className={`flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 sm:py-3 rounded-lg transition-shadow duration-200 shadow-sm hover:shadow-md text-sm sm:text-base md:text-lg w-full ${
                    loading ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditCategory;
