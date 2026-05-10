/**
 * Primary interactive control with variants, sizes, loading state, and accessible disabled handling.
 */

import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

function cx(...parts: (string | undefined | false)[]): string {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled ?? loading;

  return (
    <button
      type={type}
      className={cx(styles.button, styles[variant], styles[size], className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden /> : null}
      <span style={{ opacity: loading ? 0.85 : 1 }}>{children}</span>
    </button>
  );
}
