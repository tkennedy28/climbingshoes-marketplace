import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function CreateListingForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    size: '',
    sizeUS: '',
    sizeEU: '',
    condition: '',
    type: '',
    gender: '',
    category: '',
    price: '',
    acceptsOffers: false,
    minimumOffer: '',
    autoAcceptPrice: '',
    description: '',
    location: '',
    shippingAvailable: false,
    shippingPrice: '',
    images: []
  });

  const [showOfferSettings, setShowOfferSettings] = useState(false);

  const brands = [
    'La Sportiva', 'Scarpa', 'Five Ten', 'Evolv', 'Black Diamond',
    'Butora', 'Mad Rock', 'Tenaya', 'Ocun', 'Red Chili', 'So iLL', 'Unparallel'
  ];

  const conditions = [
    { value: 'new', label: 'New with tags' },
    { value: 'likenew', label: 'Like New (worn 1-3x)' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
  ];

  const types = [
    { value: 'aggressive', label: 'Aggressive/Downturned' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'neutral', label: 'Neutral/Flat' },
  ];

  const categories = [
    'Sport Climbing', 'Bouldering', 'Traditional', 'All-Around', 'Approach'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Show offer settings when accepts offers is toggled
    if (name === 'acceptsOffers') {
      setShowOfferSettings(checked);
      if (!checked) {
        // Clear offer settings if disabled
        setFormData(prev => ({
          ...prev,
          minimumOffer: '',
          autoAcceptPrice: ''
        }));
      }
    }
  };

  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images: images
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.price || !formData.condition) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.acceptsOffers) {
      if (formData.minimumOffer && parseFloat(formData.minimumOffer) >= parseFloat(formData.price)) {
        alert('Minimum offer must be less than listing price');
        return;
      }
      if (formData.autoAcceptPrice && parseFloat(formData.autoAcceptPrice) > parseFloat(formData.price)) {
        alert('Auto-accept price cannot be higher than listing price');
        return;
      }
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Listing</h2>

      {/* Basic Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., La Sportiva Solution - Like New"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="e.g., Solution, Instinct VS"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              US Size *
            </label>
            <input
              type="text"
              name="sizeUS"
              value={formData.sizeUS}
              onChange={handleInputChange}
              placeholder="e.g., 9.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EU Size
            </label>
            <input
              type="text"
              name="sizeEU"
              value={formData.sizeEU}
              onChange={handleInputChange}
              placeholder="e.g., 42.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="">Select Condition</option>
              {conditions.map(condition => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Type</option>
              {types.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Gender</option>
              <option value="mens">Men's</option>
              <option value="womens">Women's</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing & Offers */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Pricing & Offers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                min="1"
                step="1"
              />
            </div>
          </div>
        </div>

        {/* Accept Offers Toggle */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptsOffers"
                name="acceptsOffers"
                checked={formData.acceptsOffers}
                onChange={handleInputChange}
                className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
              />
              <label htmlFor="acceptsOffers" className="ml-3">
                <span className="font-medium text-gray-900">Accept Offers</span>
                <p className="text-sm text-gray-600">Allow buyers to make offers on this listing</p>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Recommended
              </span>
              <span className="text-xs text-gray-500">
                Listings with offers get 2x more interest
              </span>
            </div>
          </div>

          {/* Offer Settings */}
          {showOfferSettings && (
            <div className="mt-4 pt-4 border-t border-amber-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Offer Settings (Optional)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Minimum Offer
                    <span className="text-xs text-gray-500 ml-1">(Hidden from buyers)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="minimumOffer"
                      value={formData.minimumOffer}
                      onChange={handleInputChange}
                      placeholder="No minimum"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min="1"
                      max={formData.price ? formData.price - 1 : undefined}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically decline offers below this amount
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Auto-Accept Price
                    <span className="text-xs text-gray-500 ml-1">(Hidden from buyers)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="autoAcceptPrice"
                      value={formData.autoAcceptPrice}
                      onChange={handleInputChange}
                      placeholder="No auto-accept"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min={formData.minimumOffer || 1}
                      max={formData.price}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically accept offers at or above this amount
                  </p>
                </div>
              </div>

              <div className="mt-3 p-3 bg-amber-100 rounded-lg">
                <p className="text-xs text-amber-800">
                  <strong>💡 Pro Tip:</strong> Set auto-accept at 90% of your asking price to capture serious buyers quickly.
                  Most successful offers are between 80-95% of listing price.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Description</h3>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={6}
          placeholder="Describe your climbing shoes in detail. Include:&#10;- How long you've owned them&#10;- Frequency of use (indoor/outdoor)&#10;- Any modifications or repairs&#10;- Reason for selling&#10;- What type of climbing they're best for"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      {/* Photos */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Photos</h3>
        <ImageUpload 
          onImagesChange={handleImagesChange}
          maxImages={8}
        />
      </div>

      {/* Location & Shipping */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Location & Shipping</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="shippingAvailable"
                name="shippingAvailable"
                checked={formData.shippingAvailable}
                onChange={handleInputChange}
                className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <label htmlFor="shippingAvailable" className="ml-2 text-sm font-medium text-gray-700">
                Offer Shipping
              </label>
            </div>
            {formData.shippingAvailable && (
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="shippingPrice"
                  value={formData.shippingPrice}
                  onChange={handleInputChange}
                  placeholder="Shipping cost"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  min="0"
                  step="1"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-amber-700 text-white py-3 px-6 rounded-lg hover:bg-amber-800 font-medium transition"
        >
          Create Listing
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 font-medium transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}