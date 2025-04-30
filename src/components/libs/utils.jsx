import { keccak256, toBigInt } from "web3-utils";

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

export async function copyToClipboard(text) {
  // First try the modern API
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to fallback
    }
  }

  // Fallback approach
  const textarea = document.createElement("textarea");
  textarea.value = text;
  // avoid scrolling to bottom
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.padding = "0";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.boxShadow = "none";
  textarea.style.background = "transparent";

  document.body.appendChild(textarea);
  textarea.select();

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }

  document.body.removeChild(textarea);
  return success;
}

export const stringToUint256 = (str) => {
  const hash = keccak256(str); // e.g., 0xabc123...
  const uint = toBigInt(hash).toString(); // Convert to decimal string
  return uint;
};

export const mapping = {
  [stringToUint256("abc-123")]: "abc-123",
  [stringToUint256("another-video")]: "another-video",
};
