interface IPromptInfo {
    prompt: string;
    negativePrompt: string;
    sampler: string;
    cfgScale: string;
    seed: string;
    size: string;
    modelHash: string;
    model: string;
    steps: string;
}

declare function readImage(imgPath: string): Promise<string>;
declare function readImageV2(imgPath: string): Promise<IPromptInfo>;

export { IPromptInfo, readImage, readImageV2 };
