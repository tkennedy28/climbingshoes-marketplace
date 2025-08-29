import { useState, useRef } from 'react';

export default function ImageUpload({ 
  onImagesChange, 
  maxImages = 8,  // Increased to 8 for climbing shoes
  maxSizeInMB = 10,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
}) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    
    // Check if adding these files would exceed max limit
    if (images.length + fileArray.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      const validFiles = [];
      
      for (const file of fileArray) {
        // Validate file type
        if (!acceptedTypes.includes(file.type)) {
          alert(`File ${file.name} is not a supported image type`);
          continue;
        }

        // Validate file size
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > maxSizeInMB) {
          alert(`File ${file.name} is too large. Maximum size is ${maxSizeInMB}MB`);
          continue;
        }

        formData.append('images', file);
        validFiles.push(file);
      }

      if (validFiles.length === 0) {
        setUploading(false);
        return;
      }

      // Get the API URL - check if it's defined
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      // Upload to Cloudinary via your backend
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (data.success && data.images) {
        // Process the uploaded images
        const processedImages = data.images.map((img, index) => ({
          id: Date.now() + index + Math.random(),
          url: img.url,
          publicId: img.publicId,
          name: validFiles[index]?.name || `Image ${index + 1}`,
          size: validFiles[index]?.size || 0,
          uploaded: true
        }));

        // Update images state
        const updatedImages = [...images, ...processedImages];
        setImages(updatedImages);
        
        // Notify parent component
        if (onImagesChange) {
          onImagesChange(updatedImages);
        }
      } else {
        throw new Error(data.error || 'Upload failed');
      }

    } catch (error) {
      console.error('Error uploading images:', error);
      alert(`Error uploading images: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (imageId, publicId) => {
    try {
      // If the image was uploaded to Cloudinary, delete it
      if (publicId) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/upload/${publicId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          console.error('Failed to delete image from Cloudinary');
        }
      }

      // Remove from local state
      const updatedImages = images.filter(img => img.id !== imageId);
      setImages(updatedImages);
      
      // Clean up object URL if it's a local preview
      const imageToRemove = images.find(img => img.id === imageId);
      if (imageToRemove && imageToRemove.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      if (onImagesChange) {
        onImagesChange(updatedImages);
      }
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Failed to remove image. Please try again.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Function to move images up/down for reordering
  const moveImage = (index, direction) => {
    const newImages = [...images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < images.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setImages(newImages);
      
      if (onImagesChange) {
        onImagesChange(newImages);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={images.length >= maxImages}
        />
        
        {uploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-gray-600">Uploading to Cloudinary...</span>
          </div>
        ) : (
          <>
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-4">
              <button
                type="button"
                onClick={openFileDialog}
                disabled={images.length >= maxImages}
                className={`px-4 py-2 rounded-md ${
                  images.length >= maxImages 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Choose Images
              </button>
              <p className="mt-2 text-sm text-gray-600">
                or drag and drop images here
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSizeInMB}MB each
              </p>
              <p className={`text-xs ${images.length >= maxImages ? 'text-red-500' : 'text-gray-500'}`}>
                Maximum {maxImages} images ({images.length}/{maxImages} uploaded)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div>
          <div className="mb-2 text-sm text-gray-600">
            Drag images or use arrows to reorder. First image is the primary listing photo.
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Primary Image Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Primary
                  </div>
                )}
                
                {/* Upload Status */}
                {image.uploaded && (
                  <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    ✓ Uploaded
                  </div>
                )}
                
                {/* Reorder Buttons */}
                {images.length > 1 && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {index > 0 && (
                      <button
                        onClick={() => moveImage(index, 'up')}
                        className="bg-white text-gray-700 rounded p-1 shadow hover:bg-gray-100"
                        title="Move left"
                      >
                        ←
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        onClick={() => moveImage(index, 'down')}
                        className="bg-white text-gray-700 rounded p-1 shadow hover:bg-gray-100"
                        title="Move right"
                      >
                        →
                      </button>
                    )}
                  </div>
                )}
                
                {/* Remove Button */}
                <button
                  onClick={() => removeImage(image.id, image.publicId)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Image Info */}
                <div className="mt-2 text-xs text-gray-500">
                  <p className="truncate">{image.name}</p>
                  {image.size > 0 && (
                    <p>{(image.size / (1024 * 1024)).toFixed(1)}MB</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Tips */}
      {images.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">📸 Photo Tips for Climbing Shoes:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Show both shoes from side, top, and sole views</li>
            <li>• Include close-ups of toe box wear and heel condition</li>
            <li>• Photograph any unique features or damage</li>
            <li>• Use natural lighting for accurate colors</li>
            <li>• The first image will be your main listing photo</li>
            <li>• High-quality photos sell shoes faster!</li>
          </ul>
        </div>
      )}
    </div>
  );
}