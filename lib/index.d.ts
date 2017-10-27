import { WorkFlowContext, Plugin, File } from 'fuse-box';
export interface RiotPluginOptions {
    brackets?: string;
    expr?: boolean;
    compact?: boolean;
    whitespace?: boolean;
    template?: string;
    type?: string;
    style?: string;
    entities?: boolean;
    exclude?: Array<string>;
}
/**
 * This plugin compiles Riot tag files to JavaScript
 *
 * @export
 * @class RiotPluginClass
 * @implements {Plugin}
 */
export declare class RiotPluginClass implements Plugin {
    test: RegExp;
    context: WorkFlowContext;
    options: RiotPluginOptions;
    /**
     * @param {Object} options - Options for Riot compiler
     */
    constructor(options?: RiotPluginOptions);
    init(context: WorkFlowContext): void;
    transform?(file: File, ast?: any): Promise<{}>;
}
export declare const RiotPlugin: (options?: RiotPluginOptions) => RiotPluginClass;
