import { KeyRound, Link2, Package, UserRoundSearch, Workflow } from "lucide-react";
import CategoryShowcase from "@/components/CategoryShowcase";

const miscellaneousTools = [
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate secure random passwords with configurable character options.",
    path: "/tools/misc/password-generator",
    icon: KeyRound,
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    description: "Generate UUID v4 values directly in your browser.",
    path: "/tools/misc/uuid-generator",
    icon: Workflow,
  },
  {
    id: "facebook-id-finder",
    title: "Facebook ID Finder",
    description: "Extract a numeric Facebook ID from a supported profile or post URL.",
    path: "/tools/misc/facebook-id-finder",
    icon: UserRoundSearch,
  },
  {
    id: "utm-builder",
    title: "UTM Builder",
    description: "Create campaign tracking URLs with validated UTM parameters.",
    path: "/tools/misc/utm-builder",
    icon: Link2,
  },
];

const MiscellaneousToolsIndex = () => <CategoryShowcase categoryKey="misc" tools={miscellaneousTools} />;

export default MiscellaneousToolsIndex;
