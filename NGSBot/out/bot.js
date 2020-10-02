"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const types_1 = require("./inversify/types");
const NGSDataStore_1 = require("./NGSDataStore");
const NGSScheduleDataStore_1 = require("./NGSScheduleDataStore");
const ScheduleLister_1 = require("./translators/ScheduleLister");
const commandLister_1 = require("./translators/commandLister");
var fs = require('fs');
let Bot = /** @class */ (() => {
    let Bot = class Bot {
        constructor(client, token, NGSDataStore, NGSScheduleDataStore) {
            this.client = client;
            this.token = token;
            this.NGSDataStore = NGSDataStore;
            this.NGSScheduleDataStore = NGSScheduleDataStore;
            this.translators = [];
            // this.translators.push(new NameChecker(client, NGSDataStore));
            // this.translators.push(new TeamNameChecker(client, NGSDataStore));
            // this.translators.push(new VersionChecker(client, NGSDataStore));
            // this.translators.push(new PendingChecker(client));
            // this.translators.push(new HistoryChecker(client, NGSDataStore));
            // this.translators.push(new DivisionLister(client, NGSDataStore));
            this.translators.push(new ScheduleLister_1.ScheduleLister(client, NGSScheduleDataStore));
            // this.translators.push(new StandingsLister(client));
            this.translators.push(new commandLister_1.CommandLister(client, this.translators));
        }
        listen() {
            this.client.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
                this.OnMessageReceived(message);
            }));
            return this.client.login(this.token);
        }
        OnMessageReceived(message) {
            let originalContent = message.content;
            if (/^\>/.test(originalContent)) {
                var trimmedValue = originalContent.substr(1);
                this.translators.forEach(translator => {
                    translator.Translate(trimmedValue, message);
                });
            }
        }
    };
    Bot = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.TYPES.Client)),
        __param(1, inversify_1.inject(types_1.TYPES.Token)),
        __param(2, inversify_1.inject(types_1.TYPES.NGSDataStore)),
        __param(3, inversify_1.inject(types_1.TYPES.NGSScheduleDataStore)),
        __metadata("design:paramtypes", [discord_js_1.Client, String, NGSDataStore_1.NGSDataStore,
            NGSScheduleDataStore_1.NGSScheduleDataStore])
    ], Bot);
    return Bot;
})();
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map