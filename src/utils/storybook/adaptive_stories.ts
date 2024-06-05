import { StoryObj } from "@storybook/react";

type CreateCommonAdaptiveStoriesOutput<T> = {
    AppleMacBookPro17Story: StoryObj<T>;
    AppleMacBookAir13Story: StoryObj<T>;
    AinolNovo7CrystalStory: StoryObj<T>;
    IpadStory: StoryObj<T>;
    Iphone6Story: StoryObj<T>;
};

export function createAdaptiveStories<T>(): CreateCommonAdaptiveStoriesOutput<T> {
    type StoryType = StoryObj<T>;

    const AppleMacBookPro17Story = {
        parameters: {
            viewport: { defaultViewport: "apple_mac_book_pro_17" },
        },
    } as unknown as StoryType;

    const AppleMacBookAir13Story = {
        parameters: {
            viewport: { defaultViewport: "apple_mac_book_air_13" },
        },
    } as unknown as StoryType;

    const AinolNovo7CrystalStory = {
        parameters: {
            viewport: { defaultViewport: "ainol_novo_7_crystal" },
        },
    } as unknown as StoryType;

    const IpadStory = {
        parameters: {
            viewport: { defaultViewport: "ipad" },
        },
    } as unknown as StoryType;

    const Iphone6Story = {
        parameters: {
            viewport: {
                defaultViewport: "iphone6",
            },
        },
    } as unknown as StoryType;

    return {
        AppleMacBookPro17Story,
        AppleMacBookAir13Story,
        AinolNovo7CrystalStory,
        IpadStory,
        Iphone6Story,
    };
}
