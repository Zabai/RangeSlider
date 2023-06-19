import { useRef, useState } from "react";
import styles from "./EditableLabel.module.css";

interface Props {
  canEdit?: boolean;
  onEdit: (value: string) => unknown;
  label?: string;
  value: string;
}

export function EditableLabel({ canEdit = true, label, onEdit, value }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isEditing) {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          onEdit(inputRef.current?.value ?? value);
          setIsEditing(false);
        }}
      >
        <input
          className={styles.input}
          autoFocus
          defaultValue={value}
          ref={inputRef}
          tabIndex={0}
          type="text"
        />
      </form>
    );
  }

  return (
    <label
      {...(canEdit
        ? {
            onClick: () => setIsEditing(true),
            role: "button",
          }
        : undefined)}
    >
      {label ?? value}
    </label>
  );
}
