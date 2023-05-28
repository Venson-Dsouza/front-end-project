import React, { useRef, useState } from "react";
import "../css/card.css";
import axios from "axios";
import { useNavigate } from "react-router";
import circle from "../images/circle.png";

const Card = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const home = () => {
    navigate("/");
    localStorage.clear();
  };
  const handleSave = () => {
    if (name?.length === 0) {
      alert("Insert your name");
      return;
    }
    axios
      .post(`http://localhost:3001/api/submit`, {
        name,
        image,
      })

      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.setItem("name", name);
    localStorage.setItem("image", image);
    navigate("/cardedit");
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const maxSizeInBytes = 70 * 1024; // 60kb

    // Check file size
    if (file?.size > maxSizeInBytes) {
      alert(
        "File size exceeds the limit (70kb). Please choose a smaller file."
      );
      return;
    }

    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };
    // reader.onload = () => {
    //   setImage(reader.result);
    // };

    reader.readAsDataURL(file);
  };

  const circleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="card">
      <h2>Edit Greeting</h2>
      <div className="image-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={inputRef}
          style={{ display: "none" }}
        />

        {!image ? (
          <>
            <img
              src={circle}
              alt="Card"
              className="circle"
              onClick={circleClick}
            />
            <span onClick={circleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width={30}
                height={30}
                viewBox="0 0 128 128"
                fill="white"
                style={{ position: "relative", top: "2%" }}
              >
                <path d="M109.207 102.516H18.82a4.695 4.695 0 0 1-4.69-4.69v-59.98a4.695 4.695 0 0 1 4.69-4.69h24.587c.9 0 2.364-.665 2.956-1.341l2.736-3.126c1.353-1.544 3.918-2.708 5.968-2.708h17.64c2.051 0 4.616 1.164 5.969 2.708l2.734 3.126c.593.677 2.058 1.341 2.957 1.341h24.84a4.695 4.695 0 0 1 4.69 4.69v59.979a4.696 4.696 0 0 1-4.69 4.691zM18.82 37.155a.7.7 0 0 0-.69.69v59.979c0 .375.316.69.69.69h90.387c.374 0 .69-.315.69-.69V37.846a.699.699 0 0 0-.69-.69h-24.84c-2.051 0-4.615-1.163-5.967-2.707l-2.734-3.126c-.594-.676-2.06-1.342-2.959-1.342h-17.64c-.899 0-2.364.666-2.958 1.343l-2.735 3.125c-1.35 1.543-3.915 2.707-5.967 2.707H18.82z" />
                <path d="M64.013 91.914c-12.808 0-23.228-10.42-23.228-23.228 0-12.807 10.42-23.226 23.228-23.226 12.809 0 23.229 10.419 23.229 23.226 0 12.808-10.421 23.228-23.229 23.228zm0-42.453c-10.603 0-19.228 8.625-19.228 19.226 0 10.603 8.625 19.228 19.228 19.228 10.604 0 19.229-8.625 19.229-19.228 0-10.602-8.626-19.226-19.229-19.226zM111.129 71.234h-13.33a2 2 0 0 1 0-4h13.33a2 2 0 0 1 0 4zM31.125 71.234H17.013a2 2 0 0 1 0-4h14.112a2 2 0 0 1 0 4z" />
                <path d="M64.015 81.187c-6.892 0-12.499-5.606-12.499-12.498S57.123 56.19 64.015 56.19c6.891 0 12.497 5.606 12.497 12.498s-5.607 12.499-12.497 12.499zm0-20.997c-4.687 0-8.499 3.812-8.499 8.498 0 4.687 3.813 8.498 8.499 8.498s8.497-3.812 8.497-8.498-3.812-8.498-8.497-8.498z" />
              </svg>
              Add Photo
            </span>
          </>
        ) : (
          <img src={image} alt="Uploaded" className="uploaded-image" />
        )}
      </div>
      <div className="card-name">
        <input
          className="edit-name"
          placeholder="- Edit Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={handleSave} className="yellowbutton">
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
          </span>{" "}
          Save
        </button>
      </div>
    </div>
  );
};

export default Card;
