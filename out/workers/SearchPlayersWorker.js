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
exports.SearchPlayersWorker = void 0;
const MessageHelper_1 = require("../helpers/MessageHelper");
const WorkerBase_1 = require("./Bases/WorkerBase");
class SearchPlayersWorker extends WorkerBase_1.WorkerBase {
    Start(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            var message = "";
            for (var i = 0; i < commands.length; i++) {
                var playerName = commands[i];
                if (this.detailed)
                    var players = yield this.SearchForPlayersByAPI(playerName);
                else
                    var players = yield this.SearchForPlayersInCurrentSeason(playerName);
                if (players.length <= 0)
                    message += `No players found for: ${playerName} \n`;
                else
                    message += this.CreatePlayerMessage(players);
                message += "\n";
            }
            yield this.messageSender.SendMessage(message);
        });
    }
    SearchForPlayersByAPI(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dataStore.GetUsersByApi(searchTerm);
        });
    }
    CreatePlayerMessage(players) {
        let message = new MessageHelper_1.MessageHelper();
        players.forEach(p => {
            message.AddNewLine(`**Name**: ${p.displayName}`);
            if (p.teamName)
                message.AddNewLine(`**TeamName**: ${p.teamName}`);
            else
                message.AddNewLine("**No Team Found**");
            for (var rank of p.verifiedRankHistory.sort(this.RankHistorySort)) {
                if (rank.status == 'verified')
                    message.AddNewLine(`${rank.year} Season: ${rank.season}. **${rank.hlRankMetal} ${rank.hlRankDivision}**`);
            }
            message.AddEmptyLine();
        });
        return message.CreateStringMessage();
    }
    RankHistorySort(history1, history2) {
        if (history1.year > history2.year)
            return -1;
        else if (history1.year < history2.year)
            return 1;
        if (history1.season > history2.season)
            return -1;
        else
            return 1;
    }
}
exports.SearchPlayersWorker = SearchPlayersWorker;
//# sourceMappingURL=SearchPlayersWorker.js.map