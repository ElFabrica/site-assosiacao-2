import React from "react";
import { FormConstruction } from "./form-construction";

export default function ConstructionPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <div className="relative size-8">
        <img src="/favicon.png" alt="Logo" className="object-fill" />
      </div>
      <FormConstruction />
    </div>
  );
}
