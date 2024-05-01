import {Tag} from "@/hooks/conference";
import { BsFillTrash3Fill } from "react-icons/bs";
import {useCallback, useState} from "react";
import {deleteTag} from "@/hooks/tag";
import {UseQueryResult} from "react-query";

type props = {
  tag: Tag,
  refetch: () => Promise<UseQueryResult>,
}

const SingleTag = ({tag, refetch} : props) => {

  const handleDeleteTag = useCallback(async () => {
    try {
      const response = await deleteTag(tag.id);
      if (response === 200) {
        await refetch();
      }
    } catch (error) {
      console.log(error);
    }
  },[])

  return (
    <p
      className="flex gap-x-2 items-center justify-center rounded-full bg-gray-300 px-2 py-1 w-min text-nowrap text-xs xs:text-base group"
    >
      {tag.tagName}
      <BsFillTrash3Fill
        className={`text-red-500 cursor-pointer hidden group-focus:block group-hover:block`}
        onClick={handleDeleteTag}
      />
    </p>
  )
}

export default SingleTag;