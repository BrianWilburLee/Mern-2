import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const generatePassword = () => {
    const length = 12;
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+{}[]<>?";
    const allChars = lower + upper + numbers + special;

    let generatedPassword = "";
    
    // Ensure at least one of each required character
    generatedPassword += lower[Math.floor(Math.random() * lower.length)];
    generatedPassword += upper[Math.floor(Math.random() * upper.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
    generatedPassword += special[Math.floor(Math.random() * special.length)];

    // Fill remaining characters randomly
    for (let i = 4; i < length; i++) {
      generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to randomize character order
    generatedPassword = generatedPassword.split('').sort(() => 0.5 - Math.random()).join('');

    setPassword(generatedPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      
      <button type="button" onClick={generatePassword}>Generate Password</button>

      <button disabled={isLoading}>Sign up</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
