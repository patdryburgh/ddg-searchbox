import React, { useEffect, useState, useMemo, useCallback } from "react";
import FormPreview from "./components/FormPreview";
import ResultSettings, {
  FontValues,
  ResultSettingsValuesProps,
} from "./components/ResultSettings";
import "./App.css";
import FormCode from "./components/FormCode";
import FormSettings, { FormSettingsValuesProps } from "./components/FormSettings";
import ResultPreview from "./components/ResultPreview";
import { ColorResult } from "react-color";

const initialValues: FormSettingsValuesProps & ResultSettingsValuesProps = {
  sites: "",
  textColor: {
    hex: "#222222",
    hsl: { a: 100, h: 0, s: 0, l: 13 },
    rgb: { r: 34, g: 34, b: 34 },
  },
  linkColor: {
    hex: "#00278e",
    hsl: { a: 100, h: 224, s: 100, l: 28 },
    rgb: { r: 0, g: 39, b: 142 },
  },
  urlColor: {
    hex: "#20692b",
    hsl: { a: 100, h: 129, s: 53, l: 27 },
    rgb: { r: 32, g: 105, b: 43 },
  },
  headerColor: {
    hex: "#fafafa",
    hsl: { a: 100, h: 0, s: 0, l: 98 },
    rgb: { r: 250, g: 250, b: 250 },
  },
  backgroundColor: {
    hex: "#ffffff",
    hsl: { a: 100, h: 0, s: 0, l: 100 },
    rgb: { r: 255, g: 255, b: 255 },
  },
  textFont: "p",
  buttonText: "Search",
  placeholderText: "Search…",
  showSearchButton: true,
};

const App: React.FC = () => {
  const [sites, setSites] = useState(initialValues.sites);
  const [textColor, setTextColor] = useState<ColorResult>(
    initialValues.textColor
  );
  const [linkColor, setLinkColor] = useState<ColorResult>(
    initialValues.linkColor
  );
  const [urlColor, setUrlColor] = useState<ColorResult>(initialValues.urlColor);
  const [headerColor, setHeaderColor] = useState<ColorResult>(
    initialValues.headerColor
  );
  const [backgroundColor, setBackgroundColor] = useState<ColorResult>(
    initialValues.backgroundColor
  );
  const [textFont, setTextFont] = useState<FontValues>(initialValues.textFont);
  const [buttonText, setButtonText] = useState(initialValues.buttonText);
  const [placeholderText, setPlaceholderText] = useState(
    initialValues.placeholderText
  );
  const [showSearchButton, setShowSearchButton] = useState(
    initialValues.showSearchButton
  );

  const localState = useMemo(
    () => ({
      sites: { effect: setSites, value: sites, defaultValue: initialValues.sites },
      textColor: {
        effect: setTextColor,
        value: textColor,
        defaultValue: initialValues.textColor,
      },
      linkColor: {
        effect: setLinkColor,
        value: linkColor,
        defaultValue: initialValues.linkColor,
      },
      urlColor: {
        effect: setUrlColor,
        value: urlColor,
        defaultValue: initialValues.urlColor,
      },
      headerColor: {
        effect: setHeaderColor,
        value: headerColor,
        defaultValue: initialValues.headerColor,
      },
      backgroundColor: {
        effect: setBackgroundColor,
        value: backgroundColor,
        defaultValue: initialValues.backgroundColor,
      },
      textFont: {
        effect: setTextFont,
        value: textFont,
        defaultValue: initialValues.textFont,
      },
      buttonText: {
        effect: setButtonText,
        value: buttonText,
        defaultValue: initialValues.buttonText,
      },
      placeholderText: {
        effect: setPlaceholderText,
        value: placeholderText,
        defaultValue: initialValues.placeholderText,
      },
      showSearchButton: {
        effect: setShowSearchButton,
        value: showSearchButton,
        defaultValue: initialValues.showSearchButton,
      },
    }),
    [
      sites,
      textColor,
      linkColor,
      urlColor,
      headerColor,
      backgroundColor,
      textFont,
      buttonText,
      placeholderText,
      showSearchButton,
    ]
  );

  const persistState = useCallback(() => {
    localStorage.setItem(
      "state",
      JSON.stringify(
        Object.keys(localState).reduce((acc, key) => {
          return { ...acc, [key]: (localState as any)[key].value };
        }, {})
      )
    );
  }, [localState]);

  // Restore once + attach beforeunload once
  useEffect(() => {
    const stored = localStorage.getItem("state");
    if (stored) {
      Object.entries(JSON.parse(stored)).forEach(([key, value]) => {
        const entry = (localState as any)[key];
        if (entry && entry.effect) entry.effect(value);
      });
    }

    const onBeforeUnload = () => persistState();
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => window.removeEventListener("beforeunload", onBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once

  // Persist whenever values change
  useEffect(() => {
    persistState();
  }, [persistState]);

  const reset = () => {
    const y = window.confirm("Are you sure you want to reset all of your settings?");
    if (y) {
      localStorage.removeItem("state");
      Object.values(localState).forEach((s: any) => s.effect(s.defaultValue));
    }
  };

  return (
    <div className="App">
      <div className={"header"}>
        <a href={"/"}>
          <img src={"/duck.png"} alt={"Logo"} className={"logo"} />
        </a>
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
          Designed &amp; developed by{" "}
          <a href="https://patdryburgh.com">Pat Dryburgh</a>.<br />
          This generator has not been authorized nor is it endorsed by DuckDuckGo.
          <br />
          I just really like DuckDuckGo because it's{" "}
          <a href="https://duckduckgo.com">
            the search engine that doesn't track you
          </a>
          .<br />
          Additional parameters for your form can be found on the{" "}
          <a href="https://duckduckgo.com/params">URL Parameters page</a>.
        </p>
        <p>
          <a href="https://github.com/patdryburgh/ddg-searchbox/issues">
            Help/Issues/Code
          </a>
        </p>
      </section>
    </div>
  );
};

export default App;