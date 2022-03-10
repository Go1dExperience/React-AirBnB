import React from "react";
import { Field, reduxForm } from "redux-form";
import { required } from "../../shared/form/Validators";
import { BwmInput } from "../../shared/form/BwmInput";
import { BwmResError } from "../../shared/form/BwmResError";
import { BwmTextArea } from "../../shared/form/BwmTextArea";
import { BwmSelect } from "../../shared/form/BwmSelect";
import BwmFileUpload from "../../shared/form/BwmFileUpload";

function RentalCreateForm(props) {
  const {
    valid,
    submitting,
    pristine,
    handleSubmit,
    createNewRental,
    options,
    errors,
  } = props;
  return (
    <form onSubmit={handleSubmit(createNewRental)}>
      <Field
        label="Title"
        name="title"
        type="text"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />
      <Field
        label="Description"
        rows="6"
        name="description"
        type="text"
        className="form-control"
        component={BwmTextArea}
        validate={[required]}
      />
      <Field
        label="City"
        name="city"
        type="text"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />
      <Field
        label="Street"
        name="street"
        type="text"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />
      <Field
        label="Category"
        options={options}
        name="category"
        className="form-control"
        component={BwmSelect}
      />
      <Field label="Image" name="image" component={BwmFileUpload} />
      <Field
        label="Bedrooms"
        name="bedrooms"
        type="number"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />
      <Field
        label="Price"
        name="dailyRate"
        symbol="$"
        type="text"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />
      <Field
        label="Shared"
        name="shared"
        type="checkbox"
        component={BwmInput}
      />
      <div>
        <button
          className="btn btn-bwm btn-form"
          type="submit"
          disabled={!valid || pristine || submitting}
        >
          Submit
        </button>
        <BwmResError errors={errors}></BwmResError>
      </div>
    </form>
  );
}

export default reduxForm({
  form: "rentalCreateForm",
  initialValues: {
    shared: false,
    category: "Apartment",
  },
})(RentalCreateForm);
