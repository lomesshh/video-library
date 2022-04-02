import { Loader } from "frontend/components";
import React, { useState } from "react";
import { useData } from "frontend/context";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import UploadVideoCard from "./UploadVideoCard";
import { Notify } from "frontend/components";

const UploadVideo = () => {
  const { datastate, uploadObj, setUploadObj, uploadVideo } = useData();
  const [extractedUrl, setExtractedUrl] = useState("");
  const [open, setOpen] = useState(false);

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  return (
    <div className="video__grid upload__video">
      <div className="video__search watched__video">
        <h3>Uploaded Videos ( {datastate.uploadedVideo.length} Videos )</h3>
        <button
          onClick={() => {
            setOpen(!open);
            setUploadObj({
              title: "",
              category: "",
              description: "",
            });
            setExtractedUrl("");
          }}
        >
          Upload Video
        </button>
      </div>
      {datastate.loading && <Loader />}
      {datastate.uploadedVideo.length < 1 && !datastate.loading && (
        <h3 className="empty__list watched__video">
          You haven't uploaded any video yet !
          <button
            onClick={() => {
              setOpen(!open);
              setUploadObj({
                title: "",
                category: "",
                description: "",
              });
            }}
          >
            Upload Video
          </button>
        </h3>
      )}
      <Modal
        classNames="upload__modal"
        open={open}
        onClose={() => setOpen(!open)}
        center
      >
        <p>Add Details</p>
        <form
          onSubmit={() => {
            setOpen(!open);
            const finalUrl = youtube_parser(extractedUrl);
            uploadVideo(finalUrl);
          }}
        >
          <input
            className="modal__input"
            type="text"
            placeholder="Enter url of any youtube video"
            value={extractedUrl}
            onChange={(e) => setExtractedUrl(e.target.value)}
            required
          />
          <input
            className="modal__input"
            type="text"
            placeholder="Enter title"
            value={uploadObj.title}
            onChange={(e) =>
              setUploadObj((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />

          <select
            name="category"
            id="category"
            className="modal__input"
            onChange={(e) =>
              setUploadObj((prev) => ({ ...prev, category: e.target.value }))
            }
            required
          >
            <option value="" selected="selected" disabled="disabled">
              Select category
            </option>
            {datastate.allCategories.map((category) => (
              <option value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <input
            className="modal__input"
            type="text"
            placeholder="Enter description"
            value={uploadObj.description}
            onChange={(e) =>
              setUploadObj((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />
          <button className="modal__button" type="submit">
            Upload video
          </button>
        </form>
      </Modal>

      <div className="video__list">
        {datastate.uploadedVideo.map((item) => (
          <UploadVideoCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export { UploadVideo };
