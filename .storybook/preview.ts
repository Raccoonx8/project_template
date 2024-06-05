import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";

initialize({ onUnhandledRequest: "bypass" });

const customViewports = {
    apple_mac_book_pro_17: {
        name: "Apple MacBook Pro 17",
        styles: {
            width: "1920px",
            height: "1200px",
        },
    },
    apple_mac_book_air_13: {
        name: "Apple MacBook Air 13",
        styles: {
            width: "1440px",
            height: "900px",
        },
    },
    ainol_novo_7_crystal: {
        name: "Ainol Novo 7 Crystal",
        styles: {
            width: "1024px",
            height: "600px",
        },
    },
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            viewports: { ...INITIAL_VIEWPORTS, ...customViewports },
        },
    },
};

export const decorators = [mswDecorator];

export default preview;
