import React from 'react';
import { loginUser, registerUser } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    image: ''
  });

  const [errorMessage, updateErrorMessage] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [loginData, updateLoginData] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
    updateLoginData({ email: user.email, password: user.password });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        await registerUser(user);
        navigate('/');
      } catch (err) {
        updateErrorMessage(err.response.data);
      }
    };
    getData();
  }

  function handleChangeForDropdown(event) {
    setUser({ ...user, image: event.target.text });
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
            <small className="has-text-danger"> {errorMessage.username}</small>
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
            <small className="has-text-danger">{errorMessage.email}</small>

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
            <small className="has-text-danger">{errorMessage.password}</small>
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
            <div>
              <small className="has-text-danger">
                {errorMessage.password_confirmation}
              </small>
            </div>
            <div class="select is-multiple is-fullwidt mb-3">
              <label className="label ">Emoji </label>
              <select multiple size="3">
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐶{' '}
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐱
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐭
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐰
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🦊
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐻
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐼
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  onChange={handleChange}
                  value={user.image}
                >
                  🐨
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐯
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐮
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🐸
                </option>
                <option
                  onClick={handleChangeForDropdown}
                  name="image"
                  value={user.image}
                >
                  🦉
                </option>
              </select>
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
