import React, { useState } from "react";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { Image as ImageIcon } from "lucide-react";

const ICOToPNG: React.FC = () => {
  const [icoFile, setIcoFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcoFile(e.target.files[0]);
      setPngUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!icoFile) return;
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
          setPngUrl(canvas.toDataURL("image/png"));
        }
        setLoading(false);
      };
      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(icoFile);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
        <ImageIcon className="mx-auto mb-3 h-12 w-12 text-primary" aria-hidden="true" />
        <Typography variant="h5" gutterBottom>
          ICO to PNG Converter
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          حوّل ملفات الأيقونات (.ico) إلى صور PNG بسهولة!
        </Typography>
        <input
          accept=".ico"
          type="file"
          style={{ display: "none" }}
          id="ico-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="ico-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر ملف ICO
          </Button>
        </label>
        <br />
        {icoFile && (
          <Button
            variant="outlined"
            onClick={handleConvert}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            تحويل إلى PNG
          </Button>
        )}
        <br />
        {loading && <CircularProgress />}
        {pngUrl && (
          <Box mt={2}>
            <img src={pngUrl} alt="PNG Preview" style={{ maxWidth: "100%" }} />
            <Button
              href={pngUrl}
              download="converted.png"
              variant="contained"
              color="success"
              sx={{ mt: 1 }}
            >
              تحميل PNG
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ICOToPNG;
