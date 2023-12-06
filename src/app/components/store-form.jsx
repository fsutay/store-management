'use client'
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector,useDispatch  } from 'react-redux';
import { addStore,updateStore,undoUpdating } from "../store/storesSlice";
import { storeValidationSchema } from '../validation/validation';
import { Button } from '@mui/material';


const formFields = [
  { name: 'storeName', label: 'Store Name', type: 'text' },
  { name: 'country', label: 'Country', type: 'text', autoComplete: true },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'address', label: 'Address', type: 'textarea', rows: 3 },
  { name: 'telephone', label: 'Telephone', type: 'text' },
  { name: 'discountRate', label: 'Discount Rate (max)', type: 'number' },
  { name: 'premiumRate', label: 'Premium Rate (max)', type: 'number' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
];

const StoreForm = () => {
  const dispatch = useDispatch();
  const { updatingStore, updateClicked} = useSelector((state) => state.storesStore);
  const onSubmit = (values) => {
    if(updateClicked){
      dispatch(updateStore(values));
    }else{
      dispatch(addStore(values));
    }
    formik.resetForm();
 
  };

 

  const formik = useFormik({
   initialValues:updatingStore,
    validationSchema: storeValidationSchema,
    onSubmit,
  });
  const giveUpUpdate = ()=>{
    formik.resetForm();
    dispatch(undoUpdating());
  }
  useEffect(() => {
    formik.setValues(updatingStore); 
  }, [updatingStore]);

  
  useEffect(() => {
   }, [updateClicked]);


  return (
    <div className="flex flex-col lg:flex-row m-3">
      <div className="w-full lg:w-3/12 bg-slate-100 p-4">
        <h2>Store Information Form</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Store CRUD management.
        </p>
      </div>

      <form
        className="w-full lg:w-9/12 bg-gray-200 p-4 lg:ms-0 rounded mt-2 lg:ml-0"
        onSubmit={formik.handleSubmit}
      >
        {formFields.map((field) => (
          <div key={field.name} className="mb-3 lg:flex lg:items-center">
            <label
              htmlFor={field.name}
              className={`mr-2 text-sm lg:w-1/6 lg:pl-10 ${field.type === 'textarea' ? 'block' : ''}`}
            >
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <div className="relative w-full">
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  rows={field.rows}
                  {...formik.getFieldProps(field.name)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <p className="text-xs text-red-500">{formik.errors[field.name]}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full">
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formik.values[field.name] || ''}
                  
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                
                  {...formik.getFieldProps(field.name)}
                  className="text-sm rounded block w-full p-2.5 border-secondary"
                />
            
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <p className="text-xs text-red-500">{formik.errors[field.name]}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded w-full lg:w-60">
            {updateClicked ? "Mağaza Güncelle" : "Mağaza Ekle"}
          </button>
          &nbsp;  &nbsp;
          {
            updateClicked ? <Button onClick={giveUpUpdate}  className="bg-primary text-white py-2 px-4 rounded w-full lg:w-60">
            Vazgeç
           </Button>:null
          }
          
        </div>
      </form>
    </div>
    
  );
};

export default StoreForm;
