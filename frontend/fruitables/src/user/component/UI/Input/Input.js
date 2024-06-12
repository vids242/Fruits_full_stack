import React from 'react';
import { BaseInput, SpanError } from './Input.style';

function Input({ errorText, ...rest }) {
    return (
        <>
            <BaseInput
                {...rest}
            />
            <SpanError>
                {errorText}
            </SpanError>
        </>
    );
}

export default Input;