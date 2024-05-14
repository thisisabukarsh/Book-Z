import "./Footer.css";

const Footer = () => {
  const today = new Date();

  return (
    <p>
      &copy;{today.getFullYear()}
      <span> Z-Book </span>All Rights Reserved.
    </p>
  );
};

export default Footer;
