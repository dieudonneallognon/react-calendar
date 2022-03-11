import { useContext, useEffect } from "react";
import { CALENDAR_ACTIONS, DateContext } from "../contexts/DateContext";
import axios from "axios";

export const RdvList = () => {
    const { state, dispatch } = useContext(DateContext);

    return (
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Commentaire</th>
                    <th>Heure</th>
                </tr>
            </thead>
            <tbody>
                {state.rdvs.map((rdv, i) => {
                    return (
                        <tr key={"rdv" + i}>
                            <td key={"rdv-title" + i}>{rdv.title}</td>
                            <td key={"rdv-comment" + i}>{rdv.comment}</td>
                            <td key={"rdv-date" + i}>
                                {new Date(Number(rdv.date)).toLocaleString()}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
