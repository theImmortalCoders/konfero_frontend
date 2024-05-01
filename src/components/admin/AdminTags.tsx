import {useQuery} from "react-query";
import {addNewTag, getAllTags} from "@/hooks/tag";
import SingleTag from "@/components/admin/SingleTag";
import {useCallback, useState} from "react";
import {Tag} from "@/hooks/conference";


const AdminTags = () => {

  const [newTag, setNewTag] = useState<string>("")
  const [addError, setAddError] = useState<string | undefined>(undefined)

  const {
    data: tagsData,
    isLoading: tagsLoading,
    isError: tagsError,
    refetch: tagsRefetch,
  } = useQuery("get all tags", getAllTags)

  const handleAddTag = useCallback(async (tagName: string) => {
    try {
      if (tagName.length > 0) {
        setAddError(undefined)
        const response = await addNewTag(tagName);
        if (response === 200) await tagsRefetch();
      } else {
        setAddError("Wystąpił błąd podczas dodawania tag'u.")
      }
    } catch (error) {
      console.log(error);
      setAddError("Wystąpił błąd podczas dodawania tag'u.")
    }
  },[])

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
          className="rounded-full border-2 border-darkblue hover:bg-darkblue hover:text-white px-2 py-1 w-min text-nowrap transition-colors"
          onClick={() => {handleAddTag(newTag)}}
        >
          Zapisz
        </button>
      </div>
      {addError && <p className="text-red-600">{addError}</p>}
      <div className="flex flex-wrap gap-3">
        {
          tagsData &&
          !tagsLoading &&
          typeof tagsData !== "string" ?
            (tagsData.map((tag) => {
            return <SingleTag key={tag.id} tag={tag} refetch={tagsRefetch}/>
          }))
            : <p>Ładowanie...</p>
        }
        {
          tagsData &&
          !tagsLoading &&
          typeof tagsData !== "string" ?
            (tagsData.map((tag, index) => {
              return <p>{tag.id}</p>
            }))
            : <p>Ładowanie...</p>
        }
      </div>
    </>
  );
}

export default AdminTags;