import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Binary } from "lucide-react";

interface BinaryTool {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
}

const binaryTools: BinaryTool[] = [
  { id: "binary-to-hex", title: "Binary to Hex Converter", description: "Convert binary numbers to hexadecimal and vice versa", path: "/tools/binary/BinaryToHex", icon: Binary },
  { id: "binary-to-octal", title: "Binary to Octal Converter", description: "Convert binary numbers to octal and vice versa", path: "/tools/binary/BinaryToOctal", icon: Binary },
  { id: "binary-to-text", title: "Binary to Text Converter", description: "Convert binary numbers to text and vice versa", path: "/tools/binary/BinaryToText", icon: Binary },
  { id: "decimal-to-binary", title: "Decimal to Binary Converter", description: "Convert decimal numbers to binary and vice versa", path: "/tools/binary/DecimalToBinary", icon: Binary },
  { id: "decimal-to-hex", title: "Decimal to Hex Converter", description: "Convert decimal numbers to hexadecimal and vice versa", path: "/tools/binary/DecimalToHex", icon: Binary },
  { id: "decimal-to-octal", title: "Decimal to Octal Converter", description: "Convert decimal numbers to octal and vice versa", path: "/tools/binary/DecimalToOctal", icon: Binary },
  { id: "decimal-to-text", title: "Decimal to Text Converter", description: "Convert decimal numbers to text and vice versa", path: "/tools/binary/DecimalToText", icon: Binary },
  { id: "hex-to-binary", title: "Hex to Binary Converter", description: "Convert hexadecimal numbers to binary and vice versa", path: "/tools/binary/HexToBinary", icon: Binary },
  { id: "hex-to-decimal", title: "Hex to Decimal Converter", description: "Convert hexadecimal numbers to decimal and vice versa", path: "/tools/binary/HexToDecimal", icon: Binary },
  { id: "hex-to-octal", title: "Hex to Octal Converter", description: "Convert hexadecimal numbers to octal and vice versa", path: "/tools/binary/HexToOctal", icon: Binary },
  { id: "hex-to-text", title: "Hex to Text Converter", description: "Convert hexadecimal numbers to text and vice versa", path: "/tools/binary/HexToText", icon: Binary },
  { id: "octal-to-binary", title: "Octal to Binary Converter", description: "Convert octal numbers to binary and vice versa", path: "/tools/binary/OctalToBinary", icon: Binary },
  { id: "octal-to-decimal", title: "Octal to Decimal Converter", description: "Convert octal numbers to decimal and vice versa", path: "/tools/binary/OctalToDecimal", icon: Binary },
  { id: "octal-to-hex", title: "Octal to Hex Converter", description: "Convert octal numbers to hexadecimal and vice versa", path: "/tools/binary/OctalToHex", icon: Binary },
  { id: "octal-to-text", title: "Octal to Text Converter", description: "Convert octal numbers to text and vice versa", path: "/tools/binary/OctalToText", icon: Binary },
  { id: "text-to-binary", title: "Text to Binary Converter", description: "Convert text to binary and vice versa", path: "/tools/binary/TextToBinary", icon: Binary },
  { id: "text-to-decimal", title: "Text to Decimal Converter", description: "Convert text to decimal and vice versa", path: "/tools/binary/TextToDecimal", icon: Binary },
  { id: "text-to-hex", title: "Text to Hex Converter", description: "Convert text to hexadecimal and vice versa", path: "/tools/binary/TextToHex", icon: Binary },
  { id: "text-to-octal", title: "Text to Octal Converter", description: "Convert text to octal and vice versa", path: "/tools/binary/TextToOctal", icon: Binary },
];

// Group tools by direction for the editorial spread
const directional = [
  { key: "from", label: "From binary", tools: binaryTools.filter((t) => t.id.startsWith("binary-to-")) },
  { key: "from-dec", label: "From decimal", tools: binaryTools.filter((t) => t.id.startsWith("decimal-to-")) },
  { key: "from-hex", label: "From hex", tools: binaryTools.filter((t) => t.id.startsWith("hex-to-")) },
  { key: "from-oct", label: "From octal", tools: binaryTools.filter((t) => t.id.startsWith("octal-to-")) },
  { key: "from-text", label: "From text", tools: binaryTools.filter((t) => t.id.startsWith("text-to-")) },
];

const BinaryToolsIndex: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="grid grid-cols-12 gap-x-6 gap-y-8 border-b border-white/8 pb-12 md:gap-x-8 md:pb-16">
        <div className="col-span-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            <Link to="/tools" className="text-white/40 transition-colors hover:text-white">
              Tools
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-[#F2B84B]">Binary</span>
          </p>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            Binary conversion tools
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">
            A collection of tools to help with converting between binary, decimal, hex, octal, and
            text. Each tool works in both directions.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            <Link
              to="/tools"
              className="group inline-flex items-center gap-2 border border-white bg-white px-4 py-2.5 text-sm font-medium text-[#0b0d12] transition-colors duration-150 hover:bg-[#F2B84B] hover:border-[#F2B84B]"
            >
              All categories
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {String(binaryTools.length).padStart(2, "0")} tools · 5 number bases
            </span>
          </div>
        </div>

        <aside className="col-span-12 hidden border-l border-white/8 pl-8 pt-2 lg:col-span-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Snapshot</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-white/45">Tools available</dt>
              <dd className="mt-1 font-mono text-2xl tabular-nums text-white">
                {binaryTools.length}
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Directions</dt>
              <dd className="mt-1 text-white">Bidirectional</dd>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70">
                <Binary className="h-4 w-4" />
              </span>
              <span className="text-white/65">Binary tools</span>
            </div>
          </dl>
        </aside>
      </section>

      {/* Grouped list — by source base */}
      <section className="py-12 md:py-16">
        <header className="flex items-baseline justify-between border-b border-white/10 pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">Featured</p>
          <p className="font-mono text-[11px] tabular-nums text-white/30">
            {String(binaryTools.length).padStart(2, "0")} tools
          </p>
        </header>

        <div className="mt-10 space-y-12">
          {directional.map((group) => (
            <div key={group.key}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                {group.label}
              </h2>
              <ul className="mt-3 columns-1 gap-x-10 border-t border-white/8 pt-3 sm:columns-2 lg:columns-3">
                {group.tools.map((tool) => (
                  <li key={tool.id} className="mb-3 break-inside-avoid">
                    <Link
                      to={tool.path}
                      className="group flex items-baseline gap-2 text-sm text-white/70 transition-colors duration-150 hover:text-white"
                    >
                      <span className="font-mono text-[11px] text-white/30 group-hover:text-[#F2B84B]">
                        ↳
                      </span>
                      <span className="truncate">{tool.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Full editorial index */}
      <section className="border-t border-white/10 pt-12 md:pt-16">
        <header className="flex items-baseline justify-between border-b border-white/10 pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            § Complete index
          </p>
          <p className="font-mono text-[11px] tabular-nums text-white/30">
            {String(binaryTools.length).padStart(2, "0")} tools
          </p>
        </header>

        <ul className="mt-6 divide-y divide-white/8 border-y border-white/8">
          {binaryTools.map((tool, idx) => (
            <li key={tool.id}>
              <Link
                to={tool.path}
                className="group grid grid-cols-12 items-baseline gap-3 py-3 transition-colors duration-150 hover:bg-white/[0.015]"
              >
                <span className="col-span-2 font-mono text-[11px] tabular-nums text-white/30 group-hover:text-[#F2B84B] md:col-span-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 text-sm font-medium text-white md:col-span-4">
                  {tool.title}
                </span>
                <span className="col-span-12 text-sm text-white/50 md:col-span-6">
                  {tool.description}
                </span>
                <ArrowUpRight className="col-span-1 hidden h-4 w-4 justify-self-end text-white/30 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F2B84B] md:inline" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer nav */}
      <section className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/45">Looking for other categories?</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            to="/tools"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            All categories
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            About
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BinaryToolsIndex;
