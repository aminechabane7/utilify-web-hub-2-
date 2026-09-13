import { lazy, Suspense, type ComponentType, type LazyExoticComponent, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import ToolDirectory from "@/pages/tools/index";
import { toolCategories } from "@/pages/tools";
import BinaryToolsIndex from "@/pages/tools/binary";
import CalculatorsIndex from "@/pages/tools/calculators";
import ConvertersIndex from "@/pages/tools/converters";
import DeveloperToolsIndex from "@/pages/tools/dev";
import ImagesIndex from "@/pages/tools/image";
import TextIndex from "@/pages/tools/text";
import WebsiteToolsIndex from "@/pages/tools/website";
import MiscellaneousToolsIndex from "@/pages/tools/misc";
import Store from "@/pages/Store";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

type ToolRoute = { path: string; Component: LazyExoticComponent<ComponentType> };
type ToolModule = { default: ComponentType };

const toSlug = (value: string) =>
  value
    .replace(/\.tsx$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const normalizeSegment = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

// Tool modules are lazy so opening one utility does not download every tool in the directory.
const toolModules = import.meta.glob<ToolModule>([
  "./pages/tools/**/*.tsx",
  "!./pages/tools/**/index.tsx",
]);

const moduleRoutes = Object.entries(toolModules)
  .map(([modulePath, loader]) => {
    const relativePath = modulePath.replace("./pages/tools/", "");
    const segments = relativePath.split("/");
    const filename = segments.pop();
    if (!filename || segments.length === 0) return null;

    return { path: `/tools/${segments.join("/")}/${toSlug(filename)}`, Component: lazy(loader) };
  })
  .filter((route): route is ToolRoute => route !== null)
  .sort((left, right) => left.path.localeCompare(right.path));

const modulePathSet = new Set(moduleRoutes.map(({ path }) => path));
const moduleLookup = new Map(
  moduleRoutes.map((route) => {
    const segments = route.path.split("/").filter(Boolean);
    return [`${segments.slice(0, -1).join("/")}|${normalizeSegment(segments.at(-1) ?? "")}`, route.Component] as const;
  }),
);

const legacyRoutes = Array.from(new Set(toolCategories.flatMap((category) => category.tools.map((tool) => tool.path))))
  .sort()
  .flatMap((path) => {
    if (modulePathSet.has(path)) return [];
    const segments = path.split("/").filter(Boolean);
    if (segments.length < 3 || segments[0] !== "tools") return [];
    const lookupKey = `${segments.slice(0, -1).join("/")}|${normalizeSegment(segments.at(-1) ?? "")}`;
    const Component = moduleLookup.get(lookupKey);
    return Component ? [{ path, Component }] : [];
  });

const toolRoutes = [...moduleRoutes, ...legacyRoutes];
const LoadingRoute = () => <div className="py-16 text-center text-sm text-muted-foreground">Loading tool…</div>;
const withLayout = (content: ReactNode) => <Layout>{content}</Layout>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteErrorBoundary>
          <Routes>
            <Route path="/" element={withLayout(<Index />)} />
            <Route path="/about" element={withLayout(<About />)} />
            <Route path="/store" element={withLayout(<Store />)} />
            <Route path="/tools" element={withLayout(<ToolDirectory />)} />
            <Route path="/tools/binary" element={withLayout(<BinaryToolsIndex />)} />
            <Route path="/tools/calculators" element={withLayout(<CalculatorsIndex />)} />
            <Route path="/tools/converters" element={withLayout(<ConvertersIndex />)} />
            <Route path="/tools/dev" element={withLayout(<DeveloperToolsIndex />)} />
            <Route path="/tools/image" element={withLayout(<ImagesIndex />)} />
            <Route path="/tools/text" element={withLayout(<TextIndex />)} />
            <Route path="/tools/website" element={withLayout(<WebsiteToolsIndex />)} />
            <Route path="/tools/misc" element={withLayout(<MiscellaneousToolsIndex />)} />
            {toolRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={withLayout(<Suspense fallback={<LoadingRoute />}><Component /></Suspense>)} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
