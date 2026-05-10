/**
 * Circular avatar with image support and initials fallback when the image is unavailable.
 */

import { useState } from "react";
import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types";

function cx(...parts: (string | undefined | false)[]): string {
  return parts.filter(Boolean).join(" ");
}

export function Avatar({ src, alt = "", fallback, size = "md", className, ...rest }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  return (
    <span
      className={cx(styles.wrap, styles[size], className)}
      role="img"
      aria-label={typeof alt === "string" && alt ? alt : undefined}
    >
      {showImg ? (
        <img
          {...rest}
          src={src}
          alt={alt}
          className={styles.img}
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{fallback ?? "?"}</span>
      )}
    </span>
  );
}
