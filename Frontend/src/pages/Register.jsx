import styled from "styled-components";
import GlobalStyles from "./../GlobalStyles";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", password: "" };

    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!inputs.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        await axios.post("http://localhost:9000/api/v1/auth/register", inputs);
        window.location.href = "/Login";
      } catch (err) {
        console.log(err);

        if (err.response.status === 400) {
          setErrors((prev) => ({
            ...prev,
            email: "Username or email already exists",
          }));
        }
      }
    }
  };

  return (
    <>
      <GlobalStyles isLoginPage />
      <Container>
        <Title>Register</Title>
        <Form>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={inputs.username}
            required
            autoComplete="username"
          />
          <ErrorMessage>{errors.username}</ErrorMessage>

          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            required
            autoComplete="email"
          />
          <ErrorMessage>{errors.email}</ErrorMessage>

          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            required
            autoComplete="current-password"
          />
          <ErrorMessage>{errors.password}</ErrorMessage>

          <Button onClick={handleSubmit} type="submit">
            Register
          </Button>
          <Span>
            Do you already have an account?
            <Styledlink to="/Login">Login</Styledlink>
          </Span>
        </Form>
      </Container>
    </>
  );
};

export default Register;

const ErrorMessage = styled.div`
  color: #f00;
  font-size: 14px;
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 35vw;
  margin: 50px auto;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 820px) {
    width: 60vw;
    height: 70vh;
    margin: 30px auto;
  }

  @media (max-width: 768px) {
    width: 60vw;
    height: 50vh;
    margin: 20px auto;
  }

  @media (max-width: 480px) {
    width: 70vw;
    height: 60vh;
    margin: 10px auto;
  }

  @media (max-width: 365px) {
    width: 90vw;
    height: 50vh;
    margin: 5px auto;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #ccc;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 30px;
    font-size: 12px;
    margin: 5px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 20px;
    font-size: 10px;
    margin: 3px;
    padding: 3px;
  }
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0069d9;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 30px;
    font-size: 12px;
    margin: 5px;
    padding: 5px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 20px;
    font-size: 10px;
    margin: 3px;
    padding: 3px;
  }
`;

const Span = styled.span`
  color: #fff;
  font-size: 16px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }

  &:hover {
    color: #007bff;
  }
`;

const Styledlink = styled(Link)`
  color: #f30522;
  text-decoration: none;
  margin-left: 5px;
  transition: text-decoration 0.3s;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
