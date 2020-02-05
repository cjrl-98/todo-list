import TodoList from '../TodoList/TodoList';
import CreateTodo from '../CreateTodo/CreateTodo';

export default function Layout(){
    return(
        <>
            <main className="main">
                <div className="main__layout">
                    <TodoList/>
                    <CreateTodo/>
                </div>
                
            </main>
            <style jsx global>{`
                .main{
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #eee;
                }

                .main__layout{
                    position: relative;
                    width: fit-content;
                    display: flex;
                    justify-content: center;
                    padding: 80px 104px;
                    border-radius: 25px;
                }
                
                .neumorphism{
                    box-shadow: 7px 7px 9px rgba(0,0,0,0.15), -7px -7px 9px rgba(255,255,255,0.65);
                }

                .neumorphism--2{
                    box-shadow: 3px 3px 5px rgba(0,0,0,0.15), -3px -3px 5px rgba(255,255,255,0.65);
                }
            `}</style>
        </>
    );
}