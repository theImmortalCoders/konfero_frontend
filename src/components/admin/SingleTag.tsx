import {Tag} from "@/hooks/conference";

type props = {
  tag: Tag,
}

const SingleTag = ({tag} : props) => {
  return (
    <p
      className="rounded-full bg-gray-300 px-2 py-1 w-min text-nowrap text-xs xs:text-base"
    >
      {tag.tagName}
    </p>
  )
}

export default SingleTag;