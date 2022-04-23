import React from 'react';
import { registerUser } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    image: '',
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
    <section className="hero is-fullheight-with-navbar is-success">
      <div className="section has-background-success">
        <div className="container">
          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  placeholder="example"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                />
                <span className="icon is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  placeholder="example@example.com"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                />
                <span className="icon is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  placeholder=""
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
                <span className="icon is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  placeholder=""
                  name="password_confirmation"
                  onChange={handleChange}
                  value={user.password_confirmation}
                />
                <span className="icon is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Emoji </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  placeholder=""
                  name="image"
                  onChange={handleChange}
                  value={user.image}
                />
                <span className="icon is-left">
                  <i className="fas fa-horse-head"></i>
                </span>
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
