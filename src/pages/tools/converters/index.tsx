import type { ElementType } from "react";
import {
  ArrowLeftRight,
  Battery,
  Beaker,
  DollarSign,
  Gauge,
  HardDrive,
  Ruler,
  RotateCcw,
  Square,
  Thermometer,
  Weight,
  Wind,
  Zap,
  Clock,
} from "lucide-react";
import CategoryShowcase from "@/components/CategoryShowcase";

type ConverterTool = {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: ElementType;
};

const converterTools: ConverterTool[] = [
  { id: "length", title: "Length Converter", description: "Convert distance and length units, including meters, feet, and miles.", path: "/tools/converters/length-converter", icon: Ruler },
  { id: "area", title: "Area Converter", description: "Convert square meters, acres, hectares, and other area units.", path: "/tools/converters/area-converter", icon: Square },
  { id: "weight", title: "Weight Converter", description: "Convert kilograms, pounds, grams, ounces, and more.", path: "/tools/converters/weight-converter", icon: Weight },
  { id: "volume", title: "Volume Converter", description: "Convert liters, gallons, milliliters, cups, and other volume units.", path: "/tools/converters/volume-converter", icon: Beaker },
  { id: "temperature", title: "Temperature Converter", description: "Convert Celsius, Fahrenheit, Kelvin, and other temperature scales.", path: "/tools/converters/temperature-converter", icon: Thermometer },
  { id: "time", title: "Time Converter", description: "Convert seconds, minutes, hours, days, weeks, and years.", path: "/tools/converters/time-converter", icon: Clock },
  { id: "digital", title: "Digital Converter", description: "Convert bytes, kilobytes, megabytes, gigabytes, and more.", path: "/tools/converters/digital-converter", icon: HardDrive },
  { id: "speed", title: "Speed Converter", description: "Convert miles per hour, kilometers per hour, knots, and more.", path: "/tools/converters/speed-converter", icon: Gauge },
  { id: "pressure", title: "Pressure Converter", description: "Convert pascals, bar, PSI, atmospheres, and related units.", path: "/tools/converters/pressure-converter", icon: Wind },
  { id: "power", title: "Power Converter", description: "Convert watts, kilowatts, horsepower, and other power units.", path: "/tools/converters/power-converter", icon: Zap },
  { id: "energy", title: "Energy Converter", description: "Convert joules, calories, kilowatt-hours, and more.", path: "/tools/converters/energy-converter", icon: Battery },
  { id: "angle", title: "Angle Converter", description: "Convert degrees, radians, gradians, and angular measurements.", path: "/tools/converters/angle-converter", icon: RotateCcw },
  { id: "currency", title: "Currency Converter", description: "Convert between supported currencies using the tool's configured rates.", path: "/tools/converters/currency-converter", icon: DollarSign },
];

const ConvertersIndex = () => <CategoryShowcase categoryKey="converters" tools={converterTools} />;

export default ConvertersIndex;
