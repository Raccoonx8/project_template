/* eslint-disable react-refresh/only-export-components */
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { vi } from "./vitest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AllTheProviders = ({ children }: { children: any }) => {
    return { children };
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export * from "@testing-library/user-event";
export { customRender as render };

export const waitResponseMock = async (msTimeout: number = 100) =>
    await new Promise((resolve) => setTimeout(resolve, msTimeout));

const checkFn: {
    [key: string]: (value: number, mediaQueryValue: number) => boolean;
} = {
    "max-width": (value, mediaQueryValue) => value <= mediaQueryValue,
    "min-width": (value, mediaQueryValue) => value >= mediaQueryValue,
};

// Получает на вход предполагаемую ширину окна браузера и имитирует проверку медиа запросов
// для последующего рендера компонентов.
export function mockImplementationMatchMedia(width: number) {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => {
            const separatorCondition: string = query.match(/(?<=\s)\w*(?=\s)/);
            const mediaQueries: string[] = separatorCondition
                ? query.split(separatorCondition[0])
                : [query];

            // console.log(`MediaQuery: ${query}`);
            const mediaQueriesChecks = mediaQueries.map(
                (mediaQuery: string) => {
                    const queryWidthInPx = mediaQuery.match(/\d{1,}/g);
                    const queryAttribute = mediaQuery.match(/(\w*-?\w{1,})/);

                    if (queryWidthInPx === null || queryAttribute === null) {
                        return false;
                    }

                    // console.log(`
                    //     width: ${width}
                    //     query: ${mediaQuery}
                    //     queryWidthInPx[0]: ${queryWidthInPx[0]}
                    //     queryAttribute[0]: ${queryAttribute[0]}
                    //     res: ${checkFn[queryAttribute[0]](
                    //         width,
                    //         Number(queryWidthInPx[0])
                    //     )}`);
                    // console.log();

                    return checkFn[queryAttribute[0]](
                        width,
                        Number(queryWidthInPx[0])
                    );
                }
            );
            // console.log(`Res: ${mediaQueriesChecks.every((check) => check)}\n`);

            return {
                matches: mediaQueriesChecks.every((check) => check),
                media: query,
                onchange: null,
                addListener: vi.fn(), // deprecated
                removeListener: vi.fn(), // deprecated
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            };
        }),
    });
}
