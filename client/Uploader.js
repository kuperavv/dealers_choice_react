// import React from 'react';

// const carFields = {
//   id: 'Read only',
//   image: 'Read only',
//   make: 'Honda',
//   model: 'Civic',
//   year: '2008',
//   price: '1000.00',
//   engine: 'V8',
//   drive: 'RWD',
//   feature1: 'None',
//   description: 'This is a nice car',
// };

// const Uploader = (props) => {
//   return (
//     <form id="newCar" onSubmit={(e) => props.onFormSubmit(e)}>
//       {Object.keys(props.car).map((fieldName, idx) => {
//         return (
//           <div className="form_item" key={idx}>
//             <span className="form_label">{fieldName.toUpperCase()}:</span>
//             <input
//               readOnly={
//                 fieldName === 'id' || fieldName === 'image' ? true : false
//               }
//               className="input_item"
//               name={fieldName}
//               type="text"
//               placeholder={carFields[fieldName]}
//               value={props.car[fieldName]}
//               onChange={(e) => props.onChangeText(e)}
//             />
//           </div>
//         );
//       })}
//       <div className="form_item">
//         <span className="form_label">Main Image:</span>
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={(e) => props.onChange(e)}
//           key={props.reset}
//         />
//       </div>

//       <button id="upload_button" type="submit">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default Uploader;
