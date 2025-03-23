import React from "react";

function Location() {
  return (
    <div className="fixed w-full min-h-screen h-screen overflow-hidden">
      {/* Google Map */}
      <iframe
        className="w-full h-full"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=perinthalmanna&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        title="Google Map"
      ></iframe>
    </div>
  );
}

export default Location;
