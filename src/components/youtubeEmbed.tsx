const YoutubeEmbed: React.FC<Props> = ({ embedId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 ">
      <iframe
        className=""
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
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
