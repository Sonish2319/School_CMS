import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat is used to extend configurations that use the legacy format
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Use Next.js core-web-vitals configuration
  ...compat.extends("next/core-web-vitals"),
  // Additional rules or overrides
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-console": "warn",
      "react/react-in-jsx-scope": "off", // React 17+ JSX transform
      "@next/next/no-img-element": "off", // Example override for Next.js rules
    },
  },
];

export default eslintConfig;
