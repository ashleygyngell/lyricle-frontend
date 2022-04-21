import React from 'react';
import { loginUser } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        const { data } = await loginUser(user);
        localStorage.setItem('accessToken', data.token);
        navigate('/');
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
            className="box column is-half is-offset-one-quarter"
            onSubmit={handleSubmit}
          >
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
              <button type="submit" className="button is-fullwidth is-info">
                Log Me In!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
