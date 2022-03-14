import "./styles.css";
import { useHistory, useLocation } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";
import { useState } from "react";

const GeneratedMeme = () => {
    const [copied, setCopied] = useState(false);

    const clipboard = useClipboard();
    const history = useHistory();
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');

    //   console.log(url);

    const handleClick = () => {
        history.push("/");
    };

    const copyLink = () => {
        clipboard.copy(url);
        setCopied(true);
    };

    return (
        <div className="container">
            <button onClick={handleClick} className="home">
                Make More...
            </button>
            {url && <img src={url} alt="generated-meme" />}
            <button className="copy" onClick={copyLink}>
                {copied ? "Link Copied" : "Copy Link"}
            </button>
        </div>
    );
};

export default GeneratedMeme;
