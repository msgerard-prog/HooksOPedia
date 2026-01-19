import {useEffect, useState} from 'react'

function LifeCycleDemo()
{
    const[childCounter, setChildCounter] = useState(0);

    useEffect(() => {
        // api 
        console.log("Component mounted");       
        
        return () => {
            console.log("Component unmounted");
        };
    }, []); // empty array depencencies means it will run once after initial render

    useEffect(() => {
            console.log("Component rendered")
        
    }); // without the empty array parameter, it will run after every render

return(
    <div>
        <p>
            Child Counter: {childCounter} 
        </p>
        <button onClick={() => setChildCounter((o) => o + 1)}>
            Increment Child Counter
        </button>
    </div>
); 
}

export default LifeCycleDemo;