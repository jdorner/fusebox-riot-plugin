"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var riot;
/**
 * This plugin compiles Riot tag files to JavaScript
 *
 * @export
 * @class RiotPluginClass
 * @implements {Plugin}
 */
var RiotPluginClass = /** @class */ (function () {
    /**
     * @param {Object} options - Options for Riot compiler
     */
    function RiotPluginClass(options) {
        if (options === void 0) { options = {}; }
        this.test = /\.tag$/;
        this.options = Object.assign({}, options);
    }
    RiotPluginClass.prototype.init = function (context) {
        this.context = context;
        context.allowExtension('.tag');
    };
    RiotPluginClass.prototype.transform = function (file, ast) {
        var _this = this;
        if (this.context.useCache) {
            if (file.loadFromCache()) {
                return;
            }
        }
        file.loadContents();
        if (!riot) {
            riot = require('riot-compiler');
        }
        return new Promise(function (res, rej) {
            try {
                file.contents = riot.compile(file.contents, _this.options);
                if (_this.context.useCache) {
                    _this.context.emitJavascriptHotReload(file);
                    _this.context.cache.writeStaticCache(file, file.sourceMap, 'js');
                }
                res(file.contents);
            }
            catch (e) {
                if (e instanceof Error) {
                    rej(e);
                }
                else {
                    rej(new Error(e));
                }
            }
        });
    };
    return RiotPluginClass;
}());
exports.RiotPluginClass = RiotPluginClass;
exports.RiotPlugin = function (options) {
    return new RiotPluginClass(options);
};
//# sourceMappingURL=index.js.map