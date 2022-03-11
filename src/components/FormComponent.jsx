import { useContext } from "react";
import { CALENDAR_ACTIONS, DateContext } from "../contexts/DateContext";

export const FormComponent = () => {
    const { state, dispatch } = useContext(DateContext);

    function saveRDV(e) {
        e.preventDefault();

        const form = e.currentTarget;

        const date = new Date(form.date.value);

        if (form.title.value.length <= 0) {
            alert("Titre invalide !");
        } else if (form.comment.value.length <= 0) {
            alert("Commentaire invalide !");
        } else if (isNaN(date.getTime())) {
            alert("Date Invalide !");
        } else {
            fetch("http://localhost:3002/rdvs", {
                method: "POST",
                body: JSON.stringify({
                    title: form.title.value,
                    comment: form.comment.value,
                    date: "" + date.getTime(),
                }),
                headers: { "Content-Type": "application/json" },
            });

            const rs = [
                ...state.rdv,
                {
                    title: form.title.value,
                    comment: form.comment.value,
                    date: "" + date.getTime(),
                },
            ];

            dispatch({
                type: CALENDAR_ACTIONS.SHOW_RDV,
                payload: {
                    rdv: rs,
                    rdvs: rs.filter((r) => {
                        const rdvDate = new Date(Number(r.date));
                        const date = new Date();
                        return (
                            date.getDate() === rdvDate.getDate() &&
                            rdvDate.getFullYear() === date.getFullYear() &&
                            rdvDate.getMonth() === date.getMonth()
                        );
                    }),
                },
            });

            form.reset();
        }
    }

    return (
        <form onSubmit={saveRDV}>
            <label htmlFor='title'>Titre</label>
            <input
                id='tile'
                name='title'
                type='text'
                defaultValue=''
                placeholder='Titre'
            />

            <label htmlFor='comment'>Commentaire</label>

            <input
                name='comment'
                type='text'
                defaultValue=''
                placeholder='Commentaire'
                id='comment'
            />

            <label htmlFor='date'>Date RDV</label>

            <input name='date' type='date' id='date' />

            <button type='submit'>Ajouter RDV</button>
        </form>
    );
};
