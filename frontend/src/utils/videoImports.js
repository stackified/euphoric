/**
 * Video Imports Utility
 * Centralized video file imports for easy management
 */

// Import all video files
import video1 from "../assets/59b91bab-018d-414d-81a6-1c6924fb2157.MP4";
import video2 from "../assets/9cafc2c4-1062-4f40-a7cc-133291f69693.mov";
import video3 from "../assets/a3aa3ea2-9666-4949-a152-8c21c7dca4ce.MP4";
import video4 from "../assets/C0790.MP4";
import video5 from "../assets/C0795.MP4";
import video6 from "../assets/edd10a0b-0637-4617-8704-893f820eff3f.MP4";
import video7 from "../assets/fe825d9a-8224-4564-9b9c-cd2b67d22eb9.MP4";
import video8 from "../assets/IMG_2804.MOV";
import video9 from "../assets/IMG_3754.mov";
import video10 from "../assets/IMG_4403.mov";
import video11 from "../assets/IMG_4405.mov";
import video12 from "../assets/IMG_4772.MOV";
import video13 from "../assets/IMG_4775.MOV";
import video14 from "../assets/IMG_4776.MOV";
import video15 from "../assets/IMG_4778.MOV";
import video16 from "../assets/IMG_4877.MOV";
import video17 from "../assets/IMG_4882.MOV";
import video18 from "../assets/IMG_4896.MOV";
import video19 from "../assets/IMG_4898.MOV";
import video20 from "../assets/IMG_4899.MOV";
import video21 from "../assets/IMG_4957.MOV";
import video22 from "../assets/reel 01.MP4";

// Video data array with metadata
export const videos = [
  {
    id: 1,
    title: "Live Performance Highlights",
    src: video6,
    description: "Highlights from our recent live performance",
    featured: true,
  },
  {
    id: 2,
    title: "Concert Experience",
    src: video1,
    description: "Capturing the energy of live music",
    featured: true,
  },
  {
    id: 3,
    title: "Stage Performance",
    src: video3,
    description: "Professional stage production showcase",
    featured: true,
  },
  {
    id: 4,
    title: "Event Showcase",
    src: video7,
    description: "A showcase of our musical performances",
    featured: true,
  },
  {
    id: 5,
    title: "Behind the Scenes",
    src: video2,
    description: "Go behind the scenes of our production",
    featured: false,
  },
  {
    id: 6,
    title: "Performance Reel",
    src: video22,
    description: "Best moments compilation",
    featured: true,
  },
  {
    id: 7,
    title: "Live Concert",
    src: video4,
    description: "Full concert experience",
    featured: false,
  },
  {
    id: 8,
    title: "Stage Moments",
    src: video5,
    description: "Memorable stage performances",
    featured: false,
  },
  {
    id: 9,
    title: "Performance Clip 1",
    src: video8,
    description: "Live performance highlights",
    featured: false,
  },
  {
    id: 10,
    title: "Performance Clip 2",
    src: video9,
    description: "Musical moments captured",
    featured: false,
  },
  {
    id: 11,
    title: "Performance Clip 3",
    src: video10,
    description: "Stage energy and presence",
    featured: false,
  },
  {
    id: 12,
    title: "Performance Clip 4",
    src: video11,
    description: "Live music experience",
    featured: false,
  },
  {
    id: 13,
    title: "Performance Clip 5",
    src: video12,
    description: "Concert highlights",
    featured: false,
  },
  {
    id: 14,
    title: "Performance Clip 6",
    src: video13,
    description: "Stage performance",
    featured: false,
  },
  {
    id: 15,
    title: "Performance Clip 7",
    src: video14,
    description: "Live music showcase",
    featured: false,
  },
  {
    id: 16,
    title: "Performance Clip 8",
    src: video15,
    description: "Musical performance",
    featured: false,
  },
  {
    id: 17,
    title: "Performance Clip 9",
    src: video16,
    description: "Concert moments",
    featured: false,
  },
  {
    id: 18,
    title: "Performance Clip 10",
    src: video17,
    description: "Live performance",
    featured: false,
  },
  {
    id: 19,
    title: "Performance Clip 11",
    src: video18,
    description: "Stage highlights",
    featured: false,
  },
  {
    id: 20,
    title: "Performance Clip 12",
    src: video19,
    description: "Musical showcase",
    featured: false,
  },
  {
    id: 21,
    title: "Performance Clip 13",
    src: video20,
    description: "Live concert experience",
    featured: false,
  },
  {
    id: 22,
    title: "Performance Clip 14",
    src: video21,
    description: "Stage performance highlights",
    featured: false,
  },
];

// Get featured videos (for homepage)
export const getFeaturedVideos = (count = 6) => {
  return videos.filter((v) => v.featured).slice(0, count);
};

// Get all videos
export const getAllVideos = () => {
  return videos;
};
