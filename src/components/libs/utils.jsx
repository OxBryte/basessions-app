// utils/truncate.js
export const truncate = (text = "", maxLength = 50) => {
  const ellipsis = "...";

  if (typeof text !== "string") return "";
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, maxLength);
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
};

// eslint-disable-next-line react/prop-types
// export const TruncateText = ({ children, length = 50 }) => {
//   const text = typeof children === "string" ? children : String(children);
//   return <>{truncate(text, length)}</>;
// };


export const goBack = () => {
    // Using browser's built history navigation
    window.history.back();
    
    // Alternative method:
    // window.history.go(-1);
  };