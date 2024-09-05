// import React from 'react';

// const ModalForm = ({ 
//   showModal, 
//   setShowModal, 
//   title, 
//   fields, 
//   data, 
//   setData, 
//   handleSubmit, 
//   buttonText 
// }) => {

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className={`modal ${showModal ? 'is-active' : ''}`}>
//       <div className="modal-background" onClick={() => setShowModal(false)}></div>
//       <div className="modal-card">
//         <header className="modal-card-head">
//           <p className="modal-card-title">{title}</p>
//           <button className="delete" aria-label="close" onClick={() => setShowModal(false)}></button>
//         </header>
//         <section className="modal-card-body">
//           <form onSubmit={handleSubmit}>
//             {fields.map((field, index) => (
//               <div className="field" key={index}>
//                 <label className="label">{field.label}</label>
//                 <div className="control">
//                   {field.type === 'select' ? (
//                     <div className="select">
//                       <select 
//                         name={field.name} 
//                         value={data[field.name]} 
//                         onChange={handleChange}
//                         required={field.required}>
//                         {field.options.map((option, idx) => (
//                           <option key={idx} value={option.value}>{option.label}</option>
//                         ))}
//                       </select>
//                     </div>
//                   ) : (
//                     <input 
//                       className="input" 
//                       type={field.type} 
//                       placeholder={field.placeholder} 
//                       name={field.name} 
//                       value={data[field.name]} 
//                       onChange={handleChange} 
//                       required={field.required}
//                     />
//                   )}
//                 </div>
//               </div>
//             ))}
//             <footer className="modal-card-foot">
//               <button className="button is-primary" type="submit">
//                 {buttonText}
//               </button>
//               <button className="button" onClick={() => setShowModal(false)}>
//                 Cancelar
//               </button>
//             </footer>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ModalForm;
