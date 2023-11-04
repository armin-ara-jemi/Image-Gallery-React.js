import React, { useState } from 'react';
import './App.css'

const ImageGallery = () => {
  const [images, setImages] = useState([
    { id: 1, src: 'image-1.webp', isFeatured: true, isSelected: false },
    { id: 2, src: 'image-2.webp', isFeatured: false, isSelected: false },
    { id: 3, src: 'image-3.webp', isFeatured: false, isSelected: false },
    { id: 4, src: 'image-4.webp', isFeatured: false, isSelected: false },
    { id: 5, src: 'image-5.webp', isFeatured: false, isSelected: false },
    { id: 6, src: 'image-6.webp', isFeatured: false, isSelected: false },
    { id: 7, src: 'image-7.webp', isFeatured: false, isSelected: false },
    { id: 8, src: 'image-8.webp', isFeatured: false, isSelected: false },
    { id: 9, src: 'image-9.webp', isFeatured: false, isSelected: false },
    { id: 10, src: 'image-10.jpeg', isFeatured: false, isSelected: false },
    { id: 11, src: 'image-11.jpeg', isFeatured: false, isSelected: false },
  ]);

  const handleFeatureClick = (image) => {
    const updatedImages = images.map((img) => {
      img.isFeatured = img.id === image.id;
      return img;
    });
    setImages(updatedImages);
  };

  const handleImageClick = (image) => {
    const updatedImages = images.map((img) => {
      if (img.id === image.id) {
        img.isSelected = !img.isSelected;
      }
      return img;
    });
    setImages(updatedImages);
  };

  const handleDelete = () => {
    const updatedImages = images.filter((img) => !img.isSelected);
    setImages(updatedImages);
  };

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData('text/plain', image.id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImage) => {
    const draggedImageId = parseInt(e.dataTransfer.getData('text/plain'));
    const updatedImages = [...images];
    const draggedImage = updatedImages.find((img) => img.id === draggedImageId);
    const targetIndex = updatedImages.indexOf(targetImage);
    updatedImages.splice(targetIndex, 0, draggedImage);
    updatedImages.splice(
      updatedImages.indexOf(
        updatedImages.find((img) => img.id === draggedImageId)
      ),
      1
    );
    setImages(updatedImages);
  };

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <div
          key={image.id}
          className={`image ${image.isFeatured ? 'featured' : ''} ${
            image.isSelected ? 'selected' : ''
          }`}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, image)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, image)}
          onClick={() => handleImageClick(image)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleFeatureClick(image);
          }}
        > <input type="checkbox" id="myCheckbox1" />
          <img src={image.src} alt={`Image ${image.id}`} />
          
        </div>
      ))}
      <button className="delete-button" onClick={handleDelete}>
        Delete Selected
      </button>
    </div>
  );
};

export default ImageGallery;
