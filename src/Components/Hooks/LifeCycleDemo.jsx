import { useEffect, useState, useRef } from "react";

function LifeCycleDemo({ parentCounter }) {
  const [childCounter, setChildCounter] = useState(0);

  const [inputValue, setInputValue] = useState("");

  // Note: Updating useRef does not cause re-render like useState does
  const isFirstRender = useRef(true);
  const inputRef = useRef(null);
  const renderCount = useRef(1);
  const prevCounter = useRef();

  // NOTE: React uses useEffect in the order it was defined. So, need to be careful while defining multiple useEffects

  useEffect(() => {
    console.log("Component rendered");
  }); // without the empty array parameter, it will run after every render

  useEffect(() => {
    // api
    if (isFirstRender.current) {
      return;
    }
    console.log("Child Counter Update Effect - Child Counter: ", childCounter);
    prevCounter.current = childCounter;
    return () => {};
  }, [childCounter]);

  useEffect(() => {
    // api
    if (isFirstRender.current) {
      return;
    }
    console.log(
      "Parent Counter Update Effect - Parent Counter: ",
      parentCounter,
    );

    return () => {};
  }, [parentCounter]);

  useEffect(() => {
    // api
    console.log("Component mounted");

    isFirstRender.current = false;
    inputRef.current?.focus();

    return () => {
      console.log("Component unmounted");
    };
  }, []); // empty array depencencies means it will run once after initial render

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log("Render Count: ", renderCount.current);
  }); // no dependencies, so runs after every render

  return (
    <div>
      <p>
        Child Counter: {childCounter} -- Previous Value: {prevCounter.current}
      </p>
      <p>Total Renders: {renderCount.current}</p>
      <button onClick={() => setChildCounter((o) => o + 1)}>
        Increment Child Counter
      </button>
      <br />
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Auto-focus on mount"
      />
    </div>
  );
}

export default LifeCycleDemo;
