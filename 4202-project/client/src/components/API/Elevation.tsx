import React from "react";

export default function Elevation() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((data) => setData(data.message));
          console.log(data);
      }, []);

      return (
        <div className="Elevation">
            <p>{!data ? "Loading..." : data}</p>
        </div>
      );
}