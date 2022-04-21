import React from 'react';
import { registerUser } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await registerUser(user);
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }

  return (
    <section className="section has-background-success">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  onChange={handleChange}
                  value={user.passwordConfirmation}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-info">
                Register Me!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
