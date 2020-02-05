import { motion, AnimatePresence } from 'framer-motion';

export default function Label ({text}) {

    const todoCardOptions = {
        key : text,
        initial : { scale: 0, opacity: 0 },
        animate : { 
            scale: 1, 
            opacity: 1
        },
        exit : {
            scale: 0, 
            opacity: 0
        }
    }

    return(
        <>
            <AnimatePresence>
                <motion.div {...todoCardOptions} className="label neumorphism--2">{text}</motion.div>
            </AnimatePresence>
            <style jsx>{`
                :global(.label){
                    background-color: #FFC500;
                    font-size: 10px;
                    font-weight: 700;
                    color: #FFFFFF;
                    border-radius: 25px;
                    padding: 8px 16px;
                    margin-right: 16px;
                }   
            `}</style>
        </>
    );
}