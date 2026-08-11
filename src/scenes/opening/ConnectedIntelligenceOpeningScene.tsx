import { motion } from "framer-motion";
import { HotspotCallout } from "../../design-system/components/InteractionCues";
import { MediaStage } from "../../design-system/components/MediaStage";
import { AmbientLayer, SafeArea, SceneCanvas, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { motionFamilyTransition } from "../../design-system/motionLanguage";
import { openingAssets, openingConnections } from "./openingConfig";

export function ConnectedIntelligenceOpeningScene({
  reducedMotion,
  exploredConnectionIds,
  onConnection,
}: {
  reducedMotion: boolean;
  exploredConnectionIds: string[];
  onConnection: (connectionId: string) => void;
}) {
  return (
    <SceneCanvas theme="data-dark" performanceMode="balanced">
      <MediaStage
        assetId={openingAssets.wide}
        focalPoint="50% center"
        overlayStrength="medium"
        panDirection="none"
        parallaxIntensity={0.2}
        reveal="fade"
        scale={1.01}
      />
      <AmbientLayer atmosphere="data-trace" intensity="medium" />
      <StructuralLayer variant="data" />
      <SafeArea>
        <div className="grid h-full grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] items-center gap-[var(--pws-space-6)] max-lg:grid-cols-1">
          <div>
            <p className="pws-technical-label">Connected intelligence</p>
            <h1 className="pws-chapter-title mt-[var(--pws-space-3)]">One environment. Connected intelligence.</h1>
            <p className="pws-body-copy mt-[var(--pws-space-4)] max-w-xl">
              Consoles, video wall, lighting, acoustics, supervisor areas and intelligent layers are explored as one connected environment.
            </p>
          </div>
          <div className="relative min-h-[24rem]">
            <div className="absolute inset-0 border border-white/10" />
            {openingConnections.map((connection, index) => (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="absolute"
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                key={connection.id}
                style={positions[index]}
                transition={motionFamilyTransition("data-intelligence", reducedMotion, 0.18 + index * 0.14)}
              >
                <HotspotCallout
                  active={exploredConnectionIds.includes(connection.id)}
                  description={connection.outcome}
                  label={connection.label}
                  onClick={() => onConnection(connection.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </SafeArea>
    </SceneCanvas>
  );
}

const positions = [
  { left: "8%", top: "42%" },
  { left: "38%", top: "58%" },
  { left: "58%", top: "18%" },
  { left: "70%", top: "48%" },
  { left: "24%", top: "16%" },
  { left: "48%", top: "78%" },
];
