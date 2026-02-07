import { type Component } from "solid-js";
import { ArrowLeft } from "lucide-solid";
import { A } from "@solidjs/router";

export const BackArrow: Component = () => {
  return (
    <A
      href="/"
      class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Back to home"
    >
      <ArrowLeft size={22} class="text-chakra" />
    </A>
  );
};
