interface EventCardProps {
  date: string;
  image?: {
    alt: string;
    height: number;
    url: string;
    width: number;
  }
  location: string;
  name: string;
}

const EventCard = ({ date, image, location, name }: EventCardProps) => {
  return (
    <div className="rounded overflow-hidden bg-white shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] dark:bg-slate-700">
      <div className="relative">
        {image?.url && (
          <img
            width={800}
            height={450}
            src={image.url}
            alt={image.alt}
          />
        )}
      </div>
      <div className="py-4 px-5">
        <p className="mb-1 text-md font-bold leading-tight text-neutral-800 dark:text-neutral-50">
          { name }
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-200">
          { new Date(date).toLocaleString('en-US', { month: 'long', day: 'numeric' }) }
          &nbsp;&nbsp;/&nbsp;&nbsp;
          { location }
        </p>
      </div>
    </div>
  )
}

export default EventCard;