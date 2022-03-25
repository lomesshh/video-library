import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-info">
          <h1>Gripping Gears</h1>
          <p>
            We're a team of fun enthusiastic people from all over the world. we
            create awesome videos on modern premium cars. The team is young, the
            ideas are big and our drive is what makes us awesome.
          </p>
          <div className="hero-button">
            <Link to="/videos/explore">
              <button>Explore videos</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1648029766/gripping%20gears/hero2_lldbgl.jpg"
            alt="hero-image"
          />
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1648030113/gripping%20gears/hero_ddidwk.jpg"
            alt="hero-image"
          />
        </div>
        <div className="hero-info">
          <h1>What we do ?</h1>
          <p>
            We all have different skills but what we all have in common is our
            love creating unique content on premium cars which is watched by
            millions! If you're looking for a rewarding job in a fast growing
            company, we'd love to have you join us!
          </p>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-info">
          <h1>Our Mission</h1>
          <p>
            Our mission is to entertain, as well as encourage a generation of
            teens to lead in industries. We always want to inspire a reaction of
            “How cool is that!”.
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1648029766/gripping%20gears/hero3_m01qvm.webp"
            alt="hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
