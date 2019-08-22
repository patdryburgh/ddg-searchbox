import React, {FormEvent, useContext} from 'react';

export interface FormSettingsValuesProps {
    buttonText: string,
    placeholderText: string,
    showSearchButton: boolean;
}

interface FormSettingsProps extends FormSettingsValuesProps {
    setButtonText: (s: string) => void,
    setPlaceholderText: (s: string) => void,
    setShowSearchButton: (b: boolean) => void,
}

const FormSettings: React.FC<FormSettingsProps> = (props) => {

    return (
        <section>
            <h2>Form Settings</h2>
            <p>Customize the form for your site</p>
            <label htmlFor={"showSearchButton"} className={"label checkbox-container"}>
                <input
                    name={"showSearchButton"}
                    type={"checkbox"}
                    id={"showSearchButton"}
                    checked={props.showSearchButton}
                    onChange={(e: FormEvent<HTMLInputElement>) => props.setShowSearchButton(e.currentTarget.checked)}
                /> Show Button
            </label>
            <label htmlFor={"buttonText"} className={"label"}>Button Text</label>
            <input
                name={"buttonText"}
                type={"text"}
                placeholder={"Button Text"}
                value={props.buttonText}
                onChange={(e: FormEvent<HTMLInputElement>) => props.setButtonText(e.currentTarget.value)}
            />
            {props.buttonText === "" &&
                <p className={"hint error"}>
                    Button text is required even if you are hiding the search button.
                </p>}
            <label htmlFor={"placeholderText"} className={"label"}>Placeholder Text</label>
            <input
                name={"placeholderText"}
                type={"text"}
                placeholder={"Placeholder Text"}
                value={props.placeholderText}
                onChange={(e: FormEvent<HTMLInputElement>) => props.setPlaceholderText(e.currentTarget.value)}
            />
            <p className={"hint alert"}>
                This generator does not offer CSS styling of your form. Copy and paste the form's code into your site and it will adopt your site's styling.
            </p>
        </section>
    )
};

export default FormSettings;