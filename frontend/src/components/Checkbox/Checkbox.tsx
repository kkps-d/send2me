import styles from "./Checkbox.module.css";
import { useState } from "react";

type CheckboxProps = {
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
};

export function Checkbox({
  checked,
  setChecked,
  label = "Checkbox",
}: CheckboxProps) {
  const [_checked, _setChecked] = useState(false);

  const checkedState = checked !== undefined ? checked : _checked;

  const setCheckedState = setChecked !== undefined ? setChecked : _setChecked;

  const toggledChecked = () => {
    setCheckedState((state) => !state);
  };

  return (
    <div className={styles.container} onClick={toggledChecked}>
      <div className={`${styles.checkbox}`}>
        {checkedState && (
          <span className="material-symbols-outlined">check</span>
        )}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
