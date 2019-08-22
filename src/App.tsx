import React, {useEffect, useState} from 'react';
import FormPreview from './components/FormPreview';
import ResultSettings, {FontValues} from './components/ResultSettings';
import './App.css';
import FormCode from "./components/FormCode";
import FormSettings from "./components/FormSettings";
import ResultPreview from "./components/ResultPreview";
import {ColorResult} from "react-color";

const App: React.FC = () => {
    const [sites, setSites] = useState("");
    const [textColor, setTextColor] = useState<ColorResult>({ hex: "#222222", hsl: { a: 100, h: 0, s: 0, l: 13 }, rgb: { r: 34, g: 34, b: 34} });
    const [linkColor, setLinkColor] = useState<ColorResult>({ hex: "#00278e", hsl: { a: 100, h: 224, s: 100, l: 28 }, rgb: { r: 0, g: 39, b: 142 } });
    const [urlColor, setUrlColor] = useState<ColorResult>({ hex: "#20692b", hsl: { a: 100, h: 129, s: 53, l: 27}, rgb: { r: 32, g: 105, b: 43 } });
    const [headerColor, setHeaderColor] = useState<ColorResult>({ hex: "#fafafa", hsl: { a: 100, h: 0, s: 0, l: 98 }, rgb: { r: 250, g: 250, b: 250 } });
    const [backgroundColor, setBackgroundColor] = useState<ColorResult>({ hex: "#ffffff", hsl: { a: 100, h: 0, s: 0, l: 100 }, rgb: { r: 255, g: 255, b: 255 } });
    const [textFont, setTextFont] = useState<FontValues>("p");
    const [buttonText, setButtonText] = useState("Search");
    const [placeholderText, setPlaceholderText] = useState("Search…");
    const [showSearchButton, setShowSearchButton] = useState(true);
    const [isInitialMount, setIsInitialMount] = useState(true);

    const localState: any = {
        sites: {
            effect: setSites,
            value: sites,
            defaultValue: "",
        },
        textColor: {
            effect: setTextColor,
            value: textColor,
            defaultValue: { hex: "#222222", hsl: { a: 100, h: 0, s: 0, l: 13 }, rgb: { r: 34, g: 34, b: 34} },
        },
        linkColor: {
            effect: setLinkColor,
            value: linkColor,
            defaultValue: { hex: "#00278e", hsl: { a: 100, h: 224, s: 100, l: 28 }, rgb: { r: 0, g: 39, b: 142 } },
        },
        urlColor: {
            effect: setUrlColor,
            value: urlColor,
            defaultValue: { hex: "#20692b", hsl: { a: 100, h: 129, s: 53, l: 27}, rgb: { r: 32, g: 105, b: 43 } },
        },
        headerColor: {
            effect: setHeaderColor,
            value: headerColor,
            defaultValue: { hex: "#fafafa", hsl: { a: 100, h: 0, s: 0, l: 98 }, rgb: { r: 250, g: 250, b: 250 } },
        },
        backgroundColor: {
            effect: setBackgroundColor,
            value: backgroundColor,
            defaultValue: { hex: "#ffffff", hsl: { a: 100, h: 0, s: 0, l: 100 }, rgb: { r: 255, g: 255, b: 255 } },
        },
        textFont: {
            effect: setTextFont,
            value: textFont,
            defaultValue: "p",
        },
        buttonText: {
            effect: setButtonText,
            value:  buttonText,
            defaultValue: "Search",
        },
        placeholderText: {
            effect: setPlaceholderText,
            value: placeholderText,
            defaultValue: "Search…",
        },
        showSearchButton: {
            effect: setShowSearchButton,
            value: showSearchButton,
            defaultValue: true,
        },
    };


    useEffect(() => {
        const onBeforeUnload = () => {
            localStorage.setItem('state', JSON.stringify(
                Object.keys(localState).reduce((acc, key) => ({...acc, [key]: localState[key].value}), {})
            ))
        };

        if (isInitialMount) {
            // do initial mount things
            window.addEventListener('beforeunload', onBeforeUnload);
            const localStorageState = localStorage.getItem('state');
            if (localStorageState) {
                Object.entries(JSON.parse(localStorageState)).forEach(([key, value]) => {
                    localState[key].effect(value);
                });
            }
            setIsInitialMount(false);
        }

        localStorage.setItem('state', JSON.stringify(
            Object.keys(localState).reduce((acc, key) => ({...acc, [key]: localState[key].value}), {})
        ));

        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
        }
    }, [isInitialMount, localState]);

    const reset = () => {
        const y = window.confirm('Are you sure you want to reset all of your settings?');
        if (y) {
            localStorage.removeItem('state');
            Object.values(localState).forEach((s: any) => {
                s.effect(s.defaultValue)
            })
        }
    };

    return (
        <div className="App">
            <div className={"header"}>
                <h1>DuckDuckGo Search Box Generator</h1>
                <h2>Add a custom DuckDuckGo search box to your website</h2>
            </div>
            <div className={"grid"}>
                <FormSettings
                    buttonText={buttonText}
                    setButtonText={setButtonText}
                    placeholderText={placeholderText}
                    setPlaceholderText={setPlaceholderText}
                    showSearchButton={showSearchButton}
                    setShowSearchButton={setShowSearchButton}
                />
                <ResultSettings
                    sites={sites}
                    setSites={setSites}
                    textColor={textColor}
                    setTextColor={setTextColor}
                    linkColor={linkColor}
                    setLinkColor={setLinkColor}
                    urlColor={urlColor}
                    setUrlColor={setUrlColor}
                    headerColor={headerColor}
                    setHeaderColor={setHeaderColor}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    textFont={textFont}
                    setTextFont={setTextFont}
                    reset={reset}
                />
                <div className={"preview"}>
                    <FormPreview
                        textColor={textColor}
                        linkColor={linkColor}
                        urlColor={urlColor}
                        headerColor={headerColor}
                        backgroundColor={backgroundColor}
                        textFont={textFont}
                        sites={sites}
                        buttonText={buttonText}
                        placeholderText={placeholderText}
                        showSearchButton={showSearchButton}
                    />
                    <ResultPreview
                        textColor={textColor}
                        linkColor={linkColor}
                        headerColor={headerColor}
                        backgroundColor={backgroundColor}
                        urlColor={urlColor}
                        textFont={textFont}
                        sites={sites}
                        buttonText={buttonText}
                        placeholderText={placeholderText}
                        showSearchButton={showSearchButton}
                    />
                    <FormCode
                        sites={sites}
                        textColor={textColor}
                        linkColor={linkColor}
                        backgroundColor={backgroundColor}
                        urlColor={urlColor}
                        headerColor={headerColor}
                        textFont={textFont}
                        buttonText={buttonText}
                        placeholderText={placeholderText}
                        showSearchButton={showSearchButton}
                    />
                </div>
            </div>
            <section className={"credits"}>
                <p>
                    Designed &amp; developed by <a href="https://patdryburgh.com">Pat Dryburgh</a>.<br />
                    This generator has not been authorized nor is it endorsed by DuckDuckGo.<br />
                    I just really like DuckDuckGo because it's <a href="https://duckduckgo.com">the search engine that doesn't track you</a>.<br />
                    Additional parameters for your form can be found on the <a href="https://duckduckgo.com/params">URL Parameters page</a>.
                </p>
                <p>
                    <a href="https://github.com/patdryburgh/ddg-searchbox/issues">Help/Issues/Code</a>
                </p>
            </section>
        </div>
    );
};

export default App;
