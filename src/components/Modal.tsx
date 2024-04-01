import React, { useState } from "react";
import dataJSON from '../../public/data.json';



export const Modal = ({ closeModal, onSubmit, defaultValue }: any) => {
  const fields = Object.keys(Object.values(dataJSON)[0]).filter((item: any) => !(item.startsWith("delta_")));

  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      para: "price",
      criterion: "0",
      value: "",
      type: "0",
    }
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    if (formState.id && formState.value) {
      setErrors([]);
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        console.log(key);
        console.log(value);
        if (!value) {
          errorFields.push(key == "id" ? "Bond ID" : key);
        }
        else {
          if (key == 'id') {
            if (!(Object.keys(dataJSON).includes(value) || value == "ALL")) {
              errorFields.push("INVALID_ID_" + value);
            }
          }
        }
      }
      console.log(errorFields);
      setErrors(errorFields);
      return false;
    }
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    console.log(formState.criterion);
    console.log(e.target.name);
    console.log(e.target.name == "para" && e.target.value == 'rating');
    console.log(formState.criterion > 1 && formState.criterion < 4);
    console.log(e.target.value);
    console.log(e.target.name == "para" && e.target.value == 'rating' && formState.criterion > 1 && formState.criterion < 4);
    if (e.target.name == "para" && e.target.value == 'rating' && formState.criterion > 1 && formState.criterion < 4) { setFormState({ ...formState, ["criterion"]: 0 }); }

    console.log(formState.criterion);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    // closeModal();
  };

  return (
    <div
      className="modal-container mx-auto fixed z-50 flex place-items-center top-25 bottom-5 "
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >

      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="w-full flex justify-end">
            <strong className="text-xl align-center cursor-pointer "
              onClick={closeModal}
            >&times;</strong>
          </div>
          <form>
            <div className="grid grid-cols-3 gap-5 justify-normal">
              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="id">Bond ID (Input "ALL" to track all bonds with paramaters below)</label>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="id" onChange={handleChange} value={formState.id} />
              </div>




              <div className="form-group w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="value">Value to give Alert</label>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="value" onChange={handleChange} value={formState.value} />
              </div>


            </div>
            {errors.filter((item: string) => (item.startsWith("INVALID_ID"))).length > 0 && <><br /><div className="error">{errors.filter((item: string) => (item.startsWith("INVALID_ID")))[0].replace("INVALID_ID_", "")} is not a valid bond</div></>}
            {errors.filter((item: string) => !(item.startsWith("INVALID_ID"))).length > 0 && (<div className="error">Please input {errors.filter((item: string) => !(item.startsWith("INVALID_ID"))).join(", ")}</div>)}


            <br></br>
            <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
              type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};