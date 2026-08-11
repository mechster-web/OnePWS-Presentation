import { motion } from "framer-motion";
import { ArrowRight, Building2, Layers3, Route, ShieldCheck } from "lucide-react";
import {
  getCustomerPathRecommendations,
  industries,
  roles,
  type CustomerIndustry,
  type CustomerRole,
} from "../../content/customerPaths";
import { enabledChapters } from "../../content/chapters";
import { featureStories } from "../../content/featureStories";
import { projects } from "../../content/projects";
import { usePresentation } from "../../state/PresentationProvider";
import type { ReactNode } from "react";

export function CustomerPathSelector() {
  const { dispatch, state } = usePresentation();
  const recommendations = getCustomerPathRecommendations(state.customerPath);
  const selectedChapterCards = recommendations.recommendedChapters
    .map((chapterId) => enabledChapters.find((chapter) => chapter.id === chapterId))
    .filter((chapter): chapter is (typeof enabledChapters)[number] => Boolean(chapter));
  const selectedProducts = recommendations.recommendedProducts
    .map((featureId) => featureStories.find((feature) => feature.id === featureId))
    .filter((feature): feature is (typeof featureStories)[number] => Boolean(feature));
  const selectedProjects = recommendations.surfacedProjects
    .map((projectId) => projects.find((project) => project.id === projectId))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  function updateIndustry(industry: CustomerIndustry) {
    dispatch({
      type: "SET_CUSTOMER_PATH",
      selection: { ...state.customerPath, industry },
    });
  }

  function updateRole(role: CustomerRole) {
    dispatch({
      type: "SET_CUSTOMER_PATH",
      selection: { ...state.customerPath, role },
    });
  }

  function clearSelections() {
    dispatch({ type: "SET_CUSTOMER_PATH", selection: {} });
  }

  return (
    <>
      <p className="text-xs uppercase tracking-[0.4em] text-control-warm">Customer path</p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold md:text-5xl">
        Select the mission context. The complete journey remains available.
      </h2>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-control-soft md:text-base md:leading-7">
        Your selections prioritise the next chapters, recommend relevant product stories and surface
        source-backed projects. Unavailable sector proof is labelled neutrally.
      </p>

      <section className="mt-8 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-7">
          <SelectionGroup
            active={state.customerPath.industry}
            label="Industry"
            onSelect={(value) => updateIndustry(value as CustomerIndustry)}
            options={industries}
          />
          <SelectionGroup
            active={state.customerPath.role}
            label="Role"
            onSelect={(value) => updateRole(value as CustomerRole)}
            options={roles}
          />
        </div>

        <aside className="border border-control-line bg-control-black/28 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-control-warm">Recommended path</p>
            <Route aria-hidden="true" className="text-control-muted" size={18} />
          </div>

          {state.customerPath.industry || state.customerPath.role ? (
            <>
              <div className="mt-5 flex flex-wrap gap-2">
                {state.customerPath.industry ? <PathPill label={state.customerPath.industry} /> : null}
                {state.customerPath.role ? <PathPill label={state.customerPath.role} /> : null}
              </div>
              <RecommendationBlock icon={<Route aria-hidden="true" size={15} />} title="Prioritised chapters">
                {selectedChapterCards.length > 0 ? (
                  selectedChapterCards.map((chapter) => (
                    <button
                      className="group flex w-full items-center justify-between gap-3 border border-control-line bg-control-black/26 px-3 py-2 text-left text-sm text-control-soft transition hover:border-control-warm hover:text-control-warm"
                      key={chapter.id}
                      onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: chapter.id })}
                      type="button"
                    >
                      {chapter.title}
                      <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-0.5" size={14} />
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-control-muted">Neutral path active. All chapters remain available.</p>
                )}
              </RecommendationBlock>

              <RecommendationBlock icon={<Layers3 aria-hidden="true" size={15} />} title="Relevant products">
                {selectedProducts.length > 0 ? (
                  selectedProducts.slice(0, 5).map((feature) => (
                    <p className="text-sm leading-6 text-control-soft" key={feature.id}>
                      {feature.title}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-control-muted">No specific product mapping available. Use the connected-room overview.</p>
                )}
              </RecommendationBlock>

              <RecommendationBlock icon={<Building2 aria-hidden="true" size={15} />} title="Relevant projects">
                {selectedProjects.length > 0 ? (
                  selectedProjects.map((project) => (
                    <p className="text-sm leading-6 text-control-soft" key={project.id}>
                      {project.name}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-control-muted">
                    No source-backed project detail is available for this path. Use a neutral proof route.
                  </p>
                )}
              </RecommendationBlock>

              <RecommendationBlock icon={<ShieldCheck aria-hidden="true" size={15} />} title="Presenter framing">
                {recommendations.neutralRecommendations.map((recommendation) => (
                  <p className="text-sm leading-6 text-control-muted" key={recommendation}>
                    {recommendation}
                  </p>
                ))}
              </RecommendationBlock>
            </>
          ) : (
            <div className="mt-8 border-l border-control-warm/45 pl-4 text-sm leading-6 text-control-muted">
              Choose a path to tailor the sequence. The complete journey remains available.
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="inline-flex min-h-11 items-center gap-2 border border-control-warm bg-control-warm px-4 py-3 text-sm font-medium text-control-black"
              onClick={() => dispatch({ type: "SET_OVERLAY", overlay: null })}
              type="button"
            >
              Apply Path
            </button>
            <button
              className="inline-flex min-h-11 items-center gap-2 border border-control-line px-4 py-3 text-sm text-control-soft transition hover:border-control-warm hover:text-control-warm"
              onClick={clearSelections}
              type="button"
            >
              Clear
            </button>
          </div>
        </aside>
      </section>
    </>
  );
}

function SelectionGroup({
  active,
  label,
  onSelect,
  options,
}: {
  active?: string;
  label: string;
  onSelect: (value: string) => void;
  options: string[];
}) {
  return (
    <section>
      <p className="mb-3 text-xs uppercase tracking-[0.34em] text-control-warm">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((option, index) => (
          <motion.button
            animate={{ opacity: 1, y: 0 }}
            className={`min-h-12 border px-4 py-3 text-left text-sm transition ${
              active === option
                ? "border-control-warm bg-control-warm text-control-black"
                : "border-control-line bg-control-black/28 text-control-soft hover:border-control-warm hover:text-control-warm"
            }`}
            initial={{ opacity: 0, y: 8 }}
            key={option}
            onClick={() => onSelect(option)}
            transition={{ delay: index * 0.015 }}
            type="button"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function RecommendationBlock({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) {
  return (
    <section className="mt-6">
      <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-control-warm">
        {icon}
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function PathPill({ label }: { label: string }) {
  return <span className="border border-control-warm/55 px-3 py-2 text-xs text-control-warm">{label}</span>;
}
