import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const carFields = {
  id: 'Read only',
  image: 'Read only',
  make: 'Honda',
  model: 'Civic',
  year: '2008',
  price: '1000.00',
  engine: 'V8',
  drive: 'RWD',
  feature1: 'None',
  description: 'This is a nice car',
};

const _Uploader = ({
  onFormSubmit,
  onChangeText,
  onChange,
  tempCar,
  reset,
}) => {
  return (
    <form id="newCar" onSubmit={(e) => onFormSubmit(e, { ...tempCar })}>
      {Object.keys(tempCar).map((fieldName, idx) => {
        return (
          <div className="form_item" key={idx}>
            <span className="form_label">{fieldName.toUpperCase()}:</span>
            <input
              readOnly={
                fieldName === 'id' || fieldName === 'image' ? true : false
              }
              className="input_item"
              name={fieldName}
              type="text"
              placeholder={carFields[fieldName]}
              value={tempCar[fieldName]}
              onChange={(e) => onChangeText(e, { ...tempCar })}
            />
          </div>
        );
      })}
      <div className="form_item">
        <span className="form_label">Main Image:</span>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => onChange(e, { ...tempCar })}
          key={reset}
        />
      </div>

      <button id="upload_button" type="submit">
        Submit
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    async onFormSubmit(e, tempCar) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', tempCar.image);
      formData.append('make', tempCar.make);
      formData.append('model', tempCar.model);
      formData.append('year', tempCar.year);
      formData.append('price', tempCar.price);
      formData.append('engine', tempCar.engine);
      formData.append('drive', tempCar.drive);
      formData.append('feature1', tempCar.feature1);
      formData.append('description', tempCar.description);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      if (tempCar.id === '') {
        try {
          await axios.post('/api/uploadCar', formData, config);
          const cars = (await axios.get(`/api/cars`)).data;
          dispatch({
            type: 'JUST_CARS',
            cars,
          });
        } catch (er) {
          alert('Unable to update');
        }
      } else {
        try {
          const car = (
            await axios.put(`/api/updateCar/${tempCar.id}`, formData, config)
          ).data;
          dispatch({
            type: 'POST_TEMPCAR',
            car,
          });
        } catch (er) {
          console.log(er);
          alert('Unable to update');
        }
      }
    },
    onChange(e, tempCar) {
      tempCar.image = e.target.files[0];
      dispatch({
        type: 'UPDATE_TEMPCAR',
        tempCar,
      });
    },
    onChangeText(e, tempCar) {
      tempCar[e.target.name] = e.target.value;
      dispatch({
        type: 'UPDATE_TEMPCAR',
        tempCar,
      });
    },
  };
};

const Uploader = connect((state) => state, mapDispatchToProps)(_Uploader);

export default Uploader;
