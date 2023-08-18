function Button({ bgColor, color = "while", text }) {
  return (
    <button style={{ color: color, backgroundColor: bgColor }}>{text}</button>
  );
}

export default Button;
