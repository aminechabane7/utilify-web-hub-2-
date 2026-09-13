import React, { useState, useCallback } from "react";
import { Box, Button, Typography, Paper, CircularProgress, Slider } from "@mui/material";
import Cropper, { type Area, type Point } from "react-easy-crop";

// Add a simple SVG crop icon component
const CropSvgIcon: React.FC<{ color?: string; style?: React.CSSProperties }> = ({ color = "#1976d2", style }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="12" y="12" width="24" height="24" stroke={color} strokeWidth="4" fill="none" />
    <line x1="12" y1="4" x2="12" y2="44" stroke={color} strokeWidth="4" />
    <line x1="4" y1="12" x2="44" y2="12" stroke={color} strokeWidth="4" />
  </svg>
);

function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const scale = image.naturalWidth / image.width;
      const cropX = crop.x * scale;
      const cropY = crop.y * scale;
      const cropWidth = crop.width * scale;
      const cropHeight = crop.height * scale;
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      if (ctx) {
        ctx.drawImage(
          image,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );
        resolve(canvas.toDataURL());
      } else {
        reject();
      }
    };
    image.onerror = reject;
  });
}

const aspectRatios = [
  { label: "مربع", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "حر", value: null }
];

const ImageCropper: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspect, setAspect] = useState<number | null>(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImgFile(file);
      setCroppedUrl(null);
      // Show preview
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target && typeof event.target.result === "string") {
          setImgPreview(event.target.result);
        }
      };
      reader.onerror = () => setError("تعذر قراءة الصورة.");
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixelsValue: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  }, []);

  const handleCrop = async () => {
    if (!imgPreview || !croppedAreaPixels) return;
    setLoading(true);
    setError(null);
    try {
      const cropped = await getCroppedImg(imgPreview, croppedAreaPixels);
      setCroppedUrl(cropped);
    } catch {
      setError("حدث خطأ أثناء قص الصورة.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
        <CropSvgIcon style={{ marginBottom: 8 }} />
        <Typography variant="h5" gutterBottom>
          Image Cropper
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          قص صورك إلى مربع بسهولة! يمكنك تحريك منطقة القص وتكبيرها فقط.
        </Typography>
        {/* Aspect ratio selector */}
        {imgPreview && !croppedUrl && (
          <Box sx={{ mb: 2 }}>
            {aspectRatios.map((ar) => (
              <Button
                key={ar.label}
                variant={aspect === ar.value ? "contained" : "outlined"}
                size="small"
                sx={{ mx: 0.5 }}
                onClick={() => setAspect(ar.value)}
              >
                {ar.label}
              </Button>
            ))}
          </Box>
        )}
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="crop-img-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="crop-img-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة
          </Button>
        </label>
        <br />
        {/* Show cropping UI */}
        {imgPreview && !croppedUrl && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 250,
              background: "#333",
              mb: 2,
              borderRadius: 2,
              overflow: "hidden"
            }}
          >
            <Cropper
              image={imgPreview}
              crop={crop}
              zoom={zoom}
              aspect={aspect || undefined}
              cropShape="rect"
              showGrid={true}
              restrictPosition={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption">تكبير/تصغير</Typography>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(_, v) => setZoom(Number(v))}
                sx={{ width: "80%", mx: "auto" }}
              />
            </Box>
          </Box>
        )}
        {imgPreview && !croppedUrl && (
          <Button
            variant="outlined"
            onClick={handleCrop}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            قص الصورة
          </Button>
        )}
        <br />
        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {croppedUrl && (
          <Box mt={2}>
            <img src={croppedUrl} alt="Cropped Preview" style={{ maxWidth: "100%" }} />
            <Button
              href={croppedUrl}
              download="cropped.png"
              variant="contained"
              color="success"
              sx={{ mt: 1 }}
            >
              تحميل الصورة
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ImageCropper;
