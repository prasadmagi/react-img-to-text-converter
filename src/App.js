

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { CopyToClipboard } from "react-copy-to-clipboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  const handleconvert = () => {
    image === null ? alert("Please upload the image first.") :
      setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };
  const handlecopy = () => {
    toast("Copy to clipboard");
  }
  return (
    <>

      <div className="container">

        <div className="row h-100">
          <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
            {!isLoading && (
              <h1 className="text-center py-5 mc-5">Image To Text Converter</h1>
            )}
            {isLoading && (
              <>
                <progress className="form-control" value={progress} max="100">
                  {progress}%{' '}
                </progress>{' '}
                <p className="text-center m-4">Converting:- {progress} %</p>
              </>
            )}
            {!isLoading && !text && (
              <>
                <input
                  type="file"
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                  className="form-control mt-5 mb-2"
                />
                <input
                  type="button"
                  onClick={handleconvert}
                  className="convert-btn px-4 py-1"
                  value="Convert"
                  required
                />
              </>
            )}
            {!isLoading && text && (
              <>
                <textarea
                  className="text-area form-control"
                  rows="20"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>

                <CopyToClipboard text={text}>
                  <button onClick={handlecopy} className='btn-copy px-4 py-1 m-auto text-center'>Copy </button>
                </CopyToClipboard>
                <ToastContainer />


              </>
            )}
          </div>
        </div>
      </div>


    </>
  );
}

export default App;
