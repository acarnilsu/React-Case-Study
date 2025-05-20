import React from "react";
import { UserDataType } from "../types/userdata.types";

interface GridProps {
  data: UserDataType[];
}

export const Grid = (props: GridProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>mailReceivedDate</th>
            <th>solutionSentDate</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, index) => {
            return (
              <tr key={index} style={{ backgroundColor: row.isBackgroundColorRed ? "red" : "inherit" }}>
                <td>{row.name}</td>
                <td>{row.mailReceivedDate}</td>
                <td>{row.solutionSentDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
