import { type Component, type ParentComponent } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";
import { Navigation } from "~/components/Navigation";

export const Layout: ParentComponent = (props) => {
  const { effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";

  return (
    <div
      class="flex min-h-screen flex-col transition-colors duration-300"
      classList={{
        "bg-gray-50 text-gray-900": !isDark(),
        "bg-gray-950 text-gray-50": isDark(),
      }}
    >
      {/* Main content area with bottom padding for navigation */}
      <main class="flex flex-1 flex-col overflow-y-auto pb-24">
        <div class="mx-auto w-full max-w-4xl px-6 py-8 sm:px-8 sm:py-12">
          {props.children}
        </div>
      </main>

      {/* Bottom navigation */}
      <Navigation />
    </div>
  );
};
