import React, {FormEvent} from 'react';
import {ColorResult} from 'react-color';
import ColorPicker from "../ColorPicker";

export type FontValues = "a" | "c" | "g" | "h" | "p" | "n" | "e" | "s" | "o" | "t" | "b" | "v";

export interface ResultSettingsValuesProps {
    sites: string,
    textColor: ColorResult,
    linkColor: ColorResult,
    urlColor: ColorResult,
    backgroundColor: ColorResult,
    textFont: FontValues,
    headerColor: ColorResult,
}

interface ResultSettingsProps extends ResultSettingsValuesProps {
    setTextColor: (s: ColorResult) => void,
    setLinkColor: (s: ColorResult) => void,
    setUrlColor: (s: ColorResult) => void,
    setHeaderColor: (s: ColorResult) => void,
    setBackgroundColor: (s: ColorResult) => void,
    setTextFont: (f: FontValues) => void,
    setSites: (s: string) => void,
    reset: () => void,
}

const ResultSettings: React.FC<ResultSettingsProps> = (props) => {
    return (
        <section>
            <h2>Results Page Settings</h2>
            <p>Customize the DuckDuckGo results page</p>
            <label className="label" htmlFor={"sites"}>Site Search</label>
            <input
                name={"sites"}
                type={"text"}
                placeholder={"ex: example.com"}
                value={props.sites}
                onChange={(e: FormEvent<HTMLInputElement>) => props.setSites(e.currentTarget.value)}
            />
            <p className={"hint"}>
                <del>Add multiple addresses separated by commas: example.com,anotherexample.com,justabox.wtf</del>
            </p>
            <p className={"hint"}>
                Evidently, searching for multiple addresses by passing a comma-separated list of URLs no longer works. If you know of another solution for searching multiple domains that doesn't require the use of JavaScript, please [let me know](mailto:ddg@patdryburgh.com);
            </p>
            <label className="label" htmlFor={"textFont"}>Text Font</label>
            <select
                name={"textFont"}
                value={props.textFont}
                onChange={(e: FormEvent<HTMLSelectElement>) => props.setTextFont(e.currentTarget.value as FontValues)}
            >
                <option value="a">Arial</option>
                <option value="c">Century Gothic</option>
                <option value="g">Georgia</option>
                <option value="h">Helvetica</option>
                <option value="p">Proxima Nova (default)</option>
                <option value="n">Sans-serif</option>
                <option value="e">Segoe UI</option>
                <option value="s">Serif</option>
                <option value="o">Tahoma</option>
                <option value="t">Times</option>
                <option value="b">Trebuchet MS</option>
                <option value="v">Verdana</option>
            </select>
            <p className={"hint"}>
                Only fonts you and your users have installed will display when selected. Otherwise, the font will fall back to the style of the selected font.
            </p>
            <div className={"color-pickers"}>
                <ColorPicker
                    label="Background Color"
                    color={props.backgroundColor}
                    setColor={props.setBackgroundColor}
                />
                <ColorPicker
                    label={"Link Color"}
                    color={props.linkColor}
                    setColor={props.setLinkColor}
                />
                <ColorPicker
                    label={"URL Color"}
                    color={props.urlColor}
                    setColor={props.setUrlColor}
                />
                <ColorPicker
                    label={"Text Color"}
                    color={props.textColor}
                    setColor={props.setTextColor}
                />
                <ColorPicker
                    label="Header Color"
                    color={props.headerColor}
                    setColor={props.setHeaderColor}
                />
                <p className={"hint"}>
                    DuckDuckGo will automatically set the text color in the header based on your selected header color.
                </p>
            </div>
            <hr />
            <button onClick={props.reset} className={"btn btn--danger btn--sm"}>Reset All Settings</button>
        </section>
    )
};

export default ResultSettings;