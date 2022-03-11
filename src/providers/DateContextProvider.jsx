import axios from "axios";
import { useEffect, useReducer } from "react";
import {
    CALENDAR_ACTIONS,
    DateContext,
    dateReducer,
} from "../contexts/DateContext";

const initialState = {
    date: new Date(),
    rdv: [],
    rdvs: [],
    loading: true,
};

export const DateContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dateReducer, initialState);

    useEffect(() => {
        axios("http://localhost:3002/rdvs").then(({ data }) => {
            const rdvs = data.filter((r) => {
                const rdvDate = new Date(Number(r.date));
                const date = new Date();
                return (
                    date.getDate() === rdvDate.getDate() &&
                    rdvDate.getFullYear() === date.getFullYear() &&
                    rdvDate.getMonth() === date.getMonth()
                );
            });

            dispatch({
                type: CALENDAR_ACTIONS.SHOW_RDV,
                payload: { rdv: data, rdvs },
            });
        });
    }, []);

    return (
        <DateContext.Provider value={{ state, dispatch }}>
            {children}
        </DateContext.Provider>
    );
};
