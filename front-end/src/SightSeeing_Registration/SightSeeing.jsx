import { useState, json } from "react";
import React from "react";
import { ssFields } from "./fields";
import Input from "../forms/input";
import FormAction from "../forms/formaction";

const fields = ssFields;
let fieldState = {};

fields.forEach((field) => (fieldState[field.id] = ""));

export default function SSForm() {
  const [sightSeeingState, setsightSeeingState] = useState(fieldState);

  const handleChange = (e) => {
    setsightSeeingState({ ...sightSeeingState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or data handling here
    registerSS();
  };

  const registerSS = async () => {
    const result = await fetch("http://localhost:3000/api/sight/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sightSeeingState),
    });

    const jsonData = await result.json();
    console.log(jsonData);
    alert(jsonData.success);
    window.location.reload();
  };

  return (
    <div className="h-screen flex justify-evenly">

    <div className="flex flex-col  items-center justify-center ">
        <h1 className="uppercase font-bold text-2xl underline">Registration Form</h1>
    <form onSubmit={handleSubmit} className="mt-4 space-y-6 w-96 bg-red-200 p-2">
      <div className="">
        {
          fields.map((field) => (
            <Input 
            key={field.id}
            handleChange={handleChange}
            value={sightSeeingState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            />
            ))
          }
        <FormAction handleSubmit={handleSubmit} text={'Register'} />
      </div>
    </form>
    </div>
    <div className="flex flex-col items-center justify-center">
    <h1 className="uppercase font-bold text-2xl underline">Registration Instruction</h1>
      <div className="mt-4 space-y-6 w-96 bg-red-200 p-2">
        <ul className="list-disc pl-8">
          <li>Sight Name: Enter the name of the sight</li>
          <li>Sight Location: Enter the URL of the sight on Bing, if available</li>
          <li>Rating: Enter the rating of the sight on a scale of 1-5</li>
          <li>Money: Enter the amount of money required to visit the sight</li>
          <li>Opening Time: [--:-- (Enter the opening time of the sight)]</li>
          <li>Closing Time: [--:-- (Enter the closing time of the sight)]</li>
        </ul>
      </div>
    </div>
    </div>
  );
}
