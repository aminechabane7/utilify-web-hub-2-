import React, { useState } from "react";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";

const WebPToJPG: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setConvertedUrl(null);
    }
  };

  const handleConvert = () => {
    if (!imgFile) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          setConvertedUrl(canvas.toDataURL("image/jpeg", 0.92));
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
        <Typography variant="h5" gutterBottom>
          WebP to JPG Converter
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          حوّل صور WebP إلى JPG بسهولة!
        </Typography>
        <input
          accept="image/webp"
          type="file"
          style={{ display: "none" }}
          id="webp-to-jpg-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="webp-to-jpg-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة WebP
          </Button>
        </label>
        <br />
        {imgFile && (
          <Button
            variant="outlined"
            onClick={handleConvert}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            تحويل إلى JPG
          </Button>
        )}
        <br />
        {loading && <CircularProgress />}
        {convertedUrl && (
          <Box sx={{ mt: 2 }}>
            <img src={convertedUrl} alt="Converted" style={{ maxWidth: "100%" }} />
            <Button
              href={convertedUrl}
              download="converted.jpg"
              variant="contained"
              sx={{ mt: 1 }}
            >
              تحميل JPG
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default WebPToJPG;
