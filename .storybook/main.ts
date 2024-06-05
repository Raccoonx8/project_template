import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "@chakra-ui/storybook-addon",
        "@storybook/addon-viewport",
        "storybook-addon-pseudo-states",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    features: {
        emotionAlias: false,
    },
    staticDirs: ["../public"],
    core: {
        builder: "@storybook/builder-vite", // 👈 The builder enabled here.
    },
};

export default config;
