import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateImage, thumbnailPresets } from './imageGenerator.js';
import '../../Styles/ThumbnailGenerator.css';

const ThumbnailGenerator = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [overlayText, setOverlayText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(48);
  const [textPosition, setTextPosition] = useState('center'); // 'top', 'center', 'bottom'
  const [textStyle, setTextStyle] = useState('normal'); // 'normal', 'bold', 'shadow'
  const [textBackground, setTextBackground] = useState('none'); // 'none', 'solid', 'gradient'
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageLayout, setImageLayout] = useState('side-by-side'); // 'side-by-side', 'overlay', 'collage'
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState('none');
  const [customPrompt, setCustomPrompt] = useState('');
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (generatedImage && (overlayText || uploadedImages.length > 0)) {
      const image = new Image();
      image.src = generatedImage;
      image.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = image.width;
        canvas.height = image.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw base image and compose with uploaded images
        ctx.drawImage(image, 0, 0);
        composeImages(ctx, canvas, image);
        
        // Draw text if present
        if (overlayText) {
          // Split text into lines
          const lines = overlayText.split('\n');
          const lineHeight = fontSize * 1.2;
          const totalHeight = lines.length * lineHeight;
          
          // Calculate vertical position based on selected position
          let startY;
          switch (textPosition) {
            case 'top':
              startY = fontSize;
              break;
            case 'bottom':
              startY = canvas.height - totalHeight - fontSize;
              break;
            default: // center
              startY = (canvas.height - totalHeight) / 2;
          }

          // Configure text style
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `${textStyle === 'bold' ? 'bold' : 'normal'} ${fontSize}px Arial`;
          
          // Draw each line of text
          lines.forEach((line, index) => {
            const y = startY + (index + 0.5) * lineHeight;
            const x = canvas.width / 2;

            // Draw text background if selected
            if (textBackground !== 'none') {
              const metrics = ctx.measureText(line);
              const padding = fontSize * 0.3;
              const bgHeight = fontSize * 1.2;
              
              if (textBackground === 'solid') {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(
                  x - metrics.width / 2 - padding,
                  y - bgHeight / 2,
                  metrics.width + padding * 2,
                  bgHeight
                );
              } else if (textBackground === 'gradient') {
                const gradient = ctx.createLinearGradient(
                  x - metrics.width / 2 - padding,
                  y,
                  x + metrics.width / 2 + padding,
                  y
                );
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                gradient.addColorStop(0.1, 'rgba(0, 0, 0, 0.8)');
                gradient.addColorStop(0.9, 'rgba(0, 0, 0, 0.8)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(
                  x - metrics.width / 2 - padding,
                  y - bgHeight / 2,
                  metrics.width + padding * 2,
                  bgHeight
                );
              }
            }

            // Draw text with style
            if (textStyle === 'shadow') {
              ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
              ctx.fillText(line, x + 2, y + 2); // Shadow
            }
            
            // Draw text outline
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = fontSize / 16;
            ctx.strokeText(line, x, y);
            
            // Draw main text
            ctx.fillStyle = textColor;
            ctx.fillText(line, x, y);
          });
        }
      };
    }
  }, [generatedImage, overlayText, textColor, fontSize, textPosition, textStyle, textBackground, uploadedImages, imageLayout]);

  const composeImages = (ctx, canvas, mainImage) => {
    if (!uploadedImages.length) return;

    const compositeOperation = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = 'source-over';

    switch (imageLayout) {
      case 'side-by-side':
        const totalWidth = canvas.width * (uploadedImages.length + 1);
        const individualWidth = totalWidth / (uploadedImages.length + 1);
        
        // Draw main image
        ctx.drawImage(mainImage, 0, 0, individualWidth, canvas.height);
        
        // Draw uploaded images
        uploadedImages.forEach((img, index) => {
          const image = new Image();
          image.src = img.url;
          const x = individualWidth * (index + 1);
          ctx.drawImage(image, x, 0, individualWidth, canvas.height);
        });
        break;

      case 'overlay':
        // Draw main image
        ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);
        
        // Draw uploaded images with opacity
        uploadedImages.forEach(img => {
          const image = new Image();
          image.src = img.url;
          ctx.globalAlpha = img.opacity;
          ctx.drawImage(
            image,
            img.position.x,
            img.position.y,
            canvas.width * img.scale,
            canvas.height * img.scale
          );
        });
        ctx.globalAlpha = 1;
        break;

      case 'collage':
        const gridSize = Math.ceil(Math.sqrt(uploadedImages.length + 1));
        const cellWidth = canvas.width / gridSize;
        const cellHeight = canvas.height / gridSize;
        
        // Draw main image in first cell
        ctx.drawImage(mainImage, 0, 0, cellWidth, cellHeight);
        
        // Draw uploaded images in grid
        uploadedImages.forEach((img, index) => {
          const image = new Image();
          image.src = img.url;
          const row = Math.floor((index + 1) / gridSize);
          const col = (index + 1) % gridSize;
          ctx.drawImage(image, col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
        break;
    }

    ctx.globalCompositeOperation = compositeOperation;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setGeneratedImage(null);
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err.message || 'Failed to generate image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, {
          url: e.target.result,
          name: file.name,
          position: { x: 0, y: 0 },
          scale: 1,
          opacity: 1
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    if (selectedImage === index) setSelectedImage(null);
  };

  const updateImageProperty = (index, property, value) => {
    setUploadedImages(prev => prev.map((img, i) => 
      i === index ? { ...img, [property]: value } : img
    ));
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'thumbnail.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handlePromptChange = (e) => {
    setCustomPrompt(e.target.value);
    const finalPrompt = selectedPreset !== 'none'
      ? `${thumbnailPresets[selectedPreset].prefix} ${e.target.value} ${thumbnailPresets[selectedPreset].suffix}`
      : e.target.value;
    setPrompt(finalPrompt);
  };

  const handlePresetChange = (e) => {
    const preset = e.target.value;
    setSelectedPreset(preset);
    if (preset !== 'none') {
      const finalPrompt = `${thumbnailPresets[preset].prefix} ${customPrompt} ${thumbnailPresets[preset].suffix}`;
      setPrompt(finalPrompt);
    } else {
      setPrompt(customPrompt);
    }
  };

  return (
    <div className="thumbnail-generator">
      <h1>YouTube Thumbnail Generator</h1>
      
      <div className="input-section">
        <div className="preset-section">
          <label>Thumbnail Style:</label>
          <select value={selectedPreset} onChange={handlePresetChange}>
            <option value="none">Custom Style</option>
            <option value="gaming">Gaming</option>
            <option value="tech">Tech Review</option>
            <option value="vlog">Vlog</option>
            <option value="tutorial">Tutorial</option>
            <option value="reaction">Reaction</option>
          </select>
          {selectedPreset !== 'none' && (
            <div className="preset-info">
              Using {thumbnailPresets[selectedPreset].style} style
            </div>
          )}
        </div>

        <textarea
          value={customPrompt}
          onChange={handlePromptChange}
          placeholder={`Describe your thumbnail (e.g., "excited person holding a new iPhone" or "dramatic gaming battle scene with explosions")`}
          rows={4}
        />
        
        <textarea
          value={overlayText}
          onChange={(e) => setOverlayText(e.target.value)}
          placeholder="Enter text to overlay on the image..."
          rows={2}
        />
        
        <div className="text-controls">
          <div className="control-group">
            <label>Text Position:</label>
            <select value={textPosition} onChange={(e) => setTextPosition(e.target.value)}>
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>

          <div className="control-group">
            <label>Text Style:</label>
            <select value={textStyle} onChange={(e) => setTextStyle(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="shadow">Shadow</option>
            </select>
          </div>

          <div className="control-group">
            <label>Background:</label>
            <select value={textBackground} onChange={(e) => setTextBackground(e.target.value)}>
              <option value="none">None</option>
              <option value="solid">Solid</option>
              <option value="gradient">Gradient</option>
            </select>
          </div>

          <div className="control-group">
            <label>Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          
          <div className="control-group">
            <label>Font Size:</label>
            <input
              type="range"
              min="20"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
            <span>{fontSize}px</span>
          </div>
        </div>

        <div className="image-upload-section">
          <h3>Additional Images</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button onClick={() => fileInputRef.current.click()}>
            Upload Images
          </button>
          
          <div className="layout-controls">
            <label>Layout:</label>
            <select value={imageLayout} onChange={(e) => setImageLayout(e.target.value)}>
              <option value="side-by-side">Side by Side</option>
              <option value="overlay">Overlay</option>
              <option value="collage">Collage</option>
            </select>
          </div>

          {uploadedImages.length > 0 && (
            <div className="uploaded-images">
              {uploadedImages.map((img, index) => (
                <div key={index} className="uploaded-image-item">
                  <img src={img.url} alt={`Uploaded ${index + 1}`} />
                  <div className="image-controls">
                    {imageLayout === 'overlay' && (
                      <>
                        <label>Opacity:</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={img.opacity}
                          onChange={(e) => updateImageProperty(index, 'opacity', parseFloat(e.target.value))}
                        />
                        <label>Scale:</label>
                        <input
                          type="range"
                          min="0.1"
                          max="2"
                          step="0.1"
                          value={img.scale}
                          onChange={(e) => updateImageProperty(index, 'scale', parseFloat(e.target.value))}
                        />
                      </>
                    )}
                    <button onClick={() => removeUploadedImage(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Thumbnail'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="result-section">
        {generatedImage && (
          <>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
            <button onClick={handleDownload} className="download-button">
              Download Thumbnail
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ThumbnailGenerator;
