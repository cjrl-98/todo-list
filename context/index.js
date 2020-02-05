import {useState, createContext} from 'react';
import uuid from "uuid";

export const StoreContext = createContext();

export const StoreProvider = (props) => {
    const [todoList, setTodoList] = useState([
        {   
            "id" : "51f724b4-bb96-48d1-b2ed-e48e5f399e1b",
            "status" : false,
            "title" : "Meeting with Dev Team about new interns",
            "date" : "Wed Feb 12 2020 08:10:17 GMT-0500 (Eastern Standard Time)",
            "labels" : ["Development", "Team"],
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elite, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {   
            "id" : "19dd5dff-788d-4a6b-b877-1ab3223438f0",
            "status" : true,
            "title" : "Animation controls",
            "date" : "Wed Feb 13 2020 08:10:17 GMT-0500 (Eastern Standard Time)",
            "labels" : [],
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {   
            "id" : "ac9277ba-6185-4930-a440-aae01fee3104",
            "status" : false,
            "title" : "Starting an animation",
            "date" : "Wed Feb 05 2020 01:45:08 GMT-0500 (Eastern Standard Time)",
            "labels" : [],
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        }
    ]);

    const [currentTodo, setCurrentTodo] = useState("51f724b4-bb96-48d1-b2ed-e48e5f399e1b");
    
    const handleNewTodo = (title, date, labels, description) => {
        setTodoList([ ...todoList, 
            {
                "id" : uuid.v4(),
                "status" : false,
                "title" : title,
                "date" : `${date}`,
                "labels" : labels,
                "description" : description
            }
        ])
    }

    const handleKeyUpdate = (id, key, value) => {
        // look for the object that matches the id given & update the key=value pair of the object
        setTodoList(
            prevState => prevState.map( todo => todo.id === id ? { ...todo, [key] : value }: todo ) 
        )           
    }  

    const handleDelete = idArray => {
        if(idArray !== []){
            setTodoList( prevState => prevState.filter(todo => !idArray.includes(todo.id)));
            setCurrentTodo(null);
        }
    }

    return(
        <StoreContext.Provider value={{todoList, setTodoList, handleNewTodo, handleKeyUpdate, currentTodo, setCurrentTodo, handleDelete}}>
            {props.children}
        </StoreContext.Provider>
    );
}