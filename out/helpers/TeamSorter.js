"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamSorter = void 0;
const NGSDivisionConcat_1 = require("../enums/NGSDivisionConcat");
const NGSDivisions_1 = require("../enums/NGSDivisions");
class TeamSorter {
    static SortByTeamDivision(team1, team2) {
        return this.SortByDivision(team1.divisionDisplayName, team2.divisionDisplayName);
    }
    static SortByTeamName(team1, team2) {
        if (team1.teamName.toUpperCase() < team2.teamName.toUpperCase())
            return -1;
        else
            return 1;
    }
    static SortByDivision(divisionDisplay1, divisionDisplay2) {
        const order = [NGSDivisions_1.NGSDivisions.Storm,
            NGSDivisions_1.NGSDivisions.Heroic,
            NGSDivisions_1.NGSDivisions.Nexus,
            NGSDivisions_1.NGSDivisions.AEast,
            NGSDivisions_1.NGSDivisions.AWest,
            NGSDivisions_1.NGSDivisions.BEast,
            NGSDivisions_1.NGSDivisions.BWest,
            NGSDivisions_1.NGSDivisions.CEast,
            NGSDivisions_1.NGSDivisions.CWest,
            NGSDivisions_1.NGSDivisions.DEast,
            NGSDivisions_1.NGSDivisions.DWest,
            NGSDivisions_1.NGSDivisions.EEast,
            NGSDivisions_1.NGSDivisions.EWest];
        for (var current of order) {
            if ((divisionDisplay1 === null || divisionDisplay1 === void 0 ? void 0 : divisionDisplay1.indexOf(current)) > -1) {
                return -1;
            }
            else if ((divisionDisplay2 === null || divisionDisplay2 === void 0 ? void 0 : divisionDisplay2.indexOf(current)) > -1) {
                return 1;
            }
        }
        return 0;
    }
    static SortByDivisionConcat(divisionDisplay1, divisionDisplay2) {
        const order = [NGSDivisionConcat_1.NGSDivisionConcat.Storm,
            NGSDivisionConcat_1.NGSDivisionConcat.Heroic,
            NGSDivisionConcat_1.NGSDivisionConcat.Nexus,
            NGSDivisionConcat_1.NGSDivisionConcat.AEast,
            NGSDivisionConcat_1.NGSDivisionConcat.AWest,
            NGSDivisionConcat_1.NGSDivisionConcat.BEast,
            NGSDivisionConcat_1.NGSDivisionConcat.BWest,
            NGSDivisionConcat_1.NGSDivisionConcat.CEast,
            NGSDivisionConcat_1.NGSDivisionConcat.CWest,
            NGSDivisionConcat_1.NGSDivisionConcat.DEast,
            NGSDivisionConcat_1.NGSDivisionConcat.DWest,
            NGSDivisionConcat_1.NGSDivisionConcat.EEast,
            NGSDivisionConcat_1.NGSDivisionConcat.EWest];
        for (var current of order) {
            if ((divisionDisplay1 === null || divisionDisplay1 === void 0 ? void 0 : divisionDisplay1.indexOf(current)) > -1) {
                return -1;
            }
            else if ((divisionDisplay2 === null || divisionDisplay2 === void 0 ? void 0 : divisionDisplay2.indexOf(current)) > -1) {
                return 1;
            }
        }
        return 0;
    }
}
exports.TeamSorter = TeamSorter;
//# sourceMappingURL=TeamSorter.js.map