import { Client, Guild } from "discord.js";
import { DataStoreWrapper } from "../../helpers/DataStoreWrapper";
import { MessageSender } from "../../helpers/MessageSender";
import { CommandDependencies } from "../../helpers/TranslatorDependencies";
import { INGSTeam, INGSUser } from "../../interfaces";
import { MessageStore } from "../../MessageStore";

export abstract class WorkerBase {

    protected readonly dataStore: DataStoreWrapper;
    protected readonly client: Client;
    protected readonly messageStore: MessageStore;
    protected readonly guild: Guild;

    constructor(workerDependencies: CommandDependencies, protected detailed: boolean, protected messageSender: MessageSender) {
        this.client = workerDependencies.client;
        this.messageStore = workerDependencies.messageStore;
        this.dataStore = workerDependencies.dataStore;
        this.guild = messageSender.originalMessage.guild;
    }

    public Begin(commands: string[]) {
        this.Start(commands);
    }

    protected abstract Start(commands: string[]);


    protected async SearchForRegisteredTeams(searchTerm: string): Promise<INGSTeam[]> {
        return this.dataStore.SearchForRegisteredTeams(searchTerm);
    }

    protected async SearchForTeamBySeason(season: number, searchTerm: string): Promise<INGSTeam[]> {
        return this.dataStore.SearchForTeamBySeason(season, searchTerm);
    }

    protected async SearchForPlayersInCurrentSeason(searchTerm: string): Promise<INGSUser[]> {
        const users = await this.dataStore.GetUsers();
        const searchRegex = new RegExp(searchTerm, 'i');
        return users.filter(p => searchRegex.test(p.displayName));
    }
}