import React from 'react';
import {
  Crop,
  ZoomIn,
  ImagePlus,
  Replace,
  Image,
  FileCode2,
  FlipHorizontal,
  RotateCcw
} from 'lucide-react';

import CategoryShowcase from '@/components/CategoryShowcase';

interface ImageTool {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
}

const imageTools: ImageTool[] = [
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    description: 'Resize and compress images with preview',
    path: '/tools/image/image-resizer',
    icon: Replace,
  },
  {
    id: 'image-to-base64',
    title: 'Image to Base64',
    description: 'Convert images to base64 encoded strings',
    path: '/tools/image/image-to-base64',
    icon: FileCode2,
  },
  {
    id: 'image converter',
    title: 'Image Converter',
    description: 'Convert images between different formats',
    path: '/tools/image/ImageConverter',
    icon: Replace,
  },
  {
    id: 'image cropper',
    title: 'Image Cropper',
    description: 'Crop images to desired dimensions',
    path: '/tools/image/ImageCropper',
    icon: Crop,
  },
  {
    id: 'image enlarger',
    title: 'Image Enlarger',
    description: 'Enlarge images without losing quality',
    path: '/tools/image/ImageEnlarger',
    icon: ZoomIn,
  },
  {
    id: 'flip image',
    title: 'Flip Image',
    description: 'Flip images horizontally or vertically',
    path: '/tools/image/FlipImage',
    icon: FlipHorizontal,
  },
  {
    id: 'Jpg Converter',
    title: 'JPG Converter',
    description: 'Convert images to JPG format',
    path: '/tools/image/JPGConverter',
    icon: Image,
  },
  {
    id: 'Jpg to bmp',
    title: 'JPG to BMP',
    description: 'Convert JPG images to BMP format',
    path: '/tools/image/JPGtoBMP',
    icon: Image,
  },
  {
    id: 'Jpg to gif',
    title: 'JPG to GIF',
    description: 'Convert JPG images to GIF format',
    path: '/tools/image/JPGtoGIF',
    icon: Image,
  },
  {
    id: 'Jpg to ico',
    title: 'JPG to ico',
    description: 'Convert JPG images to ICO format',
    path: '/tools/image/JPGtoICO',
    icon: Image,
  },
  {
    id: 'Jpg to png',
    title: 'JPG to PNG',
    description: 'Convert JPG images to PNG format',
    path: '/tools/image/JPGtoPNG',
    icon: Image,
  },
  {
    id: 'Jpg to webp',
    title: 'JPG to WEBP',
    description: 'Convert JPG images to WebP format',
    path: '/tools/image/JPGtoWebP',
    icon: Image,
  },
  {
    id: 'png to bmp',
    title: 'PNG to BMP',
    description: 'Convert PNG images to BMP format',
    path: '/tools/image/PNGtoBMP',
    icon: Image,
  },
  {
    id: 'png to gif',
    title: 'PNG to GIF',
    description: 'Convert PNG images to GIF format',
    path: '/tools/image/PNGtoGIF',
    icon: Image,
  },
  {
    id: 'png to ico',
    title: 'PNG to ICO',
    description: 'Convert PNG images to ICO format',
    path: '/tools/image/PNGtoICO',
    icon: Image,
  },
  {
    id: 'png to jpg',
    title: 'PNG to JPG',
    description: 'Convert PNG images to JPG format',
    path: '/tools/image/PNGtoJPG',
    icon: Image,
  },
  {
    id: 'rotate image',
    title: 'Rotate Image',
    description: 'Rotate images by specified angles',
    path: '/tools/image/RotateImage',
    icon: RotateCcw,
  },
  {
    id: 'webp to jpg',
    title: 'WEBP to JPG',
    description: 'Convert WEBP images to JPG format',
    path: '/tools/image/WebPtoJPG',
    icon: Image,
  },
  {
    id: 'webp to png',
    title: 'WEBP to PNG',
    description: 'Convert WEBP images to PNG format',
    path: '/tools/image/WebPtoPNG',
    icon: Image,
  },
];

const ImagesIndex: React.FC = () => {
  return <CategoryShowcase categoryKey="image" tools={imageTools} />;
};

export default ImagesIndex;
