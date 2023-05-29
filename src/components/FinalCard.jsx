import React, { useEffect, useState } from "react";
import "../css/card.css";
import axios from "axios";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router";
import loader from "../images/loader.gif";

const Finalcard = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf("/") + 1);
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
    localStorage.clear();
  };
  const fetchData = () => {
    axios
      .get(
        `https://zany-erin-dragonfly-wrap.cyclic.app/api/user?name=${filename}`
      )
      .then((response) => {
        const { name, image } = response.data;
        setName(name);
        setImage(image);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        alert("User does'nt exists");
      });
  };

  const handleDownload = () => {
    const cardElement = document.getElementById("card-container");

    html2canvas(cardElement)
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${name}.card.png`;
        link.click();
      })
      .catch((error) => {
        console.error("Error generating canvas:", error);
      });
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("Link copied to your clipboard!");
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
      });
  };
  if (loading === true) {
    return (
      <div className="loader">
        <img
          src={loader}
          alt="Loading"
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      </div>
    );
  }
  return (
    <div className="card" id="card-container">
      <h2>Edit Greeting</h2>
      <div className="image-container">
        {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      </div>
      <div className="card-name">
        <p>{name}</p>
      </div>
      <div className="all-button">
        <button onClick={home} className="yellowbutton">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              style={{
                enableBackground: "new 0 0 122.88 112.07",
              }}
              viewBox="0 0 122.88 112.07"
              width={20}
              height={20}
            >
              <path
                d="M61.44 0 0 60.18l14.99 7.87L61.04 19.7l46.85 48.36 14.99-7.87L61.44 0zM18.26 69.63 61.5 26.38l43.11 43.25v42.43H73.12V82.09H49.49v29.97H18.26V69.63z"
                style={{
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                }}
              />
            </svg>
          </span>
          Home
        </button>

        <button onClick={handleDownload} className="yellowbutton">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              width={20}
              height={20}
              viewBox="0 0 512 499.93"
            >
              <path
                fill-rule="nonzero"
                d="M114.51 278.73c-4.37-4.2-4.55-11.2-.38-15.62a10.862 10.862 0 0 1 15.46-.39l115.34 111.34V11.07C244.93 4.95 249.88 0 256 0c6.11 0 11.06 4.95 11.06 11.07v362.42L378.1 262.85c4.3-4.27 11.23-4.21 15.46.13 4.23 4.35 4.17 11.35-.13 15.62L264.71 406.85a11.015 11.015 0 0 1-8.71 4.25c-3.45 0-6.52-1.57-8.56-4.04L114.51 278.73zm375.35 110.71c0-6.11 4.96-11.07 11.07-11.07S512 383.33 512 389.44v99.42c0 6.12-4.96 11.07-11.07 11.07H11.07C4.95 499.93 0 494.98 0 488.86v-99.42c0-6.11 4.95-11.07 11.07-11.07 6.11 0 11.07 4.96 11.07 11.07v88.36h467.72v-88.36z"
              />
            </svg>
          </span>
          Download
        </button>
        <button onClick={handleCopyLink} className="yellowbutton">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 410.87"
              width={20}
              height={20}
            >
              <path
                fill-rule="nonzero"
                d="M483.06 205.45 313.78 370.69v-68.23c0-6.18-4.7-11.27-10.72-11.88-60.27-11.97-115.03-12.11-164.86 3.05-40.13 12.21-76.81 34.23-110.31 67.83 10.56-65.33 37.76-119.98 78.64-160.47 47.84-47.36 114.68-75.56 195.78-78.99 6.41-.25 11.43-5.53 11.43-11.89l.04-69.89 169.28 165.23zM310.14 407.5l198.49-193.75c4.58-4.71 4.48-12.24-.23-16.83L310.78 4.04A11.87 11.87 0 0 0 301.84 0c-6.58 0-11.93 5.35-11.93 11.94v86.93c-82.19 5.79-150.41 35.99-200.16 85.25C37.33 236.03 5.67 308.88.02 396.46c-.22 3.73 1.3 7.51 4.43 10.03 5.12 4.11 12.62 3.3 16.74-1.82 36.96-46 78.09-74.34 123.91-88.28 43.54-13.25 91.69-13.7 144.81-4.11v86.69c.03 2.99 1.15 5.99 3.4 8.3 4.59 4.71 12.13 4.82 16.83.23z"
              />
            </svg>
          </span>
          share
        </button>
      </div>
    </div>
  );
};

export default Finalcard;
