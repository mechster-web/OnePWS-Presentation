import type { Chapter } from "../../data/contentTypes";
import type { ReactElement } from "react";

export type SceneComponentProps = {
  chapter: Chapter;
  presenterPreview?: boolean;
};

export type SceneComponent = (props: SceneComponentProps) => ReactElement;
