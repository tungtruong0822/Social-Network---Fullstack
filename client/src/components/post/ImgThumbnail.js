import React from "react";

function ImgThumbnail({ post, imgs }) {
  return (
    <div
      id={`id${post._id}`}
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {imgs.map((img, index) => {
          return img.url.match(/video/i) ? (
            <div
              key={index}
              className={`carousel-item ${index === 0 && "active"}`}
            >
              <video
                controls
                src={img.url}
                className="d-block w-100 img-post"
                alt={img.url}
              />
            </div>
          ) : (
            <div
              key={index}
              className={`carousel-item ${index === 0 && "active"}`}
            >
              <img
                src={img.url}
                className="d-block w-100 img-post"
                alt={img.url}
              />
            </div>
          );
        })}
      </div>
      {imgs.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#id${post._id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#id${post._id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}

export default ImgThumbnail;
