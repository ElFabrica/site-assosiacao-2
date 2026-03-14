export function getYouTubeId(url: string) {
  if (!url) return null;

  const regExp =
    /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;

  const match = url.match(regExp);
  return match?.[2] || null;
}

export function getYouTubeEmbedUrl(url: string) {
  const id = getYouTubeId(url);
  if (!id) return null;

  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1`;
}
