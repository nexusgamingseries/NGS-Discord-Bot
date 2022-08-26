"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonNGSTranslatorBase = void 0;
const translatorBase_1 = require("./translatorBase");
const DiscordGuilds_1 = require("../../enums/DiscordGuilds");
class NonNGSTranslatorBase extends translatorBase_1.TranslatorBase {
    Verify(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.guild)
                return false;
            switch (message.guild.id) {
                case DiscordGuilds_1.DiscordGuilds.NGS:
                    return false;
            }
            return true;
        });
    }
}
exports.NonNGSTranslatorBase = NonNGSTranslatorBase;
//# sourceMappingURL=nonNGSTranslatorBase.js.map