import React from 'react';
import { Globe } from 'lucide-react';
import CategoryShowcase from '@/components/CategoryShowcase';
interface Tool {
  id: string;
  title: string;
  description: string;
  path: string;
  implemented: boolean;
}

interface ToolCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  tools: Tool[];
}

const websiteTools: ToolCategory = {
  id: 'website',
  title: 'Website Tools',
  description: 'Tools for web development and management',
  icon: Globe,
  color: 'websiteTool',
  gradient: 'websiteTool-gradient',
  tools: [
    {
      id: 'html-minifier',
      title: 'HTML Minifier',
      description: 'Minify HTML code to reduce file size',
      path: '/tools/website/html-minifier',
      implemented: true,
    },
    {
      id: 'css-minifier',
      title: 'CSS Minifier',
      description: 'Minify CSS code to reduce file size',
      path: '/tools/website/css-minifier',
      implemented: true,
    },
    {
      id: 'html-decode',
      title: 'HTML Decode',
      description: 'Decode HTML entities to plain text',
      path: '/tools/website/html-decode',
      implemented: true,
    },
    {
      id: 'url-encoder',
      title: 'URL Encoder',
      description: 'Encode URLs to make them safe for transmission',
      path: '/tools/website/url-encoder',
      implemented: true,
    },
    {
      id: 'css-beautifier',
      title: 'CSS Beautifier',
      description: 'Beautify CSS code for better readability',
      path: '/tools/website/CSSBeautifier',
      implemented: true,
    },
    {
      id: 'QrCode Generator',
      title: 'QR Code Generator',
      description: 'Generate QR codes for URLs or text',
      path: '/tools/website/QRCodeGenerator',
      implemented: true,
    },
    {
      id: 'QrCode Decoder',
      title: 'QR Code Decoder',
      description: 'Decode QR codes from images',
      path: '/tools/website/QRCodeDecoder',
      implemented: true,
    },
    {
      id:'URLParser',
      title: 'URLParser',
      description: 'Parse and analyze URLs to extract components',
      path:'/tools/website/URLParser',
      implemented: true,
    },
     {
        id: 'javascript-minifier',
        title: 'JavaScript Minifier',
        description: 'Minify JavaScript code to reduce file size',
        path: '/tools/website/JavascriptMinifier',
        implemented: true,
      },
      {
        id:'javascript-beautifier',
        title: 'JavaScript Beautifier',
        description: 'Beautify and format JavaScript code for readability',
        path: '/tools/website/JavascriptBeautifier',
        implemented: true,
      },
      {
        id:'JavaScript-Obfuscator',
        title: 'JavaScript Obfuscator',
        description: 'Obfuscate JavaScript code to protect it from reverse engineering',
        path: '/tools/website/JavascriptObfuscator',
        implemented: true,
      },
      {
        id:'JavaScript-Deobfuscator',
        title: 'JavaScript Deobfuscator',
        description: 'Deobfuscate JavaScript code to make it readable',
        path: '/tools/website/JavascriptDeObfuscator',
        implemented: true,
      }
  ],
};

const WebsiteToolsIndex: React.FC = () => {
  return (
    <CategoryShowcase
      categoryKey="website"
      tools={websiteTools.tools.map((tool) => ({
        ...tool,
        icon: websiteTools.icon,
      }))}
    />
  );
};

export default WebsiteToolsIndex;
