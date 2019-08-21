import React, {useState} from 'react';
import FormPreview from './components/FormPreview';
import ResultSettings, {FontValues} from './components/ResultSettings';
import './App.css';
import FormCode from "./components/FormCode";
import FormSettings from "./components/FormSettings";
import ResultPreview from "./components/ResultPreview";
import {ColorResult} from "react-color";

const App: React.FC = () => {
    const [sites, setSites] = useState();
    const [textColor, setTextColor] = useState<ColorResult>({ hex: "#222222", hsl: { a: 100, h: 0, s: 0, l: 13 }, rgb: { r: 34, g: 34, b: 34} });
    const [linkColor, setLinkColor] = useState<ColorResult>({ hex: "#dc4b3c", hsl: { a: 100, h: 6, s: 70, l: 55 }, rgb: { r: 220, g: 75, b: 60 } });
    const [urlColor, setUrlColor] = useState<ColorResult>({ hex: "#20692b", hsl: { a: 100, h: 129, s: 53, l: 27}, rgb: { r: 32, g: 105, b: 43 } });
    const [headerColor, setHeaderColor] = useState<ColorResult>({ hex: "#ffffff", hsl: { a: 100, h: 0, s: 0, l: 100 }, rgb: { r: 255, g: 255, b: 255 } });
    const [backgroundColor, setBackgroundColor] = useState<ColorResult>({ hex: "#ffffff", hsl: { a: 100, h: 0, s: 0, l: 100 }, rgb: { r: 255, g: 255, b: 255 } });
    const [textFont, setTextFont] = useState<FontValues>("p");
    const [buttonText, setButtonText] = useState("Search");
    const [placeholderText, setPlaceholderText] = useState("Search…");
    const [showSearchButton, setShowSearchButton] = useState(true);

    return (
        <div className="App">
            <div className={"result"}>
                <div className={"header"}>
                    <h1>DuckDuckGo Search Box Generator</h1>
                    <h2>Add a custom DuckDuckGo search bar to your website</h2>
                </div>
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
            <div className={"settings"}>
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
                />
            </div>
            <section className={"credits"}>
                <p>Developed by <a href="https://patdryburgh.com">Pat Dryburgh</a></p>
                <p>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></p>
            </section>
        </div>
    );
};

export default App;
