import React, { useState } from "react";
import JsonViewer from "./components/JsonViewer";
import mock from "./assets/data.json";
import ValueViewer from "./components/ValueViewer";

export default function App() {
  const [startPath, setStartPath] = useState<string>("res");
  const [selectedPath, setSelectedPath] = useState<string>("");

  return (
    <div className="min-w-[30rem] mt-20 py-10 font-mono border-2 mx-auto w-fit px-4 text-gray-600">
      <div className="flex flex-col gap-2">
        <span className="leading-none">Property</span>
        <input
          className="border-2 min-w-[20rem] px-4 h-[2rem]"
          type="text"
          onChange={(e) => setSelectedPath(e.target.value)}
          value={selectedPath}
        />
        <ValueViewer
          object={mock}
          path={selectedPath.replace(`${startPath}.`, "")}
        />
        <div className="flex  mt-4 h-fit items-start">
          <h3>Response</h3>
          <input
            className="opacity-50 w-[3rem] h-[1.5rem] ml-4"
            type="text"
            onChange={(e) => setStartPath(e.target.value)}
            value={startPath}
          />
        </div>
        <div className="border-2 font-mono rounded-md w-fit flex flex-col items-center justify-center border-slate-400 mx-auto">
          <JsonViewer
            path={startPath}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            json={mock}
          />
        </div>
      </div>
    </div>
  );
}
