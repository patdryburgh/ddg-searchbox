import React, {useState} from 'react';
import {ColorResult, SketchPicker} from "react-color";

interface ColorPickerProps {
    label: string,
    color: ColorResult,
    setColor: (s: ColorResult) => void,
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const [showPicker, togglePicker] = useState(false);
    const buttonStyle = {
        background: props.color.hex
    };

    let pickerContainer = React.createRef<SketchPicker>();
    const handleClick = () => {
        togglePicker(!showPicker);
    };
    return (
        <div className={"color-picker"}>
            <label className="label">{props.label}</label>
            <button
                className={"color-picker__selected"}
                onClick={handleClick}
                style={buttonStyle}
            >
                {props.color.hex}
            </button>
            {showPicker &&
                <div className={"color-picker__picker"}>
                    <button className={"color-picker__cover"} onClick={handleClick}>
                        Close Picker
                    </button>
                    <SketchPicker
                        color={props.color.hex}
                        onChange={(color: ColorResult) => props.setColor(color)}
                        disableAlpha={true}
                        ref={pickerContainer}
                    />
                </div>}
        </div>
    )
};

export default ColorPicker;