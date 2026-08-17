import { createFileRoute } from "@tanstack/react-router";
import { JourneyProvider } from "@/components/cosmos/JourneyContext";
import { Journey } from "@/components/cosmos/Journey";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Worlds of Buddhism — A Journey Through Buddhist Cosmology" },
      {
        name: "description",
        content:
          "Travel the realms of Buddhist cosmology: the six realms, Mount Meru, the form and formless realms, the Wheel of Life, and Nirvāṇa — with sources and tradition-by-tradition differences.",
      },
      { property: "og:title", content: "The Worlds of Buddhism — A Journey Through Buddhist Cosmology" },
      {
        property: "og:description",
        content:
          "An interactive, scroll-driven journey through the realms, heavens and hells described across Buddhist traditions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <JourneyProvider>
      <Journey />
    </JourneyProvider>
  );
}
