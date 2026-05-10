/**
 * Multi-line field mirroring `Input` label, hint, and error patterns.
 */

import { useId } from "react";
import styles from "./Input.module.css";
import type { TextareaProps } from "./Textarea.types";

export function Textarea({ label, hint, error, id: idProp, className, ...rest }: TextareaProps) {
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
      <textarea
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
