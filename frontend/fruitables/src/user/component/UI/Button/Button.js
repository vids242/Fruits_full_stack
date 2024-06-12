import React from 'react';
import { PrimaryButton, SecondaryButton } from './Button.style';

function Button({ children, btnType = "primary", btnDisable = false, ...rest }) {
    console.log(btnType);

    const checkButtonType = () => {
        switch (btnType) {
            case "primary":
                return PrimaryButton;
            case "secondry":
                return SecondaryButton;
            default:
                return PrimaryButton;
        }
    }

    const CustomButton = checkButtonType()

    return (
        <CustomButton disabled={btnDisable} {...rest}>
            {children}
        </CustomButton>
    );


}

export default Button;