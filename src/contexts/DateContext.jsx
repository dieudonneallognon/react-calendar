import { createContext } from "react";

export const CALENDAR_ACTIONS = {
    NEXT_MONTH: "next_month",
    PREVIOUS_MONTH: "previous_month",
    NEXT_YEAR: "next_year",
    PREVIOUS_YEAR: "previous_year",
    SHOW_RDV: "show_rdv",
};

export const DateContext = createContext();

export function dateReducer(state, action) {
    let date = null;
    switch (action.type) {
        case CALENDAR_ACTIONS.NEXT_MONTH:
            date = new Date(state.date.setMonth(state.date.getMonth() + 1));
            break;
        case CALENDAR_ACTIONS.PREVIOUS_MONTH:
            date = new Date(state.date.setMonth(state.date.getMonth() - 1));
            break;

        case CALENDAR_ACTIONS.NEXT_YEAR:
            date = new Date(
                state.date.setFullYear(state.date.getFullYear() + 1)
            );
            break;

        case CALENDAR_ACTIONS.PREVIOUS_YEAR:
            date = new Date(
                state.date.setFullYear(state.date.getFullYear() - 1)
            );
            break;
        case CALENDAR_ACTIONS.SHOW_RDV:
            return {
                ...state,
                rdvs: action.payload.rdvs,
                rdv: action.payload.rdv,
            };
    }
    return { ...state, date };
}
