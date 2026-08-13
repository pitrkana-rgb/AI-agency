import { ResponsiveWebpImage } from "../../../../components/ResponsiveWebpImage";
import {
  REALIZACE_PREVIEW_INTRINSIC,
  REALIZACE_PREVIEW_SIZES,
  realizacePreviewBasePath,
  REALIZACE_PREVIEW_WIDTHS,
} from "./realizacePreviewAssets";

type RealizacePreviewImageProps = {
  imageId: string;
  className: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export const RealizacePreviewImage = ({
  imageId,
  className,
  loading = "lazy",
  fetchPriority,
}: RealizacePreviewImageProps): JSX.Element => (
  <ResponsiveWebpImage
    basePath={realizacePreviewBasePath(imageId)}
    widths={REALIZACE_PREVIEW_WIDTHS}
    sizes={REALIZACE_PREVIEW_SIZES}
    width={REALIZACE_PREVIEW_INTRINSIC.width}
    height={REALIZACE_PREVIEW_INTRINSIC.height}
    className={className}
    loading={loading}
    fetchPriority={fetchPriority}
  />
);
