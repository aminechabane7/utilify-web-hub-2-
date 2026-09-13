import React from 'react';
import { 
  Type, 
  CaseSensitive, 
  Link2, 
  FileText, 
  CornerDownLeft, 
  Shuffle, 
  FileSignature, 
  ShieldAlert, 
  Repeat, 
  SortAsc,
  Split
} from 'lucide-react';
import CategoryShowcase from '@/components/CategoryShowcase';

interface ToolItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
}

const textTools: ToolItem[] = [
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count characters, words, sentences, and paragraphs',
    path: '/tools/text/word-counter',
    icon: Type,
  },
  {
    id: 'text-case-converter',
    title: 'Text Case Converter',
    description: 'Convert text between cases (upper, lower, title, etc.)',
    path: '/tools/text/text-case-converter',
    icon: CaseSensitive,
  },
  {
    id: 'text-to-slug',
    title: 'Text to Slug',
    description: 'Convert text to URL-friendly slugs',
    path: '/tools/text/text-to-slug',
    icon: Link2,
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs',
    path: '/tools/text/lorem-ipsum-generator',
    icon: FileText,
  },
  {
    id: 'remove-line-breaks',
    title: 'Remove Line Breaks',
    description: 'Remove or add line breaks in text',
    path: '/tools/text/remove-line-breaks',
    icon: CornerDownLeft,
  },
  {
    id: 'random-word-generator',
    title: 'Random Word Generator',
    description: 'Generate random words for creative writing',
    path: '/tools/text/random-word-generator',
    icon: Shuffle,
  },
  {
    id: 'terms-and-condition-generator',
    title: 'Terms and Condition Generator',
    description: 'Generate website terms and conditions text',
    path: '/tools/text/terms-and-condition-generator',
    icon: FileSignature,
  },
  {
    id: 'disclaimer-generator',
    title: 'Disclaimer Generator',
    description: 'Generate disclaimers for your website or app',
    path: '/tools/text/disclaimer-generator',
    icon: ShieldAlert,
  },
  {
    id: 'text-repeater',
    title: 'Text Repeater',
    description: 'Repeat text a specified number of times',
    path: '/tools/text/text-repeater',
    icon: Repeat,
  },
  {
    id: 'text-sorter',
    title: 'Text Sorter',
    description: 'Sort lines of text alphabetically or numerically',
    path: '/tools/text/sorter',
    icon: SortAsc,
  },
  {
    id: 'comma-separator',
    title: 'Comma Separator',
    description: 'Separate text with commas',
    path: '/tools/text/comma-separator',
    icon: Split,
  },
];

const TextToolsIndex: React.FC = () => {
  return <CategoryShowcase categoryKey="text" tools={textTools} />;
};

export default TextToolsIndex;
