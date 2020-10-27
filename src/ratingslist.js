import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default (props) => {
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    fetch("https://waterdata.usgs.gov/nwisweb/get_ratings?period=24")
      .then((resp) => resp.text())
      .then((t) => {
        const ratings = [];
        t.split("\n").forEach((line) => {
          if (line[0] !== "U") {
            console.log(line);
            return;
          }
          const parts = line.split("\t");
          const obj = {
            agencyCode: parts[0],
            siteNo: parts[1],
            type: parts[2],
            updateTimeRawStr: parts[3],
            updateTime: DateTime.fromSQL(parts[3], { zone: "utc" }),
            url: parts[4],
          };
          ratings.push(obj);
        });
        // Sort Ratings
        const sorted = ratings.sort((a, b) => b.updateTime - a.updateTime);
        // Push to State
        setRatings(sorted);
      });
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Agency Code</th>
            <th>Site Number</th>
            <th>Rating Type</th>
            <th>Update Time</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody
          style={{
            position: "absolute",
            bottom: 0,
            height: "calc(100% - 648px)",
            overflow: "auto",
          }}
        >
          {ratings.map((r) => (
            <tr
              className={
                r.siteNo === props.siteSelected ? "bg-primary text-white" : ""
              }
              onClick={(e) => {
                props.setSiteSelected(String(r.siteNo));
              }}
            >
              <td>{r.agencyCode}</td>
              <td>{r.siteNo}</td>
              <td>{r.type}</td>
              <td>{`${r.updateTime.toRelative()} (${r.updateTimeRawStr})`}</td>
              <td>{r.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
