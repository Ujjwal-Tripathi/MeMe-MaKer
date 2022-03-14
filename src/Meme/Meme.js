import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import "./styles.css";

const axios = require("axios");

const Meme = () => {
    const [memes, setMemes] = useState([]);
    const [idx, setIdx] = useState(0);
    const [captions, setCaptions] = useState([]);
    const history = useHistory();

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };

    const handleSkip = () => {
        setIdx(idx + 1);
    };

    const updateCaption = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c, i) => {
                if (i === index) return text;
                else return c;
            })
        )
    }

    const generateMeme = () => {
        const currentMeme = memes[idx];
        const formData = new FormData();

        formData.append('username', 'rishabh_devbanshi');
        formData.append('password', 'rdevbanshi35@');
        formData.append('template_id', currentMeme.id);

        captions.forEach((c, index) => {
            formData.append(`boxes[${index}][text]`, c);
        })

        axios.post('https://api.imgflip.com/caption_image', formData)
            .then(res => {
                return res.data;
            })
            .then(res => {
                history.push(`/generated?url=${res.data.url}`);
            });

    }

    useEffect(() => {
        axios
            .get("https://api.imgflip.com/get_memes")
            .then((res) => {
                return res.data;
            })
            .then((res) => {
                const memes1 = res.data.memes;
                shuffleMemes(memes1);
                setMemes(memes1);
            });
    }, []);

    useEffect(() => {
        if (memes.length) {
            setCaptions(Array(memes[idx].box_count).fill(''));
        }
    }, [idx, memes]);

    return (
        <div className="container">
            <button onClick={generateMeme} className="generate">
                Generate
            </button>
            <button className="skip" onClick={handleSkip}>
                Skip
            </button>
            {
                captions.map((c, index) => (
                    <input onChange={(e) => updateCaption(e, index)} key={index} />
                ))
            }
            {memes.length && <img src={memes[idx].url} alt="meme-here" />}
        </div>
    );
};

export default Meme;
