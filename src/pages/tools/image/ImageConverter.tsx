import React, { useState } from "react";
import { Box, Button, Typography, Paper, ToggleButtonGroup, ToggleButton, CircularProgress } from "@mui/material";


const ImageConverter: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
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
          ctx.drawImage(img, 0, 0);
          setConvertedUrl(canvas.toDataURL(`image/${format}`));
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
          Image Converter
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          حوّل صورك بين PNG و JPG بسهولة!
        </Typography>
        <input
          accept="image/png, image/jpeg"
          type="file"
          style={{ display: "none" }}
          id="convert-img-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="convert-img-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة
          </Button>
        </label>
        <br />
        <ToggleButtonGroup
          value={format}
          exclusive
          onChange={(_, val) => val && setFormat(val)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="png">PNG</ToggleButton>
          <ToggleButton value="jpeg">JPG</ToggleButton>
        </ToggleButtonGroup>
        <br />
        {imgFile && (
          <Button
            variant="outlined"
            onClick={handleConvert}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            تحويل الصورة
          </Button>
        )}
        <br />
        {loading && <CircularProgress />}
        {convertedUrl && (
          <Box mt={2}>
            <img src={convertedUrl} alt="Converted Preview" style={{ maxWidth: "100%" }} />
            <Button
              href={convertedUrl}
              download={format === "png" ? "converted.png" : "converted.jpg"}
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

export default ImageConverter;
