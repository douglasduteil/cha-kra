import { type Component, type ParentComponent } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";
import { Navigation } from "~/components/Navigation";

export const Layout: ParentComponent = (props) => {
  const { chakraColor, effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";
  const bgColor = () => (isDark() ? "#000000" : "#ffffff");
  const textColor = () => (isDark() ? "#ffffff" : "#000000");

  return (
    <div
      class="flex min-h-screen flex-col"
      style={{
        "background-color": bgColor(),
        color: textColor(),
      }}
    >
      {/* Main content area with bottom padding for navigation */}
      <main class="flex-1 overflow-y-auto pb-20">{props.children}</main>

      {/* Bottom navigation */}
      <Navigation />
    </div>
  );
};
