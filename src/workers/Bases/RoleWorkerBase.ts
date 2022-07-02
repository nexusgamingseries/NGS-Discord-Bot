import { Guild, Role } from "discord.js";
import { basename } from "path";
import { NGSRoles } from "../../enums/NGSRoles";
import { Globals } from "../../Globals";
import { RespondToMessageSender } from "../../helpers/messageSenders/RespondToMessageSender";
import { Mongohelper } from "../../helpers/Mongohelper";
import { RoleHelper } from "../../helpers/RoleHelper";
import { CommandDependencies } from "../../helpers/TranslatorDependencies";
import { WorkerBase } from "./WorkerBase";

export abstract class RoleWorkerBase extends WorkerBase {

    protected reservedRoleNames: string[] = [
        'Caster Hopefuls',
        NGSRoles.FreeAgents,
        'Moist',
        'Supporter',
        'Interviewee',
        'Bots',
        'Storm Casters',
        'Ladies of the Nexus',
        'HL Staff',
        'Editor',
        'Nitro Booster',
        'It',
        'Has Cooties',
        'PoGo Raider',
        'Cupid Captain',
        'HCI Player',
        'Trait Value',
        'MemberList',
        '@everyone'];

    protected reserveredRoles: Role[] = [];
    protected myBotRole: Role;
    protected captainRole: Role;
    protected stormRole: Role;

    protected roleHelper: RoleHelper;

    public constructor(workerDependencies: CommandDependencies, protected detailed: boolean, protected messageSender: RespondToMessageSender, private mongoConnection: Mongohelper) {

        super(workerDependencies, detailed, messageSender);
    }

    public async Begin(commands: string[]) {
        await this.Setup();
        await this.Start(commands);
    }

    private async Setup() {
        this.dataStore.Clear();
        this.roleHelper = await RoleHelper.CreateFrom(this.messageSender.originalMessage.guild);
        this.captainRole = this.roleHelper.lookForRole(NGSRoles.Captain);
        this.myBotRole = this.roleHelper.lookForRole(NGSRoles.NGSBot);
        this.stormRole = this.roleHelper.lookForRole(NGSRoles.Storm);
        this.reserveredRoles = await this.GetReservedRoles();
    }

    private async GetReservedRoles(): Promise<Role[]> {
        const result = [];
        for (let roleName of this.reservedRoleNames) {
            let foundRole = this.roleHelper.lookForRole(roleName);
            if (foundRole) {
                result.push(foundRole);
            }
            else {
                Globals.logAdvanced(`didnt find role: ${roleName}`);
            }
        }
        var selfAssignableRoles = await this.mongoConnection.GetAssignedRoleRequests(this.guild.id);
        const allRoles = await this.guild.roles.fetch();
        for (let roleId of selfAssignableRoles) {
            let foundRole = await allRoles.fetch(roleId);
            if (foundRole) {
                result.push(foundRole);
            }
            else {
                Globals.logAdvanced(`didnt find role: ${foundRole}`);
            }
        }

        return result;
    }
}