import signupImage from "../assets/images/signup.svg";
import classes from "../styles/Illustration.module.css";

export default function Illustration({ children }) {
  let imgTag = <img src={signupImage} alt="Signup" />;
  return (
    <div className={classes.illustration}>{children ? children : imgTag}</div>
  );
}
