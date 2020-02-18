import * as actionsTypesTeam from "../actionsTypes/actionsTypesTeam";

export const setTeamCharacters = payload => {
  return {
    type: actionsTypesTeam.SET_TEAM_CHARACTERS,
    payload,
  };
};
