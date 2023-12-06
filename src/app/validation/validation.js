import * as Yup from "yup";
export const storeValidationSchema=Yup.object({
    storeName: Yup.string().required('Store name is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    address: Yup.string().required('Address is required'),
    telephone: Yup.string().required('Telephone is required'),
    discountRate: Yup.number().required('Discount Rate is required'),
    premiumRate: Yup.number().required('Premium Rate is required'),
    description: Yup.string().required('Description is required'),
})
