import data from "@/public/music/tracks.json";

export interface Track {
  /** 歌曲名，显示在下拉框中 */
  name: string;
  /** public 下路径，播放时经 encodeURI 处理中文文件名 */
  src: string;
  /** 制作人，显示在署名「音乐由 {producer} 制作」中 */
  producer: string;
}

export const tracks: Track[] = data;
