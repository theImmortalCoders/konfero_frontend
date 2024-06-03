import React from "react";
import { Content } from "@/hooks/conference";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DisplayTag({ conference, isSmall }: { conference: Content, isSmall: boolean }) {
  const baseScale = useMediaQuery("(min-width:1024px)");
  const rwd = new Array(15).fill(null).map((a, index) => {
    return Number(
      useMediaQuery(`(min-width:${(baseScale ? 3050 : 2700) - 150 * index}px)`),
    );
  });
  const sumRwd = rwd.reduce((a, b) => {
    return a + b;
  }, 0);
  return (
    <>
      {conference.tags !== null ? (
        <>
          <div className={`flex flex-wrap sm:flex-row justify-center w-full sm:pl-4 items-center mt-1 mb-2 ${isSmall ? 'gap-1 sm:justify-start' : 'gap-2 sm:gap-4'}`}>
            {isSmall && conference.tags?.slice(0, 2 + sumRwd).map((tag) => (
              <p
                key={tag.id}
                className={`w-20 h-fit ${isSmall ? 'text-xxs' : 'text-xss sm:text-xs'} overflow-hidden overflow-ellipsis whitespace-nowrap text-center bg-gray-200 border-[1px] border-blue rounded-lg px-1`}
              >
                {tag.tagName}
              </p>
            ))}
            {!isSmall && conference.tags?.map((tag) => (
              <p
                key={tag.id}
                className={`w-20 h-fit ${isSmall ? 'text-xxs' : 'text-xxs sm:text-xs'} overflow-hidden overflow-ellipsis whitespace-nowrap text-center bg-gray-200 border-[1px] border-blue rounded-lg px-1`}
              >
                {tag.tagName}
              </p>
            ))}
            {isSmall && conference.tags?.length > 2 + sumRwd && (
              <div className={`flex flex-row h-fit ${isSmall ? 'text-xxs' : 'text-xs'} overflow-hidden overflow-ellipsis whitespace-nowrap justify-center bg-gray-200 border-[1px] border-blue rounded-lg px-2`}>
                <p className="sm:hidden">+</p>
                {conference.tags.length - (2 + sumRwd)}
                <p className="hidden sm:block">&nbsp;więcej...</p>
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
