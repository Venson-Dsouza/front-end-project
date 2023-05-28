import React, { useEffect, useState } from "react";
import "../css/card.css";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import { useNavigate } from "react-router";
import loader from "../images/loader.gif";

const Cardedit = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setImage(localStorage.getItem("image"));
  }, []);

  useEffect(() => {
    if (image !== null) {
      // Make API call here
      handleUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setEditMode(false);
    setLoading(true);
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL();
      setImage(canvas);
    }
    setTimeout(() => {
      setLoading(false);
      navigate(`/finalcard/${name}`);
    }, 5000);
  };

  const handleUpdate = async () => {
    try {
      await axios
        .put(`https://zany-erin-dragonfly-wrap.cyclic.app/api/update`, {
          name,
          image,
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      // Handle the error
      console.error("Error updating data:", error);
      alert(
        "request entity is too large for free server, server payload limit hit"
      );
    }
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => (prevZoom > 0.1 ? prevZoom - 0.1 : prevZoom));
  };

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  const handleRotateLeft = () => {
    setRotation((prevRotation) => prevRotation - 90);
  };

  const handleRotateRight = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };
  const handleRotateChange = (e) => {
    setRotation(parseFloat(e.target.value));
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
    <div className="card">
      <h2>Edit Greeting</h2>
      <div className="image-container">
        {image && (
          <AvatarEditor
            ref={(ref) => {
              setEditor(ref);
            }}
            borderRadius={150}
            image={image}
            width={250}
            height={250}
            border={5}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={zoom}
            rotate={rotation}
            style={{
              height: "40%",
              width: "53%",
              borderRadius: "50%",
              zIndex: -1,
              position: "absolute",
              top: 143,
              left: 91,
            }}
          />
        )}
      </div>
      <div className="card-name">
        <p>{name}</p>
      </div>
      {editMode ? (
        <div className="controls">
          <div className="zoom-controls">
            <button onClick={handleZoomOut} className="btn">
              -
            </button>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={zoom}
              onChange={handleZoomChange}
              className="slider"
            />
            <button onClick={handleZoomIn} className="btn">
              +
            </button>
          </div>
          <div className="zoom-controls">
            <button onClick={handleRotateLeft} className="btn">
              ⟲
            </button>
            <input
              type="range"
              min="0"
              max="300"
              step="20"
              value={rotation}
              className="slider"
              onChange={handleRotateChange}
            />
            <button onClick={handleRotateRight} className="btn">
              ⟳
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="all-button">
        {editMode ? (
          <button onClick={handleSave} className="yellowbutton">
            Submit
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="yellowbutton"
            style={{ width: "130px" }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 122.88 90.46"
                height={20}
                width={20}
              >
                <title>{"camera-setting"}</title>
                <path
                  d="M36.8 51.32a2.15 2.15 0 0 0-3.08 0l-2.35 2.34a16 16 0 0 0-2-1.08 21.31 21.31 0 0 0-2.13-.83v-3.61A2.15 2.15 0 0 0 25.07 46h-4.52a2.11 2.11 0 0 0-1.55.6 2.09 2.09 0 0 0-.65 1.54v3.31a14.61 14.61 0 0 0-2.19.67 17.92 17.92 0 0 0-2 .93l-2.6-2.56a2 2 0 0 0-1.5-.65 2.14 2.14 0 0 0-1.55.65l-3.16 3.17a2.14 2.14 0 0 0 0 3.09l2.34 2.35a15.21 15.21 0 0 0-1.08 2 19.13 19.13 0 0 0-.83 2.13H2.17a2.11 2.11 0 0 0-1.54.63A2.09 2.09 0 0 0 0 65.39v4.53a2.14 2.14 0 0 0 .63 1.52 2.11 2.11 0 0 0 1.54.64h3.3a15.49 15.49 0 0 0 .68 2.19 17.61 17.61 0 0 0 .93 2.07L4.51 78.9a2 2 0 0 0-.65 1.51A2.17 2.17 0 0 0 4.51 82l3.18 3.21a2.25 2.25 0 0 0 3.08 0l2.36-2.39a14.64 14.64 0 0 0 2 1.09c.7.31 1.41.59 2.13.83v3.6a2.09 2.09 0 0 0 .63 1.54 2.05 2.05 0 0 0 1.54.63h4.52a2.19 2.19 0 0 0 2.17-2.17V85a17.38 17.38 0 0 0 2.19-.67 21.48 21.48 0 0 0 2.07-.94L32.93 86a2 2 0 0 0 1.52.65A2 2 0 0 0 36 86l3.21-3.18a2.25 2.25 0 0 0 0-3.08l-2.41-2.4a15.33 15.33 0 0 0 1.08-2 19 19 0 0 0 .83-2.12h3.61a2.06 2.06 0 0 0 1.54-.64 2.09 2.09 0 0 0 .63-1.58v-4.48a2.13 2.13 0 0 0-.63-1.52 2.07 2.07 0 0 0-1.54-.65H39a18.08 18.08 0 0 0-.68-2.17 15.37 15.37 0 0 0-.93-2L40 57.53a2 2 0 0 0 .66-1.5 2.11 2.11 0 0 0-.66-1.55l-3.2-3.16ZM58.63 0H95.5l8.4 15h17.31a1.69 1.69 0 0 1 1.67 1.68v58.38a1.71 1.71 0 0 1-1.67 1.67H49.45a8.89 8.89 0 0 0 1.29-2.21 9.06 9.06 0 0 0 .71-3.52v-4.48a9.18 9.18 0 0 0-2.59-6.33l-.19-.19a9.68 9.68 0 0 0-1.53-1.21 8.86 8.86 0 0 0 .44-2.79 9 9 0 0 0-.73-3.55c-.1-.23-.22-.46-.34-.68a9.45 9.45 0 0 0-1.62-2.21l-3.2-3.19a9.13 9.13 0 0 0-2.94-2 6.49 6.49 0 0 0-.74-.26 8.73 8.73 0 0 0-4.84-.2l-.17-.29a9 9 0 0 0-1.45-1.91 8.93 8.93 0 0 0-3-2l-.38-.14a8.93 8.93 0 0 0-3-.53h-4.62a8.62 8.62 0 0 0-1.53.13V16.68A1.68 1.68 0 0 1 20.69 15h7.79V9.64h9.61V15h10.45l6.52-12.86C56.38-.48 55.65 0 58.63 0Zm16.72 26.79a16.52 16.52 0 1 1-11.69 4.84 16.47 16.47 0 0 1 11.69-4.84Zm7.4 9.13a10.45 10.45 0 1 0 3.07 7.4 10.45 10.45 0 0 0-3.07-7.4Zm29.31-13.52a5 5 0 1 1-5 5 5 5 0 0 1 5-5Zm-36.71-4a25 25 0 1 1-25 25 25 25 0 0 1 25-25Zm-53.1 41a9 9 0 0 1 3.45.6 9.09 9.09 0 0 1 2.83 1.9 9.19 9.19 0 0 1 1.89 2.82 9 9 0 0 1 0 6.91 9.23 9.23 0 0 1-1.89 2.83 9.36 9.36 0 0 1-2.83 1.89 9 9 0 0 1-6.91 0A9.36 9.36 0 0 1 16 74.5a9.12 9.12 0 0 1-1.89-2.83 9 9 0 0 1 0-6.91A8.8 8.8 0 0 1 18.79 60a9 9 0 0 1 3.46-.68Z"
                  style={{
                    fillRule: "evenodd",
                  }}
                />
              </svg>
            </span>
            Edit Photo
          </button>
        )}
      </div>
    </div>
  );
};

export default Cardedit;
