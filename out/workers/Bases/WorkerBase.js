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
exports.WorkerBase = void 0;
const DiscordChannels_1 = require("../../enums/DiscordChannels");
const ChannelMessageSender_1 = require("../../helpers/messageSenders/ChannelMessageSender");
class WorkerBase {
    constructor(workerDependencies, detailed, messageSender) {
        this.detailed = detailed;
        this.messageSender = messageSender;
        this.client = workerDependencies.client;
        this.messageStore = workerDependencies.messageStore;
        this.dataStore = workerDependencies.dataStore;
        if (messageSender.originalMessage.guild)
            this.guild = messageSender.originalMessage.guild;
        this._channelMessageSender = new ChannelMessageSender_1.ChannelMessageSender(this.client, this.messageStore);
    }
    Begin(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Start(commands);
        });
    }
    SearchForRegisteredTeams(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataStore.SearchForRegisteredTeams(searchTerm);
        });
    }
    SearchForTeamBySeason(season, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataStore.SearchForTeamBySeason(season, searchTerm);
        });
    }
    SearchForPlayersInCurrentSeason(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.dataStore.GetUsers();
            const searchRegex = new RegExp(searchTerm, 'i');
            return users.filter(p => searchRegex.test(p.displayName));
        });
    }
    SendMessageToDelta(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._channelMessageSender.SendToDiscordChannel(message, DiscordChannels_1.DiscordChannels.DeltaPmChannel);
        });
    }
}
exports.WorkerBase = WorkerBase;
//# sourceMappingURL=WorkerBase.js.map