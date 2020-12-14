// import React from 'react';
// import axios from 'axios';

// const carFields = {
//   make: 'Honda',
//   model: 'Civic',
//   year: '2008',
//   price: '1000.00',
//   engine: 'V8',
//   drive: 'RWD',
//   feature1: 'None',
//   description: 'This is a nice car',
// };

// export default class Upload extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       make: '',
//       model: '',
//       year: '',
//       price: '',
//       engine: '',
//       drive: '',
//       feature1: '',
//       description: '',
//       file: null,
//       reset: '',
//     };
//     this.onFormSubmit = this.onFormSubmit.bind(this);
//     this.onChange = this.onChange.bind(this);
//     this.onChangeText = this.onChangeText.bind(this);
//   }

//   async onFormSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', this.state.file);
//     formData.append('make', this.state.make);
//     formData.append('model', this.state.model);
//     formData.append('year', this.state.year);
//     formData.append('price', this.state.price);
//     formData.append('engine', this.state.engine);
//     formData.append('drive', this.state.drive);
//     formData.append('feature1', this.state.feature1);
//     formData.append('description', this.state.description);

//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
//     await axios
//       .post('/api/uploadCarImage', formData, config)
//       .then((response) => {})
//       .catch((error) => {});
//     this.updateCars();
//     this.setState({ car: emptyCar });
    //this.setState({ reset: Math.random().toString(36) });
  }

//   onChange(e) {
//     this.setState({ file: e.target.files[0] });
//   }
//   onChangeText(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   render() {
//     return (
//       <form id="newCar" onSubmit={this.onFormSubmit}>
//         {Object.keys(carFields).map((fieldName, idx) => {
//           return (
//             <div className="form_item" key={idx}>
//               <span className="form_label">{fieldName.toUpperCase()}:</span>
//               <input
//                 className="input_item"
//                 name={fieldName}
//                 type="text"
//                 placeholder={carFields[fieldName]}
//                 value={
//                   fieldName === 'image'
//                     ? this.state[fieldName].slice(
//                         this.state[fieldName].lastIndexOf('/') + 1
//                       )
//                     : this.state[fieldName]
//                 }
//                 onChange={this.onChangeText}
//               />
//             </div>
//           );
//         })}
//         <div className="form_item">
//           <span className="form_label">Main Image:</span>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={this.onChange}
//             key={this.state.reset}
//           />
//         </div>

//         <button id="upload_button" type="submit">
//           Submit
//         </button>
//       </form>
//     );
//   }
// }

/* <form
action="/uploadCarImages"
method="post"
enctype="multipart/form-data"
>
<input type="file" name="car" accept="image/*" multiple />
<button>Submit</button>
</form> */
//export default Upload;
