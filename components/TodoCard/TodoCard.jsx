import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {StoreContext} from '../../context';

export default function TodoCard({todo, deleteMode, setDeleteItemsList}){
    const [ shouldDelete, setShouldDelete ] = useState(false);
    const { currentTodo, handleKeyUpdate, setCurrentTodo } = useContext(StoreContext)
    const {title, date, description, status, id, labels} = todo

    const formattedDate = `${date.toString().split(' ')[0]}, ${date.toString().split(' ')[2]} ${date.toString().split(' ')[1]}`

    const handleStatusChange = () => {
        handleKeyUpdate(id, "status", !status)
    }

    const handleShouldDelete = () => {
        if(!shouldDelete){
            setDeleteItemsList( prevState => [...prevState, id]);
            setShouldDelete(true);
        }else{
            setDeleteItemsList( prevState => prevState.filter( prevStateID => prevStateID === id) );
            setShouldDelete(false);
        }
    }

    const statusTickOptions = {
        initial : { borderRadius: 0, backgroundColor : "#FFFFFF" },
        animate : status ? { borderRadius: "50%", backgroundColor: "#2782FF"} : { borderRadius: "50%", backgroundColor : "#FFFFFF" },
        onClick : handleStatusChange
    }

    const deleteTickOptions = {
        initial : { borderRadius: "50%", backgroundColor : "#FFFFFF" },
        animate : shouldDelete ? { borderRadius: 0, backgroundColor: "#DE3C4B"} : { borderRadius: 0, backgroundColor : "#FFFFFF" },
        onClick : handleShouldDelete
    }

    const todoCardOptions = {
        key : id,
        initial : { scale: 0, opacity: 0, backgroundColor : "#FFFFFF" },
        animate : { 
            scale: 1, 
            opacity: 1, 
            color: currentTodo === id ? "#ffffff" : "#000000",
            backgroundColor: status ? 
                currentTodo === id ? "#2782FF" : "#FAFAFA" 
                    : currentTodo === id ? "#2782FF" : "#FFFFFF" 
            
        },
        exit : {
            scale: 0, 
            opacity: 0
        }
    }

    const handleTodoCardClick = () => {
        setCurrentTodo(id)
    }
    
    return(
        <>
            <AnimatePresence exitBeforeEnter>
                <motion.article {...todoCardOptions} className="todo-card">
                    <div className="todo-card__status">
                    { deleteMode ? <motion.div {...deleteTickOptions} className="todo-card__status__delete-tick"/> :
                        <motion.img {...statusTickOptions} className="todo-card__status-tick" src="./tick.svg" alt="status icon"/>
                    }
                    </div>
                    <div className="todo-card__details" onClick={handleTodoCardClick}>
                        <p className="details__title">{title}</p>
                        <div className="details__options">
                            <div className="details__options__date">
                                <img className="details__options__calendar-icon" src="./calendar.svg" alt="calendar reminder"/>
                                <p>{formattedDate}</p>
                            </div>
                        </div>
                        <p className="todo-card__description">{description}</p>
                    </div>
                </motion.article>
            </AnimatePresence>
            <style jsx>{`
                :global(.todo-card){
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    color: #707070;
                    padding: 24px 0px;
                }

                .todo-card__status{
                    position: relative;
                    width: 20%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                :global(.todo-card__status-tick){
                    width: 24px;
                    height: 24px;
                    padding: 3px;
                    border: 2px solid #2782FF;
                    border-radius: 25px;
                }

                :global(.todo-card__status__delete-tick){
                    width: 24px;
                    height: 24px;
                    padding: 3px;
                    border: 2px solid #DE3C4B;
                }

                .todo-card__details{
                    display: flex;
                    flex-direction: column;
                    width: 80%;
                    padding-right 24px;
                }

                .details__title{
                    font-size: 16px;
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                .details__options{
                    display: flex;
                    margin-bottom: 10px;
                }

                .details__options__date{
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    opacity: ${currentTodo === id ? "1" : "0.5" };
                }

                .details__options__calendar-icon{
                    width: 12px;
                    margin-right: 8px;
                    fill: #ffffff;
                }

                .todo-card__description{
                    min-height: 45px;
                    font-size: 12px;
                    line-height: 22px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

            `}</style>
        </>
    );
}