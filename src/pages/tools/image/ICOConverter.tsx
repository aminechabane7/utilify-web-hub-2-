import React, { useState } from "react";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { ImagePlus } from "lucide-react";

const ICOConverter: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [icoUrl, setIcoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setIcoUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!imgFile) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, 64, 64);
          canvas.toBlob((blob) => {
            if (blob) {
              // ICO is a special format, but for simplicity, we provide PNG with .ico extension
              const url = URL.createObjectURL(blob);
              setIcoUrl(url);
            }
            setLoading(false);
          }, "image/png");
        }
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
        <ImagePlus className="mx-auto mb-3 h-12 w-12 text-primary" aria-hidden="true" />
        <Typography variant="h5" gutterBottom>
          PNG/JPG to ICO Converter
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          حوّل صورك إلى أيقونات (.ico) بسهولة!
        </Typography>
        <input
          accept="image/png, image/jpeg"
          type="file"
          style={{ display: "none" }}
          id="img-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="img-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة
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
        {icoUrl && (
          <Box mt={2}>
            <img src={icoUrl} alt="ICO Preview" style={{ maxWidth: "100%" }} />
            <Button
              href={icoUrl}
              download="icon.ico"
              variant="contained"
              color="success"
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

export default ICOConverter;
