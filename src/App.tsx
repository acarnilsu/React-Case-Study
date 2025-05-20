import * as React from "react";
import "./style.css";
import { Grid } from "./components/Grid";
import dataList from "./data.json";
import { UserDataType } from "./types/userdata.types";
import { useEffect, useState } from "react";

export default function App() {
  let sourceProp: UserDataType[] = dataList;
  const [failedCount, setFailedCount] = useState(0);
  const [limit, setLimit] = useState(0);
  const [inputDate, setInputDate] = useState(new Date().toISOString().split("T")[0]);

  const control = (limit: number, today?: Date) => {
    var tableRows = document.getElementsByTagName("tbody")[0].rows;
    var failedCount = 0;
    for (let index = 0; index < tableRows.length; index++) {
      const element = tableRows[index];
      const tdVals = element.getElementsByTagName("td");
      const receivedDate = tdVals[1].innerText;
      const solutionSentDate = tdVals[2].innerText || inputDate;
      console.log(solutionSentDate);
      var diff = new Date(solutionSentDate).getTime() - new Date(receivedDate).getTime();
      var isFailed = diff / (1000 * 60 * 60 * 24) > limit;
      var isRed = element.getAttribute("style")?.includes("red");
      if ((isFailed && !isRed) || (!isFailed && isRed)) {
        ++failedCount;
      }
    }
    setFailedCount(failedCount);
  };

  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <Grid data={sourceProp} />
      <br />
      <input
        type="date"
        value={inputDate}
        placeholder="yyyy-mm-dd"
        onChange={(e) => {
          setInputDate(e.target.value);
        }}
      />
      <input
        type="number"
        value={limit}
        placeholder="limit"
        onChange={(e) => setLimit(Number(e.target.value))}
      />
      <button onClick={() => control(limit, new Date(inputDate))}>Kontrol Et</button>
      <h5>hatali row sayiisi: {failedCount} </h5>
    </div>
  );
}
