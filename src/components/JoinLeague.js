// import React from 'react';
// import { loginUser } from '../lib/api';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   // const navigate = useNavigate();

//   const [leagueinfo, setleagueinfo] = React.useState({
//     email: '',
//     password: '',
//   });

//   function handleChange(event) {
//     setleagueinfo({ ...leagueinfo, [event.target.name]: event.target.value });
//   }

//   // function handleSubmit(event) {
//   //   event.preventDefault();

//   //   const getData = async () => {
//   //     try {
//   //       const { data } = await loginUser(leagueinfo);
//   //       localStorage.setItem('accessToken', data.token);
//   //       navigate('/');
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //   };
//   //   getData();
//   // }

//   return (
//     <section className="hero is-fullheight-with-navbar is-success">
//       <div className="section has-background-success">
//         <div className="container">
//           <div className="columns">
//             <form
//               className="box column is-half is-offset-one-quarter"
//               onSubmit={handleSubmit}
//             >
//               <div className="field">
//                 <label className="label">Email</label>
//                 <div className="control has-icons-left">
//                   <input
//                     className="input"
//                     placeholder="example@example.com"
//                     name="email"
//                     onChange={handleChange}
//                     value={user.email}
//                   />
//                   <span className="icon is-left">
//                     <i className="fas fa-envelope"></i>
//                   </span>
//                 </div>
//               </div>
//               <div className="field">
//                 <label className="label">Password</label>
//                 <div className="control has-icons-left">
//                   <input
//                     type="password"
//                     className="input"
//                     placeholder=""
//                     name="password"
//                     onChange={handleChange}
//                     value={user.password}
//                   />
//                   <span className="icon is-left">
//                     <i className="fas fa-lock"></i>
//                   </span>
//                 </div>
//               </div>
//               <div className="field">
//                 <button
//                   href="/login"
//                   type="submit"
//                   className="button is-fullwidth is-info"
//                 >
//                   Log Me In!
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;
