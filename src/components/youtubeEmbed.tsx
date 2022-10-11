const YoutubeEmbed: React.FC<Props> = ({ embedId }) => {
  return (
    <div className="video-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        width="853"
        height="480"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media"
        title="embeded youtube"
      />
    </div>
  )
}

interface Props {
  embedId: string
}

export default YoutubeEmbed
