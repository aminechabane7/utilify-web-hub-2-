import React, { useState } from "react";
import { Box, Button, Typography, Paper, ToggleButtonGroup, ToggleButton, CircularProgress } from "@mui/material";

// Simple SVG ZoomIn icon
const ZoomInSvgIcon: React.FC<{ color?: string; style?: React.CSSProperties }> = ({ color = "#1976d2", style }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="22" cy="22" r="14" stroke={color} strokeWidth="4" fill="none" />
    <line x1="22" y1="16" x2="22" y2="28" stroke={color} strokeWidth="4" />
    <line x1="16" y1="22" x2="28" y2="22" stroke={color} strokeWidth="4" />
    <line x1="32" y1="32" x2="44" y2="44" stroke={color} strokeWidth="4" />
  </svg>
);

const scales = [
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
  { value: 4, label: "4x" },
];

const ImageEnlarger: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [enlargedUrl, setEnlargedUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(2);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setEnlargedUrl(null);
    }
  };

  const handleEnlarge = () => {
    if (!imgFile) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setEnlargedUrl(canvas.toDataURL());
        }
        setLoading(false);
      };
      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(imgFile);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
        <ZoomInSvgIcon style={{ fontSize: 48 }} />
        <Typography variant="h5" gutterBottom>
          Image Enlarger
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          قم بتكبير صورك بسهولة!
        </Typography>
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="enlarge-img-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="enlarge-img-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة
          </Button>
        </label>
        <br />
        <ToggleButtonGroup
          value={scale}
          exclusive
          onChange={(_, val) => val && setScale(val)}
          sx={{ mb: 2 }}
        >
          {scales.map((s) => (
            <ToggleButton key={s.value} value={s.value}>{s.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        <br />
        {imgFile && (
          <Button
            variant="outlined"
            onClick={handleEnlarge}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            تكبير الصورة
          </Button>
        )}
        <br />
        {loading && <CircularProgress />}
        {enlargedUrl && (
          <Box mt={2}>
            <img src={enlargedUrl} alt="Enlarged Preview" style={{ maxWidth: "100%" }} />
            <Button
              href={enlargedUrl}
              download="enlarged.png"
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

export default ImageEnlarger;
