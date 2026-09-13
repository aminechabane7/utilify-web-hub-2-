import React, { useState } from "react";
import { Box, Button, Typography, Paper, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

const RotateImage: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [rotatedUrl, setRotatedUrl] = useState<string | null>(null);
  const [angle, setAngle] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setRotatedUrl(null);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
      setAngle(0);
    }
  };

  const handleRotate = (selectedAngle?: number) => {
    if (!imgFile) return;
    setLoading(true);
    const rotateAngle = typeof selectedAngle === "number" ? selectedAngle : angle;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const rad = (rotateAngle * Math.PI) / 180;
        // Adjust canvas size for rotation
        if (rotateAngle % 180 !== 0) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        if (ctx) {
          ctx.save();
          if (rotateAngle === 90) {
            ctx.translate(canvas.width, 0);
            ctx.rotate(rad);
          } else if (rotateAngle === 180) {
            ctx.translate(canvas.width, canvas.height);
            ctx.rotate(rad);
          } else if (rotateAngle === 270) {
            ctx.translate(0, canvas.height);
            ctx.rotate(rad);
          }
          // angle 0: no translation/rotation
          ctx.drawImage(img, 0, 0);
          ctx.restore();
          setRotatedUrl(canvas.toDataURL());
        }
        setLoading(false);
      };
      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(imgFile);
  };

  // عند تغيير الزاوية من القائمة، قم بالتدوير مباشرة
  const handleAngleChange = (e: SelectChangeEvent<number>) => {
    const newAngle = Number(e.target.value);
    setAngle(newAngle);
    handleRotate(newAngle);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
        <span style={{ fontSize: 48, marginRight: 8 }}>⟲</span>
        <span style={{ fontSize: 48, marginLeft: 8 }}>⟳</span>
        <Typography variant="h5" gutterBottom>
          Rotate Image Tool
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          قم بتدوير صورك لأي زاوية (0، 90، 180، 270 درجة)!
        </Typography>
        <FormControl sx={{ minWidth: 120, mb: 2 }}>
          <InputLabel id="angle-label">الزاوية</InputLabel>
          <Select
            labelId="angle-label"
            value={angle}
            label="الزاوية"
            onChange={handleAngleChange}
          >
            <MenuItem value={0}>0°</MenuItem>
            <MenuItem value={90}>90°</MenuItem>
            <MenuItem value={180}>180°</MenuItem>
            <MenuItem value={270}>270°</MenuItem>
          </Select>
        </FormControl>
        <br />
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="rotate-img-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="rotate-img-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة
          </Button>
        </label>
        <br />
        {/* عرض الزاوية الحالية */}
        <Typography variant="subtitle1" color="primary" mb={2}>
          الزاوية الحالية: {angle}°
        </Typography>
        {/* معاينة الصورة الأصلية ومعاينة الصورة بعد التدوير جنباً إلى جنب */}
        {(previewUrl || rotatedUrl) && (
          <Box mt={2} sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 2 }}>
            {previewUrl && (
              <Box>
                <Typography variant="caption" display="block" gutterBottom>
                  الصورة الأصلية
                </Typography>
                <img src={previewUrl} alt="Preview" style={{ maxWidth: 150, marginBottom: 8, border: "1px solid #eee", borderRadius: 4 }} />
              </Box>
            )}
            {rotatedUrl && (
              <Box>
                <Typography variant="caption" display="block" gutterBottom>
                  بعد التدوير
                </Typography>
                <img src={rotatedUrl} alt="Rotated Preview" style={{ maxWidth: 150, border: "1px solid #eee", borderRadius: 4 }} />
                <Button
                  href={rotatedUrl}
                  download="rotated.png"
                  variant="contained"
                  color="success"
                  sx={{ mt: 1, width: "100%" }}
                >
                  تحميل الصورة
                </Button>
              </Box>
            )}
          </Box>
        )}
        {loading && <CircularProgress />}
      </Paper>
    </Box>
  );
};

export default RotateImage;
