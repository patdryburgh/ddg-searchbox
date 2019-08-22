import React from 'react';
import {ResultSettingsValuesProps} from "../ResultSettings";
import {FormSettingsValuesProps} from "../FormSettings";
import {ColorResult} from "react-color";

type ResultPreviewProps = ResultSettingsValuesProps & FormSettingsValuesProps;

type font = {
    value: string,
    font: string,
}

const fonts: font[] = [
    {
        value: "a",
        font: "Arial, sans-serif",
    },
    {
        value: "c",
        font: "Century Gothic, sans-serif",
    },
    {
        value: "g",
        font: "Georgia, serif",
    },
    {
        value: "h",
        font: "Helvetica, sans-serif",
    },
    {
        value: "p",
        font: "Proxima Nova, sans-serif",
    },
    {
        value: "n",
        font: "Sans-serif",
    },
    {
        value: "e",
        font: "Segoe UI, sans-serif",
    },
    {
        value: "s",
        font: "Serif",
    },
    {
        value: "o",
        font: "Tahoma, sans-serif",
    },
    {
        value: "t",
        font: "Times, serif",
    },
    {
        value: "b",
        font: "Trebuchet MS, sans-serif",
    },
    {
        value: "v",
        font: "Verdana, sans-serif",
    }
];

const headerIsBright = function (c: ColorResult) {
    return ((c.rgb.r * 299 + c.rgb.g * 587 + c.rgb.b * 114) / 1000) > 127;
};

const ResultPreview: React.FC<ResultPreviewProps> = (props) => {
    const bodyStyle = {
        background: props.backgroundColor.hex,
        color: props.textColor.hex,
        fontFamily: fonts.filter((f: font) => f.value === props.textFont).map((f: font) => f.font)[0],
    };
    const headerStyle = {
        background: props.headerColor.hex,
        color: headerIsBright(props.headerColor) ? "rgb(51,51,51)" : "rgb(215,215,215)",
        fontFamily: fonts.filter((f: font) => f.value === props.textFont).map((f: font) => f.font)[0],
    };
    const linkStyle = {
        color: props.linkColor.hex,
        fontFamily: fonts.filter((f: font) => f.value === props.textFont).map((f: font) => f.font)[0],
    };
    const textStyle = {
        color: props.textColor.hex,
        fontFamily: fonts.filter((f: font) => f.value === props.textFont).map((f: font) => f.font)[0],
    };
    const urlStyle = {
        color: props.urlColor.hex,
        fontFamily: fonts.filter((f: font) => f.value === props.textFont).map((f: font) => f.font)[0],
    };
    return (
        <section>
            <h2>Results Page Preview</h2>
            <div className={"result-preview"}>
                <div className={"result-preview__header"} style={headerStyle}>
                    DuckDuckGo Results Page Header
                </div>
                <div className={"result-preview__body"} style={bodyStyle}>
                    <a
                        href={"https://wonderful.threadless.com"}
                        className={"result__a"}
                        style={linkStyle}
                    >
                        A Wonderful Shop of Wonderful Wonders
                    </a>
                    <div className="result__extras">
                        <div className="result__extras__url">
                            <span className="result__icon">
                                <a href="https://wonderful.threadless.com">
                                    <img
                                        alt="wonderful.threadless.com"
                                        src="/favicon.ico"
                                    />
                                </a>
                            </span>
                            <a
                                href="https://wonderful.threadless.com/"
                                rel="noopener"
                                className="result__url js-result-extras-url"
                                style={urlStyle}
                            >
                                <span className="result__url__domain">https://wonderful.threadless.com</span>
                            </a>
                        </div>
                    </div>
                    <div
                        className="result__snippet js-result-snippet"
                        style={textStyle}
                    >
                        <b>A</b> <b>Wonderful</b> <b>Shop</b> <b>of</b> <b>Wonderful</b> <b>Wonders</b> | Featuring custom t-shirts, prints, and more
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ResultPreview;