/**
 * Text field with optional label, hint, and error states for accessible forms.
 */

import { useId } from "react";
import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

export function Input({ label, hint, error, id: idProp, className, ...rest }: InputProps) {
  const uid = useId();
  const id = idProp ?? uid;
  const invalid = Boolean(error);

  return (
    <div className={styles.wrap}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={`${styles.field} ${invalid ? styles.fieldInvalid : ""} ${className ?? ""}`}
        aria-invalid={invalid || undefined}
        aria-describedby={
          [hint ? `${id}-hint` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ") ||
          undefined
        }
        {...rest}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
