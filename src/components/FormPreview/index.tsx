import React from "react";
import {ResultSettingsValuesProps} from "../ResultSettings";
import {FormSettingsValuesProps} from "../FormSettings";

type FormPreviewProps = ResultSettingsValuesProps & FormSettingsValuesProps;

const FormPreview: React.FC<FormPreviewProps> = (props) => {
    return (
        <section>
            <h2>Form Preview</h2>
            <p>For a live preview of your settings, enter a search term and hit return</p>
            <form method="get" className={"form-preview"} id="search" action="https://duckduckgo.com/">
                <input type="hidden" name="sites" value={props.sites}/>
                <input type="hidden" name="k7" value={props.backgroundColor.hex}/>
                <input type="hidden" name="k8" value={props.textColor.hex}/>
                <input type="hidden" name="k9" value={props.linkColor.hex}/>
                <input type="hidden" name="kx" value={props.urlColor.hex}/>
                <input type="hidden" name="kj" value={props.headerColor.hex}/>
                <input type="hidden" name="kt" value={props.textFont}/>
                <input type="text" name="q" placeholder={props.placeholderText} aria-label={"Search " + props.sites + " on DuckDuckGo"}/>
                <button type="submit" style={props.showSearchButton ? {} : {visibility: "hidden"}} className={"btn btn--primary"}>{props.buttonText}</button>
            </form>
        </section>
    )
};

export default FormPreview;