import {useQuery} from "react-query";
import {addNewTag, getAllTags} from "@/hooks/tag";
import SingleTag from "@/components/admin/SingleTag";
import {useCallback, useState} from "react";
import {Tag} from "@/hooks/conference";


const AdminTags = () => {

  const [newTag, setNewTag] = useState<string>("")

  const {
    data: tagsData,
    isLoading: tagsLoading,
    isError: tagsError,
    refetch: tagsRefetch,
  } = useQuery("get all tags", getAllTags)

  const handleAddTag = useCallback(async (tagName: string) => {
    try {
      const response = await addNewTag(tagName);
      if (response === 200) await tagsRefetch();

    } catch (error) {
      console.log(error);
    }
  },[])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key)
  }

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          id="newTag"
          name="newTag"
          placeholder="Nowy tag"
          value={newTag}
          onChange={(e) => {
            const value = e.target.value;
            const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,40}$/i.test(value);
            if (isValid) setNewTag(value.toUpperCase());
          }}
          onKeyDown={(e) => {e.code === 'Enter' && handleAddTag(newTag)}}
          className="max-w-full border-2 border-blue px-2 focus:outline-none focus:border-darkblue focus:border-b-2 bg-close2White transition-colors rounded-lg"
          autoComplete="off"
          required
        />
        <button
          className="rounded-full bg-darkblue text-white px-2 py-1 w-min text-nowrap"
          onClick={() => {handleAddTag(newTag)}}
        >
          Zapisz
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {
          tagsData &&
          !tagsLoading &&
          typeof tagsData !== "string" ?
          tagsData.sort((a: Tag, b: Tag) => a.tagName < b.tagName ? -1 : 1).map((tag, index) => {
            return <SingleTag key={index} tag={tag}/>
          })
            : <p>Ładowanie...</p>
        }
      </div>
    </>
  );
}

export default AdminTags;