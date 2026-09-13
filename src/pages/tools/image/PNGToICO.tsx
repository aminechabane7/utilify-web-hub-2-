import React, { useState } from "react";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";

const PNGToICO: React.FC = () => {
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
        // ICOs are usually 32x32 or 64x64
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setConvertedUrl(canvas.toDataURL("image/png"));
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
          PNG to ICO Converter
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          حوّل صور PNG إلى ICO بسهولة!
        </Typography>
        <input
          accept="image/png"
          type="file"
          style={{ display: "none" }}
          id="png-to-ico-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="png-to-ico-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة PNG
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
            تحويل إلى ICO
          </Button>
        )}
        <br />
        {loading && <CircularProgress />}
        {convertedUrl && (
          <Box sx={{ mt: 2 }}>
            <img src={convertedUrl} alt="Converted" style={{ maxWidth: "100%" }} />
            <Button
              href={convertedUrl}
              download="converted.ico"
              variant="contained"
              sx={{ mt: 1 }}
            >
              تحميل ICO
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PNGToICO;
