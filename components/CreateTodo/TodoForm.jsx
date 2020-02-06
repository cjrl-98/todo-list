import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import CustomCalendar from './CustomCalendar';
import CreateLabelsGroup from './CreateLabelsGroup';
import {StoreContext} from '../../context';

export default function TodoForm({handleChangeModalState, todo}){
    const [startDate, setStartDate] = useState(new Date());
    const [labelsGroup, setLabelsGroup] = useState(null);
    const { handleNewTodo, handleKeyUpdate } = useContext(StoreContext);
    const { register, handleSubmit, setValue, reset } = useForm();

    const buttonOptions = {
        whileHover : { scale: 1.1},
        whileTap : { scale: 0.8 },
    }

    useEffect(()=>{
        if(todo){
            setValue("title", todo.title);
            setValue("date", todo.date);
            setValue("description", todo.description);
        }
    },[])

    const onSubmit = (input, e) => {
        e.preventDefault();
        if(todo){
            handleKeyUpdate(todo.id, "title", input.title,);
            handleKeyUpdate(todo.id, "date", `${startDate}`);
            handleKeyUpdate(todo.id, "description", input.description);
            handleKeyUpdate(todo.id, "labels", labelsGroup);
        }else{ 
            handleNewTodo(input.title, startDate, labelsGroup, input.description); 
            reset();
        }
        handleChangeModalState();
    };
    
    return(
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="form__header">Add Task</h3>
                <input className="form__input" name="title" type="text" placeholder="Title" ref={register}/>
                <CustomCalendar register={register} startDate={startDate} setStartDate={setStartDate}/>
                <CreateLabelsGroup setLabelsGroup={setLabelsGroup} todo={ todo ? todo : null}/>
                <textarea className="form__input" name="description" type="text" placeholder="Description" rows={7} ref={register}/>
                <motion.button {...buttonOptions} className="form__button">Add Task</motion.button>
                <motion.button {...buttonOptions} className="form__button form__button--cancel" type="button" onClick={handleChangeModalState}>Cancel</motion.button>
            </form>
            <style jsx>{`
                .form{
                    width: 360px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 10px 20px;
                }

                .form__header{
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 16px;
                }

                :global(.form__input){
                    width: 285px;
                    border: none;
                    border-radius: 5px;
                    box-shadow: 0px 0px 5px rgba(15, 16, 18, 0.2);
                    padding: 8px 16px;
                    margin-bottom: 16px;
                }
                
                :global(.form__button){
                    width: 80%;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #FFFFFF;
                    padding: 10px 60px;
                    margin-top: 10px;
                    border-radius: 5px;
                    background-image: linear-gradient(to right, #8961CB, #BA77E1);
                    border: none;
                }

                :global(.form__button--cancel){
                    color: #8961CB;
                    border: none;
                    background: none;
                }
            `}</style>
        </>
    );
}