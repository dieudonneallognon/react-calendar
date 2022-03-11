import { CalendarBody } from "./components/CalendarBody";
import { CalendarHeader } from "./components/CalendarHeader";
import { FormComponent } from "./components/FormComponent";
import { RdvList } from "./components/RdvList";
import { DateContextProvider } from "./providers/DateContextProvider";

function App() {
    return (
        <DateContextProvider>
            <main>
                <main className='calendar'>
                    <CalendarHeader></CalendarHeader>
                    <CalendarBody></CalendarBody>
                </main>
                <div className='rdvList'>
                    <RdvList></RdvList>
                </div>
            </main>
            <FormComponent></FormComponent>
        </DateContextProvider>
    );
}

export default App;
