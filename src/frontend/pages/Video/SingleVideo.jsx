import React from "react";

const SingleVideo = () => {
  return (
    <div className="singlevideo__main">
      <div className="singlevideo__display">
        <div className="singlevideo__iframe">
          <iframe src="https://www.youtube.com/embed/T3WWiUsCMcY"></iframe>
        </div>
        <div className="singlevideo__info">
          <h3>Super Long Range Rover HSE!</h3>
          <h5>premium car</h5>
        </div>
        <div className="singlevideo__action">
          <i class="fa-solid fa-thumbs-up"></i>
          <i class="fa-solid fa-folder-open"></i>
          <i class="fa-solid fa-floppy-disk"></i>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
