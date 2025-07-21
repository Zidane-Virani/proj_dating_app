import React from "react";
import { Spinner } from "@heroui/spinner";

export default function LoadingComponents({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner
        label={label || "loading..."}
        color="secondary"
        labelColor="secondary"
      />
    </div>
  );
}
