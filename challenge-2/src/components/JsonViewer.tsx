import React from "react";
import { v4 } from "uuid";

type JsonViewerProps = {
  json: any;
  selectedPath?: string;
  setSelectedPath: (path: string) => void;
  path?: string;
};

export default function JsonViewer({
  json,
  path,
  setSelectedPath,
}: JsonViewerProps) {
  const entries = Object.entries(json) as [any, any][];
  entries.forEach((entry) => {
    // convert values to ReactNode
    const value = entry[1];
    if (Array.isArray(value)) {
      const array = value;
      entry[1] = [];
      entry[1].push("[");
      array.forEach((element, i) => {
        entry[1].push(
          <div key={v4()} className="ml-4">
            <JsonViewer
              setSelectedPath={setSelectedPath}
              path={`${path}.${entry[0]}[${i}]`}
              json={{ "": element }}
            />
          </div>
        );
      });
      entry[1].push("],");
    } else if (typeof value === "object") {
      entry[1] = (
        <div>
          {"{"}
          <JsonViewer
            setSelectedPath={setSelectedPath}
            path={`${path}.${entry[0]}`}
            json={value}
          />
          {"},"}
        </div>
      );
    } else {
      entry[1] = (
        <span style={{ color: "black" }}>
          {typeof value !== "boolean" && value !== "number"
            ? `'${value}'`
            : value.toString()}
        </span>
      );
    }
  });

  return (
    <div className="min-w-[30rem] w-fit mx-auto select-none">
      {entries.map((entry, index) => {
        return (
          <div className="flex ml-4" key={v4()}>
            {entry[0] && (
              <span
                onClick={() => {
                  if (Array.isArray(entry[1])) return;
                  const newPath = (path + "." + entry[0]).replace("..", ".");
                  setSelectedPath(newPath as string);
                }}
                className={
                  Array.isArray(entry[1]) ? "" : "text-blue-500 cursor-pointer"
                }
              >
                {entry[0]}:
              </span>
            )}
            <div className="flex flex-col ml-2">{entry[1]}</div>
            {index !== entries.length - 1 && <span>,</span>}
          </div>
        );
      })}
    </div>
  );
}
