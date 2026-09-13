import React, { useState } from "react";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";

const FlipImage: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [rotatedUrl, setRotatedUrl] = useState<string | null>(null);
  const [angle, setAngle] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // اجعل handleRotateWithAngle داخل الكومبوننت ليستطيع الوصول للمتغيرات
  const handleRotateWithAngle = (nextAngle: number) => {
    if (!imgFile) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const rad = (nextAngle * Math.PI) / 180;
        if (nextAngle === 90 || nextAngle === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        if (ctx) {
          ctx.save();
          if (nextAngle === 90) {
            ctx.translate(canvas.width, 0);
            ctx.rotate(rad);
          } else if (nextAngle === 180) {
            ctx.translate(canvas.width, canvas.height);
            ctx.rotate(rad);
          } else if (nextAngle === 270) {
            ctx.translate(0, canvas.height);
            ctx.rotate(rad);
          }
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

  // عند تغيير الزاوية، اعمل تدوير مباشرةً على آخر صورة أصلية وليست الصورة المدورة
  const handleRotateButton = () => {
    const nextAngle = (angle + 90) % 360;
    setAngle(nextAngle);
    handleRotateWithAngle(nextAngle);
  };

  // عند اختيار صورة جديدة، اعمل تدوير للزاوية 0
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setRotatedUrl(null);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
      setAngle(0);
      // تدوير للصورة الأصلية (0 درجة)
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement("img");
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          if (ctx) {
            ctx.save();
            ctx.drawImage(img, 0, 0);
            ctx.restore();
            setRotatedUrl(canvas.toDataURL());
          }
        };
        if (event.target && typeof event.target.result === "string") {
          img.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
        <span style={{ fontSize: 48 }}>⟳</span>
        <Typography variant="h5" gutterBottom>
          أداة تدوير الصورة
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" mb={2}>
          قم بتدوير صورتك لأي زاوية (0، 90، 180، 270 درجة)!
        </Typography> */}
        {/* عرض الزاوية الحالية */}
        {/* <Typography variant="subtitle1" color="primary" mb={2}>
          الزاوية الحالية: {angle}°
        </Typography> */}
        <input
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          id="flip-img-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="flip-img-upload">
          <Button variant="contained" component="span" sx={{ mb: 2 }}>
            اختر صورة
          </Button>
        </label>
        <br />
        {/* زر تدوير الصورة مع كل الزوايا */}
        {imgFile && (
          <Button
            variant="outlined"
            onClick={handleRotateButton}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            تدوير الصورة ({angle}°)
          </Button>
        )}
        <br />
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

export default FlipImage;
