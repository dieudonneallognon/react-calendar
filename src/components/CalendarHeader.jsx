import { useContext } from "react";
import { CALENDAR_ACTIONS, DateContext } from "../contexts/DateContext";

export const CalendarHeader = () => {
    const { state, dispatch } = useContext(DateContext);

    function triggerDispath(e) {
        e.preventDefault();
        dispatch({
            type: e.currentTarget.getAttribute("actiontype"),
            payload: state.date,
        });
    }

    return (
        <section className='calendar__head'>
            <div month={state.date.getMonth()}>
                <button
                    key={0}
                    actiontype={CALENDAR_ACTIONS.PREVIOUS_MONTH}
                    onClick={triggerDispath}>
                    &lt;&lt;
                </button>
                <p>{state.date.toUTCString().split(" ")[2]}</p>
                <button
                    key={1}
                    actiontype={CALENDAR_ACTIONS.NEXT_MONTH}
                    onClick={triggerDispath}>
                    &gt;&gt;
                </button>
            </div>
            <div year={state.date.getFullYear()}>
                <button
                    key={2}
                    actiontype={CALENDAR_ACTIONS.PREVIOUS_YEAR}
                    onClick={triggerDispath}>
                    &lt;&lt;
                </button>
                <p>{state.date.getFullYear()}</p>
                <button
                    key={3}
                    actiontype={CALENDAR_ACTIONS.NEXT_YEAR}
                    onClick={triggerDispath}>
                    &gt;&gt;
                </button>
            </div>
        </section>
    );
};
