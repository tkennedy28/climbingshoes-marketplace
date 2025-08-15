import { useState, useRef } from 'react';

export default function ImageUpload({ 
  onImagesChange, 
  maxImages = 5, 
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
      const processedImages = [];
      
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

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        
        // In a real app, you'd upload to a service like AWS S3, Cloudinary, etc.
        // For now, we'll simulate an upload and use the preview URL
        const imageData = {
          id: Date.now() + Math.random(),
          file: file,
          url: previewUrl,
          name: file.name,
          size: file.size,
          uploaded: false // In real app, this would be true after successful upload
        };

        processedImages.push(imageData);
      }

      // Update images state
      const updatedImages = [...images, ...processedImages];
      setImages(updatedImages);
      
      // Notify parent component
      if (onImagesChange) {
        onImagesChange(updatedImages);
      }

    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    setImages(updatedImages);
    
    // Clean up object URL to prevent memory leaks
    const imageToRemove = images.find(img => img.id === imageId);
    if (imageToRemove && imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url);
    }

    if (onImagesChange) {
      onImagesChange(updatedImages);
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

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
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
        />
        
        {uploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-gray-600">Processing images...</span>
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Choose Images
              </button>
              <p className="mt-2 text-sm text-gray-600">
                or drag and drop images here
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSizeInMB}MB each
              </p>
              <p className="text-xs text-gray-500">
                Maximum {maxImages} images ({images.length}/{maxImages} uploaded)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
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
              
              {/* Remove Button */}
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image Info */}
              <div className="mt-2 text-xs text-gray-500">
                <p className="truncate">{image.name}</p>
                <p>{(image.size / (1024 * 1024)).toFixed(1)}MB</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Tips */}
      {images.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">📸 Photo Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Take photos in good lighting</li>
            <li>• Show the shoes from multiple angles</li>
            <li>• Include close-ups of any wear or damage</li>
            <li>• The first image will be your main listing photo</li>
            <li>• High-quality photos get more views!</li>
          </ul>
        </div>
      )}
    </div>
  );
}
    