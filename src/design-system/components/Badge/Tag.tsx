/**
 * Alias of `Badge` for inline keyword-style labels (same styles, semantic name).
 */

import { Badge } from "./Badge";
import type { BadgeProps } from "./Badge.types";

export type TagProps = BadgeProps;

export function Tag(props: TagProps) {
  return <Badge {...props} />;
}
