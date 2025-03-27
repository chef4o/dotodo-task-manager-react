import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    if (window.loadMapScenario) {
      window.loadMapScenario();
    }
  }, []);

  return (
    <div className="content about-us">
      <div className="main-info">
        <h1>About me</h1>
        <p>
          I am really passionate about technology and programming, a journey that led me to create this task management
          website. Inspired by my learning at SoftUni, this platform is designed to help people manage their time more
          effectively. It's an evolving space, constantly improving to meet user needs. My goal is to offer a practical
          and straightforward tool for everyone who seeks better organization in their daily routine. This website
          reflects my dedication to making time management easier and more accessible for all.
        </p>
        <br />
        <p>I hope you will like it and shape it alongside with me!</p>
      </div>
      <div className="location">
        <h2>Located in Sofia, BULGARIA</h2>
        <div className="location">
          <div id="bing-map"></div>
        </div>
      </div>
    </div>
  );
}
