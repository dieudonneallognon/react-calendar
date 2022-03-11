import { useContext } from "react";
import { CALENDAR_ACTIONS, DateContext } from "../contexts/DateContext";

export const CalendarBody = () => {
    const { state, dispatch } = useContext(DateContext);

    const firsDayDate = new Date(
        state.date.getFullYear(),
        state.date.getMonth(),
        1
    );
    const lastDayDate = new Date(
        state.date.getFullYear(),
        state.date.getMonth() + 1,
        0
    );

    function getDay(date) {
        return date.getDay() === 0 ? 7 : date.getDay();
    }

    const firstSem = [1, 2, 3, 4, 5, 6, 7].map((d, i) => {
        const day = getDay(firsDayDate);

        const lastMontlastJourney = new Date(
            state.date.getFullYear(),
            state.date.getMonth(),
            0
        );

        if (d >= day) {
            return {
                value: d - day + 1,
                disable: false,
            };
        }

        return {
            value: lastMontlastJourney.getDate() - day + i + 2,
            disable: true,
        };
    });

    const lastSem = [1, 2, 3, 4, 5, 6, 7].map((d, i) => {
        const day = getDay(lastDayDate);

        const nextMonthfirstJourney = new Date(
            state.date.getFullYear(),
            state.date.getMonth() + 1,
            1
        );

        if (d <= day) {
            return {
                value: lastDayDate.getDate() + i - day + 1,
                disable: false,
            };
        }

        return {
            value: nextMonthfirstJourney.getDate() + i - day,
            disable: true,
        };
    });

    const interDays = Array(
        lastDayDate.getDate() -
            [...firstSem, ...lastSem].filter((d) => !d.disable).length
    )
        .fill(0)
        .map((d, i) => {
            return firstSem.filter((d) => !d.disable).length + i + 1;
        });

    function dateIsToday(d) {
        const currenteDate = new Date();

        return (
            d === currenteDate.getDate() &&
            currenteDate.getFullYear() === state.date.getFullYear() &&
            currenteDate.getMonth() === state.date.getMonth()
        );
    }

    function dateHaveRDV(d) {
        return state.rdv.find((r) => {
            const rdvDate = new Date(Number(r.date));

            return (
                d === rdvDate.getDate() &&
                rdvDate.getFullYear() === state.date.getFullYear() &&
                rdvDate.getMonth() === state.date.getMonth()
            );
        });
    }

    function listRDV(e) {
        e.preventDefault();

        if (e.currentTarget.classList.contains("active-rdv")) {
            const d = e.currentTarget.id;

            const rdvs = state.rdv.filter((r) => {
                const rdvDate = new Date(Number(r.date));

                return (
                    Number(d) === rdvDate.getDate() &&
                    rdvDate.getFullYear() === state.date.getFullYear() &&
                    rdvDate.getMonth() === state.date.getMonth()
                );
            });

            console.log(rdvs);

            dispatch({
                type: CALENDAR_ACTIONS.SHOW_RDV,
                payload: { rdvs, rdv: state.rdv },
            });
        }
    }

    return (
        <section className='calendar__body'>
            <table>
                <thead>
                    <tr>
                        <th>Lu</th>
                        <th>Ma</th>
                        <th>Me</th>
                        <th>Je</th>
                        <th>Ve</th>
                        <th>Sa</th>
                        <th>Di</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {firstSem.map((d) => {
                            return (
                                <td
                                    onClick={listRDV}
                                    id={d.value}
                                    key={d.value}
                                    className={
                                        dateHaveRDV(d.value)
                                            ? "active-rdv"
                                            : d.disable
                                            ? "disable"
                                            : dateIsToday(d.value)
                                            ? "active"
                                            : ""
                                    }>
                                    {d.value.toLocaleString("en-US", {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false,
                                    })}
                                </td>
                            );
                        })}
                    </tr>
                    {Array(interDays.length / 7)
                        .fill(0)
                        .map((sem, i) => {
                            return (
                                <tr key={"row" + i}>
                                    {[...interDays]
                                        .slice(i * 7, (i + 1) * 7)
                                        .map((d) => {
                                            return (
                                                <td
                                                    onClick={listRDV}
                                                    key={d}
                                                    id={d}
                                                    className={
                                                        dateHaveRDV(d)
                                                            ? "active-rdv"
                                                            : dateIsToday(d)
                                                            ? "active"
                                                            : ""
                                                    }>
                                                    {d < 10
                                                        ? d.toLocaleString(
                                                              "en-US",
                                                              {
                                                                  minimumIntegerDigits: 2,
                                                                  useGrouping: false,
                                                              }
                                                          )
                                                        : d}
                                                </td>
                                            );
                                        })}
                                </tr>
                            );
                        })}
                    <tr>
                        {lastSem.map((d) => {
                            return (
                                <td
                                    key={d.value}
                                    onClick={listRDV}
                                    id={d.value}
                                    className={
                                        dateHaveRDV(d.value)
                                            ? "active-rdv"
                                            : d.disable
                                            ? "disable"
                                            : dateIsToday(d.value)
                                            ? "active"
                                            : ""
                                    }>
                                    {d.value.toLocaleString("en-US", {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false,
                                    })}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </section>
    );
};
