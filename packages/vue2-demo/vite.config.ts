import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    {
      name: "alias-plugin",
      enforce: "pre",
      resolveId(id) {
        if (id.startsWith("@tdesign/common-js/")) {
          return path.resolve(
            __dirname,
            "../common",
            id.replace("@tdesign/common-js/", "")
          );
        }
        if (id === "@tdesign/common-js") {
          return path.resolve(__dirname, "../common");
        }
        return null;
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@tdesign/common-js": path.resolve(__dirname, "../common"),
      "@tdesign/common-style": path.resolve(
        __dirname,
        "./node_modules/tdesign-vue/esm/_common/style"
      ),
      "tdesign-vue/es/config-provider/hooks": path.resolve(
        __dirname,
        "../components/src/config-provider/hooks"
      ),
    },
  },
  optimizeDeps: {
    exclude: ["@tdesign/td-chat"],
    include: ["tdesign-vue", "vue"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
