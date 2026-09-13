import { Braces, Code2, Regex } from "lucide-react";
import CategoryShowcase from "@/components/CategoryShowcase";

const developerTools = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, beautify, and copy JSON data in your browser.",
    path: "/tools/dev/json-formatter",
    icon: Braces,
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions with matches and flag controls.",
    path: "/tools/dev/regex-tester",
    icon: Regex,
  },
];

const DeveloperToolsIndex = () => <CategoryShowcase categoryKey="dev" tools={developerTools} />;

export default DeveloperToolsIndex;
