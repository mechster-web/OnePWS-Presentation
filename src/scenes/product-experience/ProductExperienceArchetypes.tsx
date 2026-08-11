import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import { ProductHeroArchetype } from "../../experience/archetypes/ArchetypeScenes";
import { isConsoleExperienceChapter, ProductExperienceScene } from "./ProductExperienceScene";
import { getProductExperience } from "./productExperienceConfig";

export function ProductHeroExperienceArchetype(props: SceneComponentProps) {
  const fallback = <ProductHeroArchetype {...props} />;
  return getProductExperience(props.chapter.id) || isConsoleExperienceChapter(props.chapter.id)
    ? <ProductExperienceScene chapter={props.chapter} fallback={fallback} />
    : fallback;
}
