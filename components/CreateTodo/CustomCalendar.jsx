import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomCalendar({ startDate, setStartDate }){

    const datePickerOptions = {
        selected : startDate,
        onChange : date => setStartDate(date),
        timeInputLabel : "Time:",
        dateFormat : "MM / dd / yyyy  h:mm aa",
        showTimeInput : true,
        className : "form__input",
    }

    return(
        <>
            <DatePicker {...datePickerOptions} />
            <img className="form__calendar" src="./calendar.svg" alt="form calendar"/>
            <style jsx>{`
                .form__calendar{
                    position: absolute;
                    top: 136px;
                    right: 75px;
                    width: 16px;
                    opacity: 0.8;
                }
                :global(.react-datepicker){
                    width: 285px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    border: none;
                    top: -20px;
                    left: 0px;
                    box-shadow: 0px 0px 10px rgba(15, 16, 18, 0.3);
                }
                :global(.react-datepicker__triangle){
                    display: none;
                }
                :global(.react-datepicker__header){
                    background-color: transparent;
                }

                :global(.react-datepicker__day, .react-datepicker__day-name, .react-datepicker__current-month, .react-datepicker-time__caption, .react-datepicker-time__input){
                    opacity: 0.7;
                }
            `}</style>
        </>
    );
}