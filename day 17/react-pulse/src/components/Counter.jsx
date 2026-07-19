const Counter = ({
  count,
  increase,
  decrease,
  increaseFive,
  decreaseFive,
  reset,
}) => {
  return (
    <section className="counter">

      <h2>Counter Value</h2>

      <h1>{count}</h1>

      <div className="buttons">
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
        <button onClick={increaseFive}>+5</button>
        <button onClick={decreaseFive}>-5</button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>

    </section>
  );
};

export default Counter;