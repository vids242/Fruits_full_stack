import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dicrement, increment } from '../../../redux/slice/counter.slice';

function Counter(props) {
    const dispatch = useDispatch()

    const CounterVal = useSelector(state => state.counter);
    console.log(CounterVal);

    const hendalInc = () => {
        dispatch(increment())
    }

    const hendalDic = () => {
        dispatch(dicrement())
    }

    return (
        <div>
            <button onClick={hendalInc}>+</button>
            {CounterVal.count}
            <button onClick={hendalDic}>-</button>
        </div>
    );
}

export default Counter;