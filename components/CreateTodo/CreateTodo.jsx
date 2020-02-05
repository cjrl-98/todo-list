import {useState} from 'react';
import { Modal } from 'antd';
import { motion } from 'framer-motion';
import TodoForm from './TodoForm';

export default function CreateTodo(){
    const [isModal, setIsModal] = useState(false)
    const handleChangeModalState = () => {setIsModal(!isModal)};

    const modalOptions = {
      visible : isModal,
      onCancel : handleChangeModalState,
      footer: null,
      closable: false,
      centered: true,
      width: "fit-content",
    }

    const createTodoButtonOptions = {
      onClick : handleChangeModalState,
      animate : isModal ? { rotate: 140 } : { rotate: 0 },
      whileHover : { scale: 1.2 },
      whileTap : { scale: 0.8 }
    }

    return(
        <>  
            <motion.div {...createTodoButtonOptions} className="create-todo__button neumorphism--2">
              <img src="./create-todo.svg" alt="add new todo"/>
            </motion.div>
            <Modal {...modalOptions} >
              <TodoForm handleChangeModalState={handleChangeModalState}/>
            </Modal>
            <style jsx>{`
              :global(.ant-modal-content){
                border-radius: 25px;
              }
              :global(.create-todo__button){
                position: absolute;
                bottom: 112px;
                right: 144px;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
              }

              :glboal(.create-todo__button img){
                width: 50%;
              }
            `}</style>
        </>
    );
}