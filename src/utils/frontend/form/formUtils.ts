import { AdminFormDataProperty } from "@/src/types/adminTypes/adminProperty";

export const isFormComplete = (formValues: AdminFormDataProperty) =>
  formValues.districtId &&
  formValues.location &&
  formValues.area &&
  formValues.yearBuilt &&
  formValues.typeId &&
  formValues.bedrooms &&
  formValues.bathrooms &&
  formValues.parkingSpaces !== undefined &&
  formValues.furnished !== undefined &&
  formValues.terrace !== undefined &&
  formValues.elevator !== undefined &&
  Array.isArray(formValues.services) && formValues.services.length > 0 &&
  Array.isArray(formValues.imagesGallery) && formValues.imagesGallery.length > 0 &&
  formValues.imageMain &&
  formValues.description &&
  formValues.price &&
  formValues.currencyId &&
  !Object.values(formValues).some(value => value === '');
