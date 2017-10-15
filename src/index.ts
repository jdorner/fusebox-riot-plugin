import { WorkFlowContext, Plugin, File } from 'fuse-box';

export interface RiotPluginOptions {
    brackets?: string,
    expr?: boolean,
    compact?: boolean,
    whitespace?: boolean,
    template?: string,
    type?: string,
    style?: string,
    entities?: boolean,
    exclude?: Array<string>
}

let riot;

/**
 * This plugin compiles Riot tag files to JavaScript
 *
 * @export
 * @class RiotPluginClass
 * @implements {Plugin}
 */
export class RiotPluginClass implements Plugin {

    public test: RegExp = /\.tag$/;
    public context: WorkFlowContext;
    public options: RiotPluginOptions;

    /**
     * @param {Object} options - Options for coffee compiler
     */
    constructor(options: RiotPluginOptions = {}) {
        this.options = Object.assign({}, options);
    }

    public init(context: WorkFlowContext) {
        this.context = context;
        context.allowExtension('.tag');
    }

    transform?(file: File, ast?: any) {
        if (this.context.useCache) {
            if (file.loadFromCache()) {
                return;
            }
        }

        file.loadContents();

        if (!riot) {
            riot = require('riot-compiler');
        }

        return new Promise((res, rej) => {
            try {
                file.contents = riot.compile(file.contents, this.options);
                if (this.context.useCache) {
                    this.context.emitJavascriptHotReload(file);
                    this.context.cache.writeStaticCache(file, file.sourceMap, 'js');
                }

                res(file.contents)
            } catch (e) {
                if (e instanceof Error) {
                    rej(e);
                } else {
                    rej(new Error(e));
                }
            }
        });
    }
}

export const RiotPlugin = (options?: RiotPluginOptions) => {
    return new RiotPluginClass(options);
};
