import React, {useState} from "react";
import {ResultSettingsValuesProps} from "../ResultSettings";
import {FormSettingsValuesProps} from "../FormSettings";

type FormCodeProps = {showSearchButton: boolean} & ResultSettingsValuesProps & FormSettingsValuesProps;

const FormCode: React.FC<FormCodeProps> = (props) => {
    const [copyState, setCopyState] = useState(false);
    const sites: string = props.sites ? props.sites : "";
    const buttonStyle = !props.showSearchButton && props.buttonText !== "" ? " style=\"visibility: hidden\"" : "";
    const formCode: string = "<form method=\"get\" id=\"ddgSearch\" action=\"https://duckduckgo.com/\">\n" +
        "    <input type=\"hidden\" name=\"sites\" value=\"" + sites + "\"/>\n" +
        "    <input type=\"hidden\" name=\"k7\" value=\"" + props.backgroundColor.hex + "\"/>\n" +
        "    <input type=\"hidden\" name=\"k8\" value=\"" + props.textColor.hex + "\"/>\n" +
        "    <input type=\"hidden\" name=\"k9\" value=\"" + props.linkColor.hex + "\"/>\n" +
        "    <input type=\"hidden\" name=\"kx\" value=\"" + props.urlColor.hex + "\"/>\n" +
        "    <input type=\"hidden\" name=\"kj\" value=\"" + props.headerColor.hex + "\"/>\n" +
        "    <input type=\"hidden\" name=\"kt\" value=\"" + props.textFont + "\"/>\n" +
        "    <input type=\"text\" name=\"q\" placeholder=\"" + props.placeholderText + "\" aria-label=\"Search " + sites + " on DuckDuckGo\"/>\n" +
        "    <button type=\"submit\"" + buttonStyle + ">" + props.buttonText + "</button>\n" +
        "</form>";

    let textarea = React.createRef<HTMLTextAreaElement>();
    const copyToClipboard = (e: any) => {
        textarea.current && textarea.current.select();
        document.execCommand('copy');
        setCopyState(true);
        setTimeout(() => setCopyState(false), 2000);
    };

    return (
        <section>
            <h2>Get the code!</h2>
            <textarea
                ref={textarea}
                value={formCode}
                readOnly
                className={"form-code"}
                rows={11}
            />
            <button onClick={copyToClipboard} className={copyState ? "btn btn--primary" : "btn"}>
                {copyState ? "Copied!" : "Copy to Clipboard"}
            </button>
        </section>
    )
};

export default FormCode;