import "./myButton.css";

interface MyButtonProps {
  label: string;
  onClick?: () => void;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  primary?: boolean;
}

const MyButton = ({
  label,
  backgroundColor,
  size = "medium",
  primary,
  ...props
}: MyButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button-${size}`, mode].join(
        " "
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

export default MyButton;

// note:
// 1. 添加 html attribute type button，避免放在 form 內會觸發 submit

// 2. 開放 className 與 style 給使用者的必要性？
//    A: 如果設計元件時，是給內部團隊重複應用，那麼我認為不應該開放客製化，來確保風格統一、可預期性。可以討論擴充 props，或需球是否本職上就不適合採用。
//       如果公開 library，那可以開發更大的彈性，讓不同團隊、需求都能採用與滿足。
//       「彈性、客製化不是越大越好，而是要適合需求。」

// 3. 假如 className 與 style 要開放客製化可以怎麼做？
//    A: 文件標示避免覆寫的部分，實作上用合併而非覆蓋。
//       ex：className={`class1 class2 ${customClassNames || ""}`}
