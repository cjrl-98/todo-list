import { useState, useContext } from 'react';
import { Modal } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {StoreContext} from '../../context';
import TodoForm from '../CreateTodo/TodoForm';
import Label from '../Label/Label';

const transition = { duration: 0.7, ease: [.26,.75,0,.99] };

export default function ExpandedTodoCard(){
    const [isModal, setIsModal] = useState(false);
    const { todoList, currentTodo, handleKeyUpdate } = useContext(StoreContext)
    const { title, date, description, status, id, labels } = todoList && currentTodo ? todoList.find( todo => todo.id === currentTodo) : {   
        "id" : "",
        "status" : "",
        "title" : "",
        "date" : "",
        "labels" : null,
        "description" : ""
    };
    function convertTimeFormat () {
        let time = date.split(' ')[4].split(':');
        time = `${time[0]}:${time[1]}`;
        let newTime = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (newTime.length > 1) {
          newTime = newTime.slice (1);  
          newTime[5] = + newTime[0] < 12 ? ' AM' : ' PM';
          newTime[0] = + newTime[0] % 12 || 12; // Adjust hours
        }
        newTime = newTime.join('');
        return `${date.toString().split(' ')[0]}, ${date.toString().split(' ')[2]} ${date.toString().split(' ')[1]} at ${newTime}`
    }

    const handleStatusChange = () => {
        handleKeyUpdate(id, "status", !status)
    }

    const handleChangeModalState = () => {setIsModal(!isModal)};

    const displayLabels = () => labels ? labels.map( label => <Label key={label} text={label}/>) : null ;

    const statusTickOptions = {
        initial : { backgroundColor : "#FFFFFF" },
        animate : status ? {backgroundColor: "#2782FF"} : { backgroundColor : "#FFFFFF" },
        onClick : handleStatusChange
    }

    const expandedTodoOptions = {
        transition : transition,
        key : id,
        initial : { x: 80, opacity: 0 },
        animate : { x: 0, opacity: 1 },
        exit : { x: 80, opacity: 0, transition: {duration: 0.3}}
    }

    const editModalOptions = {
        visible : isModal,
        onOk : handleChangeModalState,
        onCancel : handleChangeModalState,
        footer: null,
        closable: false,
        centered: true,
        width: "fit-content",
    }

    return(
        <>
            <article className="expanded-todo neumorphism">
                { todoList && currentTodo ? 
                    <AnimatePresence exitBeforeEnter>
                        <motion.div {...expandedTodoOptions}>
                            <div className="expanded-todo__header">
                                <div className="header__status">
                                    <motion.img {...statusTickOptions} className="status__tick" src="./tick.svg" alt="status icon"/>
                                </div>
                                <div className="header__details">
                                    <p className="details__title">
                                        {title}
                                        <motion.img onClick={handleChangeModalState} whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.8 }} className="details__edit" src="./edit.svg" alt="edit"/>
                                    </p>
                                    <div className="details__options">
                                        <div className="options__date">
                                            <img className="options__calendar-icon" src="./calendar.svg" alt="calendar reminder"/>
                                            <p>{convertTimeFormat()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { labels.length !== 0 ? <div className="labels__container">{displayLabels()}</div> : null }
                            <div className="expanded-todo__body">
                                <p className="body__description">{description}</p>
                            </div>
                        </motion.div>
                        <Modal {...editModalOptions}>
                            <TodoForm handleChangeModalState={handleChangeModalState} todo={{title, date, description, status, id, labels}}/>
                        </Modal>
                    </AnimatePresence> : null }
            </article>
            <style jsx>{`
                .expanded-todo{
                    overflow: hidden;
                    width: 500px;
                    height: 640px;
                    border-radius: 25px;
                    margin-left: 36px;
                    padding: 46px 16px;
                }

                .expanded-todo__header{
                    width: 100%;
                    height: fit-content;
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .header__status{
                    width: 15%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                :global(.status__tick){
                    width: 33px;
                    height: 33px;
                    padding: 8px;
                    border: 2px solid #2782FF;
                    border-radius: 25px;
                }

                .header__details{
                    display: flex;
                    flex-direction: column;
                    width: 85%;
                }

                .details__title{
                    position: relative;
                    font-size: 16px;
                    font-weight: 500;
                    color: #505F79;
                    line-height: 22px;
                    margin-bottom: 10px;
                    padding-right: 40px;
                }

                :global(.details__edit){
                    position: absolute;
                    top : 3px;
                    right: 16px;
                    width: 16px;
                }

                .details__options{
                    display: flex;
                }

                .options__date{
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    opacity: 0.5;
                }

                .options__calendar-icon{
                    width: 12px;
                    margin-right: 8px;
                }

                .labels__container{
                    display : flex;
                    margin-left: 15%;
                    margin-bottom: 16px;
                }

                .expanded-todo__body{
                    padding-left: 15%;
                    width: 100%;
                }

                .body__description{
                    font-size: 12px;
                    line-height: 22px;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
}