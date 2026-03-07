const Header = ({ title, description }) => {

  const wrapperStyle = {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "10px 16px 18px",
    backgroundColor: "#ffffff"
  };

  const titleStyle = {
    margin: 0,
    fontSize: "clamp(28px, 2.4vw, 44px)",
    lineHeight: 1.15,
    fontWeight: 700,
    color: "#111111"
  };

  const descStyle = {
    marginTop: "10px",
    marginBottom: 0,
    fontSize: "clamp(14px, 1.1vw, 16px)",
    lineHeight: 1.6,
    color: "rgba(0, 0, 0, 0.65)",
    maxWidth: "70ch"
  };

  return (
    <header style={wrapperStyle}>
      <h1 style={titleStyle}>{title}</h1>
      {description && <p style={descStyle}>{description}</p>}
    </header>
  );
};

export default Header;
