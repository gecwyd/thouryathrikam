import type { StaticImageData } from "next/image";

import anchors from "@/public/story/anchors.webp";
import beforeCurtain from "@/public/story/before-curtain.webp";
import campusAerial from "@/public/story/campus-aerial.webp";
import campusTrail from "@/public/story/campus-trail.webp";
import confettiCrowdPoster from "@/public/story/confetti-crowd-poster.webp";
import decibelStagePoster from "@/public/story/decibel-stage-poster.webp";
import djNightPoster from "@/public/story/dj-night-poster.webp";
import duffmuttu from "@/public/story/duffmuttu.webp";
import inCharacter from "@/public/story/in-character.webp";
import liveWidePoster from "@/public/story/live-wide-poster.webp";
import mappilaArts from "@/public/story/mappila-arts.webp";
import mohiniyattamMono from "@/public/story/mohiniyattam-mono.webp";
import mohiniyattam from "@/public/story/mohiniyattam.webp";
import oppana from "@/public/story/oppana.webp";
import pyroNight from "@/public/story/pyro-night.webp";
import smokeStage from "@/public/story/smoke-stage.webp";
import vocalist from "@/public/story/vocalist.webp";
import welcomeSign from "@/public/story/welcome-sign.webp";

// All media comes from the @thouryathrikam_gecw story highlight.
// Photo stories were exported by Instagram as static videos; these are frames pulled from them.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const CERTIFICATE_URL = "https://thauryathrikam.vercel.app/certificates";
export const INSTAGRAM_URL = "https://instagram.com/thouryathrikam_gecw";

export type StoryItem =
  | { kind: "image"; id: string; src: StaticImageData; caption: string }
  | { kind: "video"; id: string; src: string; poster: StaticImageData; caption: string };

const video = (id: string, poster: StaticImageData, caption: string): StoryItem => ({
  kind: "video",
  id,
  src: `${basePath}/story/${id}.mp4`,
  poster,
  caption,
});

const image = (id: string, src: StaticImageData, caption: string): StoryItem => ({
  kind: "image",
  id,
  src,
  caption,
});

export const media = {
  welcomeSign: image("welcome-sign", welcomeSign, "The welcome, written in grass"),
  pyroNight: image("pyro-night", pyroNight, "Fire on the main stage"),
  campusTrail: image("campus-trail", campusTrail, "The campus, dressed for the fest"),
  mohiniyattam: image("mohiniyattam", mohiniyattam, "Mohiniyattam under the lights"),
  mohiniyattamMono: image("mohiniyattam-mono", mohiniyattamMono, "Mid-step, in monochrome"),
  decibelStage: video("decibel-stage", decibelStagePoster, "SATHVA × DECIBEL"),
  duffmuttu: image("duffmuttu", duffmuttu, "Waiting for the beat"),
  djNight: video("dj-night", djNightPoster, "The night went loud"),
  anchors: image("anchors", anchors, "Voices of the stage"),
  mappilaArts: image("mappila-arts", mappilaArts, "Mappila arts on stage"),
  confettiCrowd: video("confetti-crowd", confettiCrowdPoster, "Confetti, smoke and a thousand hands"),
  inCharacter: image("in-character", inCharacter, "In character"),
  beforeCurtain: image("before-curtain", beforeCurtain, "Moments before the curtain"),
  campusAerial: image("campus-aerial", campusAerial, "GECW from above, lit up"),
  vocalist: image("vocalist", vocalist, "One mic, one voice"),
  smokeStage: image("smoke-stage", smokeStage, "Smoke over the front row"),
  oppana: image("oppana", oppana, "Oppana team, all smiles"),
  liveWide: video("live-wide", liveWidePoster, "Live from the main stage"),
} satisfies Record<string, StoryItem>;

// Original highlight order, for the story viewer.
export const storyReel: StoryItem[] = [
  media.welcomeSign,
  media.pyroNight,
  media.campusTrail,
  media.mohiniyattam,
  media.mohiniyattamMono,
  media.decibelStage,
  media.duffmuttu,
  media.djNight,
  media.anchors,
  media.mappilaArts,
  media.confettiCrowd,
  media.inCharacter,
  media.beforeCurtain,
  media.campusAerial,
  media.vocalist,
  media.smokeStage,
  media.oppana,
  media.liveWide,
];
