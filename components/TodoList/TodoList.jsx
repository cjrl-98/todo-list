import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import TodoCard from '../TodoCard/TodoCard';
import {StoreContext} from '../../context';

export default function TodoList(){
    const [ deleteMode, setDeleteMode ] = useState(false);
    const [ deleteItemsList, setDeleteItemsList ] = useState([]);
    const {todoList, setTodoList, handleDelete} = useContext(StoreContext);

    const displayList = () => todoList.map( todo => <TodoCard deleteMode={deleteMode} setDeleteItemsList={setDeleteItemsList} todo={todo} key={todo.id}/> ) 
    
    const sortTodoList = () => {
        const copyTodoList = [...todoList];
        const sortedToDoList = [...todoList].sort(function(x, y) {
            if(copyTodoList[0].status === false){
                return (x.status === y.status)? 0 : x.status? -1 : 1;
            }else{
                return (x.status === y.status) ? 0 : x.status ? 1 : -1;
            }
        }); 
        setTodoList(sortedToDoList);
    }

    const handleClearTodo = () => {
        setDeleteMode(!deleteMode);
        handleDelete(deleteItemsList);
    }

    const buttonOptions = {
        whileHover : { scale: 1.3},
        whileTap : { scale: 0.8 },
    }

    const deleteOptions = { animate : deleteMode ? { opacity: 0 } : {  opacity: 1, transition: { delay: 0.2 } } }

    const doneOptions = { 
        initial : { opacity: 0 },
        animate : deleteMode ? { y : -15, opacity: 1 } : { rotate: 0, y : 0, opacity: 0 } 
    }

    const plusOptions = { 
        initial : { opacity: 0 },
        animate : deleteMode ? { rotate: 135, y : 15, opacity: 1} : { rotate: 0, y : 0, opacity: 0 } 
    }

    return(
        <>
            <section className="todo-list neumorphism">
                <div className="todo-list__header">
                    <h2 className="header__title">Reminders</h2>
                    <div className="header__options">
                        <motion.img {...buttonOptions} onClick={sortTodoList} className="options__icon options__sort" src="./sort.svg" alt="sort todolist"/>
                            <div className="options__delete-container">
                                <motion.img onClick={handleClearTodo} {...doneOptions} {...buttonOptions} className="options__icon  options__done" src="./correct.svg" alt="plus todolist"/>
                                <motion.img onClick={()=>setDeleteMode(!deleteMode)} {...plusOptions} {...buttonOptions} className="options__icon  options__plus" src="./plus.svg" alt="plus todolist"/>
                                <motion.img onClick={()=>setDeleteMode(!deleteMode)} {...buttonOptions} {...deleteOptions} className="options__icon  options__delete" src="./bin.svg" alt="delete todolist"/> 
                            </div>
                    </div>
                </div>
                { todoList ? displayList() : null}
            </section>
            <style jsx>{`
                .todo-list{
                    overflow: auto;
                    width: 375px;
                    height: 640px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 25px;
                    color: #707070;
                }

                .todo-list::-webkit-scrollbar { 
                    width: 0 !important 
                }

                .todo-list { 
                    overflow: -moz-scrollbars-none; 
                }

                .todo-list { 
                    -ms-overflow-style: none; 
                }

                .todo-list__header{
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 5px solid #2782FF;
                    padding: 32px;
                    background-color: #FFFFFF;
                }
                
                .header__title{
                    font-size: 20px;
                    font-weight: 500;
                    color: #505F79;
                }

                .header__options{
                    display: flex;
                }

                :global(.options__delete-container){
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }

                :global(.options__delete){
                    position: absolute;
                }

                :global(.options__icon){
                    height: 23px;
                }

                :global(.options__done){
                    position: absolute;
                }
            
                :global(.options__sort){
                    height: 23px;
                    margin-right: 14px;
                }

                :global(.options__plus){
                    width: 23px;
                    height: 23px;
                    background-color: #2782FF;
                    border-radius: 50%;
                    padding: 5px;
                }
            `}</style>
        </>
    );
}